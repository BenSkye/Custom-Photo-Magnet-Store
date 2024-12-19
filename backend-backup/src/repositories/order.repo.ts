import { orderModel } from "../models/order.model";
import { statusModel } from "../models/status.model";

class OrderRepo {
    async getOrderById(id: string) {
        return await orderModel.findById(id);
    }

    async getOrderByCode(code: string) {
        return await orderModel.findOne({ code }).lean();
    }

    async getAllOrder() {
        return await orderModel.find();
    }
    
    async createOrder(data: any) {
        const status = await statusModel.findOne({ isDefault: true });
        return await orderModel.create({ ...data, status: status?._id });
    }

    async updateStatusOrder(code: string, status: string) {
        return await orderModel.findOneAndUpdate({ code }, { status }, { new: true });
    }
}

export default new OrderRepo();