import { orderModel } from "../models/order.model";

class OrderRepo {
    async getOrderById(id: string) {
        return await orderModel.findById(id);
    }
    async createOrder(data: any) {
        return await orderModel.create(data);
    }
}

export default new OrderRepo();