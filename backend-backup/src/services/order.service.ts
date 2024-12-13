import orderRepo from "../repositories/order.repo";
import { orderModel } from "../models/order.model";
import { IOrderRequest } from '../interface/order.interface';
import { ORDER_STATUS } from '../utils/constants';
import priceConfigRepo from '../repositories/priceConfig.repo';

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

            // Tính toán giá - Thêm await vì calculateOrderPrice giờ là async
            const pricing = await OrderService.calculateOrderPrice(orderItems);

            // Tạo đơn hàng mới
            const newOrder = await orderModel.create({
                customer,
                orderItems,
                pricing,
                status: ORDER_STATUS.PENDING,
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

    static updateStatusOrder = async (id: string, status: string) => {
        return await orderRepo.updateStatusOrder(id, status);
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
}

export default OrderService;