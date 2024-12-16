import { orderModel } from "../models/order.model";
import { statusModel } from "../models/status.model";

class OrderRepo {
    async getOrderById(id: string) {
        return await orderModel.findById(id);
    }
    async getAllOrder() {
        return await orderModel.find();
    }
    
    async createOrder(data: any) {
        const status = await statusModel.findOne({ isDefault: true });
        return await orderModel.create({ ...data, status: status?._id });
    }

    async updateStatusOrder(id: string, status: string) {
        return await orderModel.findByIdAndUpdate(id, { status }, { new: true });
    }
}

export default new OrderRepo();