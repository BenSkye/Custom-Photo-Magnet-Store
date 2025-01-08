import { Router } from 'express';
import productCardController from '../../controllers/productCard.controller';
import { apiKey,permission } from '../../auth/checkAuth';
import { authentication } from '../../auth/authUtils';

const productCardRouter = Router();

productCardRouter.get('/', productCardController.getProductCards);
productCardRouter.get('/:id', productCardController.getProductCardById);

//Admin Authentication
productCardRouter.use(authentication);
////////////////////////////
productCardRouter.use(apiKey)
productCardRouter.use(permission('admin'));
////////////////////////////

productCardRouter.post('/', productCardController.createProductCard);
productCardRouter.put('/:id', productCardController.updateProductCard);


export default productCardRouter;