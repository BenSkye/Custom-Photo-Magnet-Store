import orderRepo from "../repositories/order.repo";
import { IOrderRequest } from '../interface/order.interface';
import priceConfigRepo from '../repositories/priceConfig.repo';
import { BadRequestError } from '../core/error.response';
import { statusModel } from '../models/status.model';

class OrderService {

    static getOrderById = async (id: string) => {
        return await orderRepo.getOrderById(id);
    }

    static createOrder = async (orderData: IOrderRequest) => {
        try {
            const { customer, orderItems } = orderData;

            // Validate input
            if (!customer || !orderItems || !Array.isArray(orderItems)) {
                throw new Error('Invalid order data');
            }

            customer.phone = OrderService.validatePhoneNumber(customer.phone);

            const pricing = await OrderService.calculateOrderPrice(orderItems);

            // Tạo đơn hàng mới
            const newOrder = await orderRepo.createOrder({
                customer,
                orderItems,
                pricing,
            });

            return newOrder;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating order: ${error.message}`);
            } else {
                throw new Error(`Unknown error creating order: ${error}`);
            }
        }
    }

     static updateStatusOrder = async (id: string, newStatusId: string) => {
        try {
            // 1. Validate inputs
            if (!id || !newStatusId) {
                throw new BadRequestError('Missing required parameters');
            }

            // 2. Get current order
            const currentOrder = await orderRepo.getOrderById(id);
            if (!currentOrder) {
                throw new BadRequestError('Order not found');
            }

            // 3. Get status information
            const [currentStatus, newStatus] = await Promise.all([
                statusModel.findById(currentOrder.status),
                statusModel.findById(newStatusId)
            ]);

            if (!currentStatus || !newStatus) {
                throw new BadRequestError('Invalid status');
            }

            // 4. Validate final statuses
            if (OrderService.isFinalStatus(currentStatus.code)) {
                throw new BadRequestError(
                    'Cannot update order status: Order is already in final status'
                );
            }

            // 5. Allow update to failed status from any status
            if (newStatus.code === 'failed') {
                return await orderRepo.updateStatusOrder(id, newStatusId);
            }

            // 6. Validate status order
            if (newStatus.order <= currentStatus.order) {
                throw new BadRequestError(
                    'Cannot update to previous or same status'
                );
            }

            // 7. Validate sequential update
            const isValidSequence = await OrderService.validateStatusSequence(
                currentStatus.order,
                newStatus.order
            );

            if (!isValidSequence) {
                throw new BadRequestError(
                    'Cannot skip intermediate statuses'
                );
            }

            // 8. Update status
            return await orderRepo.updateStatusOrder(id, newStatusId);

        } catch (error) {
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new BadRequestError(
                `Error updating order status: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    static getAllOrder = async () => {
        return await orderRepo.getAllOrder();
    }

    ////////////////////// fuction support

    private static async calculateOrderPrice(orderItems: Array<{ imageUrl: string, quantity: number }>) {
        // Lấy cấu hình giá từ database
        const priceConfig = await OrderService.getCurrentPriceConfig();
        
        // Tính tổng số lượng
        const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
        
        // Xác định giá mỗi ảnh dựa vào số lượng
        const pricePerImage = totalQuantity >= priceConfig.bulkDiscountThreshold 
            ? priceConfig.bulkPerImagePrice 
            : priceConfig.normalPerImagePrice;
        
        // Tính tổng tiền
        const totalAmount = totalQuantity * pricePerImage;

        return {
            totalQuantity,
            pricePerImage,
            totalAmount
        };
    }

    private static async getCurrentPriceConfig() {
        // Lấy price config đang active
        const priceConfig = await priceConfigRepo.getCurrentPriceConfig();
        if (!priceConfig) {
            throw new Error('No active price configuration found');
        }
        return priceConfig;
    }

    private static validatePhoneNumber(phone: string) {
        // Xóa khoảng trắng và các ký tự đặc biệt
        const cleanPhone = phone.replace(/[\s.-]+/g, '');
        
        // Regex cho số điện thoại Việt Nam
        const phoneRegex = /^(0|84|\+84)([3|5|7|8|9])([0-9]{8})$/;
        
        if (!phoneRegex.test(cleanPhone)) {
            throw new Error('Phone number is not valid, please enter a valid phone number in Vietnam (0912345678)');
        }
        
    // Chuẩn hóa số điện thoại về dạng 10 số bắt đầu bằng 0
        if (cleanPhone.startsWith('84')) {
            return '0' + cleanPhone.slice(2);
        }
        if (cleanPhone.startsWith('+84')) {
            return '0' + cleanPhone.slice(3);
        }
        return cleanPhone;
    }

    ////////////////////// function support
    
    private static isFinalStatus(statusCode: string): boolean {
        return ['delivered', 'failed'].includes(statusCode);
    }

    private static async validateStatusSequence(
        currentOrder: number,
        newOrder: number
    ): Promise<boolean> {
        // Get all statuses between current and new
        const intermediateStatuses = await statusModel.find({
            order: { $gt: currentOrder, $lt: newOrder }
        }).sort({ order: 1 });

        // If there are intermediate statuses, the update is not sequential
        return intermediateStatuses.length === 0;
    }
}

export default OrderService;