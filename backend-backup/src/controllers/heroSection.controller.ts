import HeroSectionService from '../services/heroSection.service';
import { asyncHandler } from '../helpers/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { SuccessResponse, CREATED } from '../core/success.response';

class HeroSectionController {
    createHeroSection = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { title, subTitle , description, images } = req.body;
        new CREATED({
            message: 'Create hero section successfully',
            metadata: await HeroSectionService.createHeroSection({
                title,
                subTitle,
                description,
                images,
            }),
        }).send(res);
    });

    getHeroSection = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get hero section successfully',
            metadata: await HeroSectionService.getHeroSection(),
        }).send(res);
    });

    updateHeroSection = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Update hero section successfully',
            metadata: await HeroSectionService.updateHeroSection(req.body),
        }).send(res);
    });
}   

export default new HeroSectionController();