import { Router } from 'express';
import feedbackController from '../../controllers/feedback.controller';
import { validateFeedback } from '../../middleware/validateFeedback.middleware';

const feedbackRouter = Router();

feedbackRouter.post('/', validateFeedback, feedbackController.createFeedback)
feedbackRouter.get('/', feedbackController.getAllFeedback)
feedbackRouter.get('/:id', feedbackController.getFeedbackById)

//Admin
feedbackRouter.put('/status/:id', feedbackController.updateStatusFeedback)
feedbackRouter.delete('/:id', feedbackController.deleteFeedback)

export default feedbackRouter;