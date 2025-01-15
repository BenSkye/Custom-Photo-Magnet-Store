import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const orderSchema = Joi.object({
    customer: Joi.object({
        fullName: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.object({
            district: Joi.string().required(),
            ward: Joi.string().required(),
            detailAddress: Joi.string().required()
        }).required(),
        note: Joi.string().allow('', null)
    }).required(),
    orderItems: Joi.array().items(
        Joi.object({
            imageUrl: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required()
        }).unknown(false)  
    ).min(1).required()
}).unknown(false);

export const validateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = await orderSchema.validateAsync(req.body, { 
            stripUnknown: true,  
            abortEarly: false
        });
        req.body = validatedData;
        next();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }
};