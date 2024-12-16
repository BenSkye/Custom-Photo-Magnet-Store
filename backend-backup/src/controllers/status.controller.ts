import { Request, Response } from 'express';
import StatusService from '../services/status.service';
import { CREATED, SuccessResponse } from '../core/success.response';
import { asyncHandler } from '../helpers/asyncHandler';
import { IOrderStatus } from '../interface/status.interface';

class StatusController {
    createStatus = asyncHandler(async (req: Request, res: Response) => {
        const { code, name, description, order, color, isDefault, isActive } = req.body;
        new CREATED({
            message: 'Create status successfully',
            metadata: await StatusService.create({ code, name, description, order, color, isDefault, isActive }),
        }).send(res);
    });

    getAllStatus = asyncHandler(async (req: Request, res: Response) => {
        new SuccessResponse({
            message: 'Get all status successfully',
            metadata: await StatusService.getAll(),
        }).send(res);
    });

    getStatusByCode = asyncHandler(async (req: Request, res: Response) => {
        const { code } = req.params;
        new SuccessResponse({
            message: 'Get status by code successfully',
            metadata: await StatusService.getByCode(code),
        }).send(res);
    });

    updateStatus = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { code, name, order, isDefault, isActive } = req.body;
        new SuccessResponse({
            message: 'Update status successfully',
            metadata: await StatusService.update(id, { code, name, order, isDefault, isActive }),
        }).send(res);
    });

    deleteStatus = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        new SuccessResponse({
            message: 'Delete status successfully',
            metadata: await StatusService.delete(id),
        }).send(res);
    });
}

export default new StatusController();