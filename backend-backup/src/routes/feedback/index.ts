import { Router } from 'express';
import feedbackController from '../../controllers/feedback.controller';
import { validateFeedback } from '../../middleware/validateFeedback.middleware';
import { apiKey, permission } from '../../auth/checkAuth';
import { authentication } from '../../auth/authUtils';

const feedbackRouter = Router();

feedbackRouter.post('/', validateFeedback, feedbackController.createFeedback)
feedbackRouter.get('/customer', feedbackController.getAllFeedbackIsActive)
feedbackRouter.get('/:id', feedbackController.getFeedbackById)

//Admin Authentication
//////////////////////////
feedbackRouter.use(authentication);
feedbackRouter.use(apiKey)
feedbackRouter.use(permission('admin'));
////////////////////////////

feedbackRouter.put('/status/:id', feedbackController.updateStatusFeedback)
// feedbackRouter.delete('/:id', feedbackController.deleteFeedback)
feedbackRouter.get('/admin', feedbackController.getAllFeedback)

export default feedbackRouter;