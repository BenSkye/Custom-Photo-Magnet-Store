import { NextFunction, Request, Response } from 'express';
import  { CREATED, SuccessResponse} from '../core/success.response';
import { asyncHandler } from '../helpers/asyncHandler';
import OrderService from '../services/order.service';
import { IOrderRequest } from '../interface/order.interface';


class OrderController {
    getOrderById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get order successfully',
            metadata: await OrderService.getOrderById(req.params.id),
        }).send(res);
    });

    getAllOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        new SuccessResponse({
            message: 'Get all order successfully',
            metadata: await OrderService.getAllOrder(),
        }).send(res);
    });

    createOrder = asyncHandler(async (req: Request<any, any, IOrderRequest>, res: Response, next: NextFunction) => {
        const { customer, orderItems } = req.body;
        new CREATED({
            message: 'Create order successfully',
            metadata: await OrderService.createOrder({
                customer,
                orderItems
            }),
        }).send(res);
    });

    updateStatusOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { status } = req.body;
        new SuccessResponse({
            message: 'Update status order successfully',
            metadata: await OrderService.updateStatusOrder(req.params.id, status),
        }).send(res);
    });

    getOrderByCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { code } = req.params;
        new SuccessResponse({
            message: 'Get order by code successfully',
            metadata: await OrderService.getOrderByCode(code),
        }).send(res);
    });
}

export default new OrderController();