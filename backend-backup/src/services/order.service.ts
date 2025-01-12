import orderRepo from "../repositories/order.repo";
import { IOrderRequest } from '../interface/order.interface';
import priceConfigRepo from '../repositories/priceConfig.repo';
import { BadRequestError } from '../core/error.response';
import statusRepo from '../repositories/status.repo';


class OrderService {

    static getOrderById = async (id: string) => {
        return await orderRepo.getOrderById(id);
    }

    static getOrderByCode = async (code: string) => {
        return await orderRepo.getOrderByCode(code);
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

            const orderCode = this.generateOrderCode();

            // Tạo đơn hàng mới
            const newOrder = await orderRepo.createOrder({
                code: orderCode,
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

    static updateStatusOrder = async (code: string, newStatusId: string) => {
        try {
            // 1. Validate inputs
            if (!code || !newStatusId) {
                throw new BadRequestError('Missing required parameters');
            }

            // 2. Get current order
            const currentOrder = await orderRepo.getOrderByCode(code);
            if (!currentOrder) {
                throw new BadRequestError('Order not found');
            }

            // 3. Get new status information
            const newStatus = await statusRepo.getById(newStatusId);
            if (!newStatus) {       
                throw new BadRequestError('Invalid status');
            }

            // 4. Update status
            return await orderRepo.updateStatusOrder(code, newStatusId);

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
        let pricePerImage;
        
        if (totalQuantity >= (priceConfig?.superBulkThreshold || 0)) {
        pricePerImage = priceConfig?.superBulkPerImagePrice || 0;
         } else if (totalQuantity >= (priceConfig?.bulkDiscountThreshold || 0)) {
        pricePerImage = priceConfig?.bulkPerImagePrice || 0;
         } else {
        pricePerImage = priceConfig?.normalPerImagePrice || 0;
        }
        
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

    // Thêm utility function để generate order code
    private static generateOrderCode = (): string => {
        const generateRandomCode = (length: number = 6) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

        const timestamp = Date.now();
        const randomCode = generateRandomCode();
        return `ORD-${randomCode}-${timestamp}`;
    };

}

export default OrderService;