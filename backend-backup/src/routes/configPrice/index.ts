import { Router } from 'express';
import priceConfigController from '../../controllers/priceConfig.controller';
import { validatePriceConfig } from '../../middleware/validatePriceConfig.middleware';
import { apiKey, permission } from '../../auth/checkAuth';
import { authentication } from '../../auth/authUtils';

const priceConfigRouter = Router();

priceConfigRouter.get('/',priceConfigController.getCurrentPriceConfig)

//Admin Authentication
priceConfigRouter.use(authentication);
////////////////////////////
priceConfigRouter.use(apiKey)
priceConfigRouter.use(permission('admin'));
////////////////////////////

priceConfigRouter.post('/', validatePriceConfig, priceConfigController.createPriceConfig);
priceConfigRouter.put('/:id', priceConfigController.updatePriceConfig);
priceConfigRouter.get('/:id', priceConfigController.getPriceConfigById);

export default priceConfigRouter;