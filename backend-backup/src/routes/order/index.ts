import { Router } from "express";
import orderController from "../../controllers/order.controller";
import { validateOrder } from '../../middleware/validateOrder.middleware';

const orderRouter = Router();

orderRouter.get('/', orderController.getOrderById);
orderRouter.get('/:id', orderController.getOrderById);
orderRouter.post('/', validateOrder, orderController.createOrder);

export default orderRouter;