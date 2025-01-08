import { Router, Request, Response } from 'express';
import accessRouter from './access';
import { apiKey, permission } from '../auth/checkAuth';
import checkoutRouter from './checkout';
import payosRouter from './payos';
import categoryRouter from './category';
import levelRouter from './level';
import jobRouter from './job';
import templateRouter from './template';
import cvRouter from './cv';
import applicationRouter from './application';
import companyRouter from './company';
import subscriptionRouter from './subscription';
import userRouter from './user';
import paymentRouter from './payment';
import notificationRouter from './notificationRouter';
import orderRouter from './order';
import feedbackRouter from './feedback';
import priceConfigRouter from './configPrice';
import statusRouter from './status';
import heroSectionRouter from './heroSection';
import productCardRouter from './productCard';


const router = Router();

router.use('/v1/api/user', accessRouter);
router.use('/v1/api/order', orderRouter);
router.use('/v1/api/feedback', feedbackRouter);
router.use('/v1/api/config-price', priceConfigRouter);
router.use('/v1/api/status', statusRouter);
router.use('/v1/api/heroSection', heroSectionRouter);
router.use('/v1/api/product-card', productCardRouter);


router.use('/', (req: Request, res: Response) => {
    res.send('MEMORY_Anhnamcham API');
});

export default router;
