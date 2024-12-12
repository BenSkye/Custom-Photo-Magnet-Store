import { priceConfigModel } from "../models/priceConfig.model";
import { IPriceConfig, IPriceConfigCreate } from "../interface/priceConfig.interface";

class PriceConfigRepo {
    async getPriceConfigById(id: string) {
        return await priceConfigModel.findById(id);
    }

    async getCurrentPriceConfig() {
        return await priceConfigModel.findOne({ isActive: true });
    }


    // async updatePriceConfigByIsActive(id: string) {
    //     return await priceConfigModel.findByIdAndUpdate(id, { isActive: true }, { new: true });
    // }

    async createPriceConfig(data: IPriceConfigCreate) {
        return await priceConfigModel.create(data);
    }

    async updatePriceConfig(id: string, data: IPriceConfig) {
        return await priceConfigModel.findByIdAndUpdate(id, data, { new: true });
    }

    
}

export default new PriceConfigRepo();