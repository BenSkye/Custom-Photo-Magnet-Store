import { statusModel } from '../models/status.model';
import { IOrderStatus } from '../interface/status.interface';

class StatusRepo {
    async create(data: IOrderStatus) {
        return await statusModel.create(data);
    }

    async getAll() {
        return await statusModel.find({ isActive: true }).sort({ order: 1 });
    }

    async getByCode(code: string) {
        return await statusModel.findOne({ code, isActive: true });
    }

    async getDefault() {
        return await statusModel.findOne({ isDefault: true, isActive: true });
    }

    async update(id: string, data: Partial<IOrderStatus>) {
        return await statusModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await statusModel.findByIdAndUpdate(id, { isActive: false });
    }
}

export default new StatusRepo();
