import { Router } from "express";
import statusController from "../../controllers/status.controller";
import { authentication } from '../../auth/authUtils';
import { apiKey, permission } from '../../auth/checkAuth';
import { validateStatus } from '../../middleware/validateStatus.middleware';

const statusRouter = Router();

statusRouter.get('/', statusController.getAllStatus);

//Admin Authentication
////////////////////////////
statusRouter.use(authentication);
statusRouter.use(apiKey)
statusRouter.use(permission('admin'));
////////////////////////////

statusRouter.post('/', validateStatus, statusController.createStatus);
statusRouter.get('/:code', statusController.getStatusByCode);
statusRouter.put('/:id', statusController.updateStatus);
statusRouter.delete('/:id', statusController.deleteStatus);

export default statusRouter;