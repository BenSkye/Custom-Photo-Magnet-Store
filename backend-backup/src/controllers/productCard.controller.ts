import ProductCardService from '../services/productCard.service';
import { asyncHandler } from '../helpers/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { CREATED, SuccessResponse } from '../core/success.response';

class ProductCardController {
    getProductCardById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get product card successfully',
            metadata: await ProductCardService.getProductCardById(req.params.id),
        }).send(res);
    });

    getProductCards = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get product cards successfully',
            metadata: await ProductCardService.getProductCards(),
        }).send(res);
    });

    createProductCard = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { title, description, price, imageUrl } = req.body;
        new CREATED({
            message: 'Create product card successfully',
            metadata: await ProductCardService.createProductCard({
                title,
                description,
                price,
                imageUrl,
            }),
        }).send(res);
    });

    updateProductCard = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Update product card successfully',
            metadata: await ProductCardService.updateProductCard(req.params.id, req.body),
        }).send(res);
    });
}

export default new ProductCardController();