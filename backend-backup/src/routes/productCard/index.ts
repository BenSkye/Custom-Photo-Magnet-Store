import { Router } from 'express';
import productCardController from '../../controllers/productCard.controller';
import { apiKey,permission } from '../../auth/checkAuth';
import { authentication } from '../../auth/authUtils';
import { validateProductCard } from '../../middleware/validateProductCard.middleware';

const productCardRouter = Router();

productCardRouter.get('/', productCardController.getProductCards);
productCardRouter.get('/:id', productCardController.getProductCardById);

//Admin Authentication
productCardRouter.use(authentication);
////////////////////////////
productCardRouter.use(apiKey)
productCardRouter.use(permission('admin'));
////////////////////////////

productCardRouter.post('/', validateProductCard, productCardController.createProductCard);
productCardRouter.put('/:id', validateProductCard, productCardController.updateProductCard);


export default productCardRouter;