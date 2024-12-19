import { Router } from "express";
import orderController from "../../controllers/order.controller";
import { validateOrder } from '../../middleware/validateOrder.middleware';
import {  apiKey, permission } from '../../auth/checkAuth';
import { authentication } from '../../auth/authUtils';

const orderRouter = Router();

orderRouter.post('/', validateOrder, orderController.createOrder);

//Admin Authentication
////////////////////////////
orderRouter.use(authentication);
orderRouter.use(apiKey)
orderRouter.use(permission('admin'));
////////////////////////////

orderRouter.get('/:id', orderController.getOrderById);
orderRouter.put('/:code', orderController.updateStatusOrder);
orderRouter.get('/code/:code', orderController.getOrderByCode);
orderRouter.get('/', orderController.getAllOrder);

export default orderRouter;