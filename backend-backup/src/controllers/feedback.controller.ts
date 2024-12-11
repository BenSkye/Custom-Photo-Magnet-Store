import  FeedbackService from '../services/feedback.service';
import { asyncHandler } from '../helpers/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { CREATED, SuccessResponse } from '../core/success.response';

class FeedbackController {
 
    createFeedback = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { name, role, comment, rating } = req.body;
        new CREATED({
            message: 'Create feedback successfully',
            metadata: await FeedbackService.createFeedback({ name, role, comment, rating }),
        }).send(res);
    });

    getAllFeedback = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const feedbacks = await FeedbackService.getAllFeedback();
        new SuccessResponse({
            message: 'Get all feedbacks successfully',
            metadata: feedbacks,
        }).send(res);
    });

    getFeedbackById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const feedback = await FeedbackService.getFeedbackById(req.params.id);
        new SuccessResponse({
            message: 'Get feedback successfully',
            metadata: feedback,
        }).send(res);
    });

    updateStatusFeedback = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { isActive } = req.body;
        new SuccessResponse({
            message: 'Update feedback status successfully',
            metadata: await FeedbackService.updateStatusFeedback(req.params.id, isActive),
        }).send(res);
    });

    deleteFeedback = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Delete feedback successfully',
            metadata: await FeedbackService.deleteFeedback(req.params.id),
        }).send(res);
    });
}

export default new FeedbackController();