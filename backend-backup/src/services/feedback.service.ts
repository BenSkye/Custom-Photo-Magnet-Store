import { BadRequestError } from '../core/error.response';
import feedbackRepo from "../repositories/feedback.repo";
import { IFeedbackData, IFeedbackQuery } from '../interface/feedback.interface';
import { RATING, COMMENT } from '../utils/constants';

class FeedbackService {

    private static readonly RATING_MIN = RATING.MIN;
    private static readonly RATING_MAX = RATING.MAX;
    private static readonly COMMENT_MIN_LENGTH = COMMENT.MIN_LENGTH;
    private static readonly COMMENT_MAX_LENGTH = COMMENT.MAX_LENGTH;

     static async createFeedback(data: IFeedbackData) {
        try {
            this.validateFeedbackData(data);
            return await feedbackRepo.createFeedback(data);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error creating feedback: ${error.message}`);
            } else {
                throw new BadRequestError(`Unknown error creating feedback: ${error}`);
            }
        }
    }
    
  static async getAllFeedback() {
    try {
        return await feedbackRepo.getAllFeedback();
    } catch (error) {
        throw new BadRequestError('Error getting all feedbacks');
        }
    }

   static async getFeedbackById(id: string) {
        try {
            const feedback = await feedbackRepo.getFeedbackById(id);
            if (!feedback) {
                throw new BadRequestError('Feedback not found');
            }
            return feedback;
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error getting feedback by id: ${error.message}`);
            } else {
                throw new BadRequestError(`Unknown error getting feedback by id: ${error}`);
            }
        }
    }

    static async getFeedbackByQuery(query: IFeedbackQuery) {
        try {
            return await feedbackRepo.getFeedbackByQuery(query);
        } catch (error) {
            throw new BadRequestError('Error getting feedbacks by query');
        }
    }

    static async updateStatusFeedback(id: string, isActive: boolean) {
        try {
            const feedback = await feedbackRepo.getFeedbackById(id);
            if (!feedback) {
                throw new BadRequestError('Feedback not found');
            }
            return await feedbackRepo.updateStatusFeedback(id, isActive);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error updating feedback status: ${error.message}`);
            } else {
                throw new BadRequestError(`Unknown error updating feedback status: ${error}`);
            }
        }
    }

     static async deleteFeedback(id: string) {
        try {
            const feedback = await feedbackRepo.getFeedbackById(id);
            if (!feedback) {
                throw new BadRequestError('Feedback not found');
            }
            return await feedbackRepo.deleteFeedback(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error deleting feedback: ${error.message}`);
            } else {
                throw new BadRequestError(`Unknown error deleting feedback: ${error}`);
            }
        }
    }

    //validate
     private static validateFeedbackData(data: IFeedbackData): void {
        const { name, role, comment, rating } = data;

        if (!name || !role || !comment || rating === undefined) {
            throw new Error('Thiếu dữ liệu feedback');
        }

        if (rating < this.RATING_MIN || rating > this.RATING_MAX) {
            throw new Error(`Rating must be between ${this.RATING_MIN} and ${this.RATING_MAX}`);
        }

        if (comment.length < this.COMMENT_MIN_LENGTH || 
            comment.length > this.COMMENT_MAX_LENGTH) {
            throw new Error(
                `Comment must be between ${this.COMMENT_MIN_LENGTH} and ${this.COMMENT_MAX_LENGTH} characters`
            );
        }
    }
}

export default FeedbackService;