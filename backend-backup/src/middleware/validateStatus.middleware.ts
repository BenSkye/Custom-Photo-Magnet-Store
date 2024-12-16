import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const statusSchema = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    order: Joi.number().integer().required(),
    color: Joi.string().required(),
    isDefault: Joi.boolean(),
    isActive: Joi.boolean(),
}).unknown(false);

export const validateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = await statusSchema.validateAsync(req.body, { stripUnknown: true, abortEarly: false });
        req.body = validatedData;
        next();
    } catch (error) {
        next(error);
    }
};