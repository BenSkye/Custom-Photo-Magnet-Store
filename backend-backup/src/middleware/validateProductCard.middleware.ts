import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const productCardSchema = Joi.object({
    title: Joi.string()
        .required()
        .min(3)
        .max(10000)
        .messages({
            'string.empty': 'Tiêu đề không được để trống',
            'string.min': 'Tiêu đề phải có ít nhất {#limit} ký tự',
            'string.max': 'Tiêu đề không được vượt quá {#limit} ký tự',
            'any.required': 'Tiêu đề là bắt buộc'
        }),

    description: Joi.string()
        .required()
        .min(10)
        .max(10000)
        .messages({
            'string.empty': 'Mô tả không được để trống',
            'string.min': 'Mô tả phải có ít nhất {#limit} ký tự',
            'string.max': 'Mô tả không được vượt quá {#limit} ký tự',
            'any.required': 'Mô tả là bắt buộc'
        }),

    price: Joi.number()
        .required()
        .integer()
        .min(0)
        .max(1000000000) 
        .messages({
            'number.base': 'Giá phải là số',
            'number.integer': 'Giá phải là số nguyên',
            'number.min': 'Giá không được âm',
            'number.max': 'Giá không được vượt quá 1 tỷ đồng',
            'any.required': 'Giá là bắt buộc'
        }),

    imageUrl: Joi.string()
        .required()
        .uri()
        .messages({
            'string.empty': 'URL ảnh không được để trống',
            'string.uri': 'URL ảnh không hợp lệ',
            'any.required': 'URL ảnh là bắt buộc'
        }),
});

export const validateProductCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = await productCardSchema.validateAsync(req.body, { 
            stripUnknown: true, 
            abortEarly: false
        });
        req.body = validatedData;
        next();
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            const errorMessages = error.details.map(detail => ({
                field: detail.path[0],
                message: detail.message
            }));
            
            return res.status(400).json({
                status: 'error',
                code: 'VALIDATION_ERROR',
                errors: errorMessages
            });
        }
        next(error);
    }
};