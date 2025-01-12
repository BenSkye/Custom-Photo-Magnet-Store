import PriceConfigService from '../services/priceConfig.service';
import { asyncHandler } from '../helpers/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { CREATED, SuccessResponse } from '../core/success.response';

class PriceConfigController {
    createPriceConfig = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { normalPerImagePrice, bulkPerImagePrice, superBulkPerImagePrice, bulkDiscountThreshold, superBulkThreshold } = req.body;
    new CREATED({
        message: 'Create price config successfully',
        metadata: await PriceConfigService.createPriceConfig({
            normalPerImagePrice,
            bulkPerImagePrice,
            superBulkPerImagePrice,
            bulkDiscountThreshold,
            superBulkThreshold,
            }),
        }).send(res);
    });

    updatePriceConfig = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Update price config successfully',
            metadata: await PriceConfigService.updatePriceConfig(req.params.id, req.body),
        }).send(res);
    });

    getPriceConfigById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get price config successfully',
            metadata: await PriceConfigService.getPriceConfigById(req.params.id),
        }).send(res);
    });

    getCurrentPriceConfig = asyncHandler(async (req: Request, res: Response, next: NextFunction )=>{
         new SuccessResponse({
            message: 'Get current price config successfully',
            metadata: await PriceConfigService.getCurrentPriceConfig(),
        }).send(res);
    });

}

export default new PriceConfigController();