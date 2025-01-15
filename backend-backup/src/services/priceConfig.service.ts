import { IPriceConfig, IPriceConfigCreate } from "../interface/priceConfig.interface";
import priceConfigRepo from "../repositories/priceConfig.repo";
import { BadRequestError } from "../core/error.response";
import { PRICE_CONFIG } from "../utils/constants";

class PriceConfigService {
    private static readonly PRICE_CONFIG_MIN = PRICE_CONFIG.MIN;
    // private static readonly PRICE_CONFIG_MAX = PRICE_CONFIG.MAX;

    static async createPriceConfig(data: IPriceConfigCreate) {
        try {
            this.validatePriceConfigData(data);
            return await priceConfigRepo.createPriceConfig(data);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error creating price config: ${error.message}`);
            }
        }
    }

    static async updatePriceConfig(id: string, data: IPriceConfig) {
        try {
            this.validatePriceConfigData(data);
            return await priceConfigRepo.updatePriceConfig(id, data);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error updating price config: ${error.message}`);
            }
        }
    }

    static async getPriceConfigById(id: string) {
        return await priceConfigRepo.getPriceConfigById(id);
    }

    static async getCurrentPriceConfig() {
        return await priceConfigRepo.getCurrentPriceConfig();
    }

    /////////////////////////////////////// Validate

    private static validatePriceConfigData(data: IPriceConfigCreate) {
        if (data.normalPerImagePrice < this.PRICE_CONFIG_MIN) {
            throw new BadRequestError(`Price ${data.normalPerImagePrice} must be greater than ${this.PRICE_CONFIG_MIN}`);
        }
        if (data.superBulkPerImagePrice < this.PRICE_CONFIG_MIN) {
            throw new BadRequestError(`Price ${data.superBulkPerImagePrice} must be greater than ${this.PRICE_CONFIG_MIN}`);
        }
        if (data.shippingFee < this.PRICE_CONFIG_MIN) {
            throw new BadRequestError(`Price ${data.shippingFee} must be greater than ${this.PRICE_CONFIG_MIN}`);
        }
    }
}

export default PriceConfigService;