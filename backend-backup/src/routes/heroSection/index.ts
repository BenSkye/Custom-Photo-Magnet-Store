import { Router } from 'express';
import heroSectionController from '../../controllers/heroSection.controller';
import { apiKey,permission } from '../../auth/checkAuth';
import { authentication } from '../../auth/authUtils';

const heroSectionRouter = Router();

heroSectionRouter.get('/',heroSectionController.getHeroSection)

//Admin Authentication
heroSectionRouter.use(authentication);
////////////////////////////
heroSectionRouter.use(apiKey)
heroSectionRouter.use(permission('admin'));
////////////////////////////

heroSectionRouter.post('/', heroSectionController.createHeroSection);
heroSectionRouter.put('/', heroSectionController.updateHeroSection);

export default heroSectionRouter;