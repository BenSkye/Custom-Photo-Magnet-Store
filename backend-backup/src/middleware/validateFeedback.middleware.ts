import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const feedbackSchema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    comment: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
}).unknown(false);

export const validateFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = await feedbackSchema.validateAsync(req.body, { 
            stripUnknown: true,  // stripUnknown: true sẽ loại bỏ các field không được định nghĩa trong schema
            abortEarly: false
        });
        req.body = validatedData;
        next();
    } catch (error) {
        next(error);
    }
};