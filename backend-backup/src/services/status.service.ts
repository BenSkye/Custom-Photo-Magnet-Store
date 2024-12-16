import { IOrderStatus } from "../interface/status.interface";
import statusRepo from "../repositories/status.repo";
import { BadRequestError } from '../core/error.response';

class StatusService {
    static async create(data: IOrderStatus) {
        // Kiểm tra xem code đã tồn tại chưa
        const existingStatus = await statusRepo.getByCode(data.code);
        if (existingStatus) {
            throw new BadRequestError('Code already exists');
        }

        return await statusRepo.create(data);
    }

    static async getAll() {
        return await statusRepo.getAll();
    }

    static async getByCode(code: string) {
        return await statusRepo.getByCode(code);
    }

    static async update(id: string, data: Partial<IOrderStatus>) {
        return await statusRepo.update(id, data);
    }

    static async delete(id: string) {
        return await statusRepo.delete(id);
    }
}

export default StatusService;