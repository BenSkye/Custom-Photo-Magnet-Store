import { priceConfigModel } from "../models/priceConfig.model";
import { IPriceConfig } from "../interface/priceConfig.interface";

class PriceConfigRepo {
    async getPriceConfig() {
        return await priceConfigModel.findOne({ isActive: true });
    }

    async createPriceConfig(data: IPriceConfig) {
        return await priceConfigModel.create(data);
    }

    async updatePriceConfig(id: string, data: IPriceConfig) {
        return await priceConfigModel.findByIdAndUpdate(id, data);
    }
}

export default new PriceConfigRepo();