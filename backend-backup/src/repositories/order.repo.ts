import { orderModel } from "../models/order.model";

class OrderRepo {
    async getOrderById(id: string) {
        return await orderModel.findById(id);
    }
    async getAllOrder() {
        return await orderModel.find();
    }
    async createOrder(data: any) {
        return await orderModel.create(data);
    }
    async updateStatusOrder(id: string, status: string) {
        return await orderModel.findByIdAndUpdate(id, { status }, { new: true });
    }
}

export default new OrderRepo();