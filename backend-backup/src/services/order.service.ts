import orderRepo from "../repositories/order.repo";
import { orderModel } from "../models/order.model";
import { IOrderRequest } from '../interface/order.interface';
import { BULK, ORDER_STATUS, PRICE } from '../utils/constants';

class OrderService {
    // Định nghĩa các hằng số pricing
    private static readonly PRICE_PER_IMAGE = PRICE.PRICE_PER_IMAGE;
    private static readonly BULK_DISCOUNT_THRESHOLD = BULK.BULK_DISCOUNT_THRESHOLD;
    private static readonly BULK_DISCOUNT_PRICE = PRICE.BULK_DISCOUNT_PRICE; 
    private static readonly PRICE_SHIPPING = PRICE.PRICE_SHIPPING;

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

            // Tính toán giá
            const pricing = OrderService.calculateOrderPrice(orderItems);

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

    private static calculateOrderPrice(orderItems: Array<{ imageUrl: string, quantity: number }>) {
        // Tính tổng số lượng
        const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
        
        // Xác định giá mỗi ảnh dựa vào số lượng
        const pricePerImage = totalQuantity >= this.BULK_DISCOUNT_THRESHOLD 
            ? this.BULK_DISCOUNT_PRICE 
            : this.PRICE_PER_IMAGE;
        
        // Tính tổng tiền và phí ship
        const totalAmount = totalQuantity * pricePerImage + this.PRICE_SHIPPING;

        return {
            totalQuantity,
            pricePerImage,
            shippingFee: this.PRICE_SHIPPING,
            totalAmount
        };
    }
}

export default OrderService;