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
}

export default new OrderController();