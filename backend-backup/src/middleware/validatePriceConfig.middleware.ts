import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const priceConfigSchema = Joi.object({
    normalPerImagePrice: Joi.number().required(),
    bulkPerImagePrice: Joi.number().required(),
    superBulkPerImagePrice: Joi.number().required(),
    shippingFee: Joi.number().required(),
    superBulkThreshold: Joi.number().required(),
    bulkDiscountThreshold: Joi.number().required(),
}).unknown(false);

export const validatePriceConfig = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = await priceConfigSchema.validateAsync(
            req.body, { 
            stripUnknown: true, 
            abortEarly: false 
         });
        req.body = validatedData;
        next();
    } catch (error) {
        next(error);
    }
};

