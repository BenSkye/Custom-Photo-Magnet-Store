import { BadRequestError } from '../core/error.response';
import feedbackRepo from "../repositories/feedback.repo";
import { IFeedbackData, IFeedbackQuery } from '../interface/feedback.interface';
import { RATING, COMMENT } from '../utils/constants';
import { PaginationOptions } from '../interface/pagination.interface';


class FeedbackService {

    private static readonly RATING_MIN = RATING.MIN;
    private static readonly RATING_MAX = RATING.MAX;
    private static readonly COMMENT_MIN_LENGTH = COMMENT.MIN_LENGTH;
    private static readonly COMMENT_MAX_LENGTH = COMMENT.MAX_LENGTH;
    private static validatePaginationOptions(
        page?: number | string,
        limit?: number | string,
        sortBy?: string,
        sortOrder?: string
    ): PaginationOptions {
        // Validate và normalize page
        const validPage = Math.max(1, Number(page) || 1);
        
        // Validate và normalize limit
        const validLimit = Math.max(1, Math.min(Number(limit) || 10, 100));
        
        // Validate sortBy
        const allowedSortFields = ['createdAt', 'updatedAt', 'rating'];
        const validSortBy = allowedSortFields.includes(String(sortBy)) 
            ? String(sortBy) 
            : 'createdAt';
        
        // Validate sortOrder
        const validSortOrder = ['asc', 'desc'].includes(String(sortOrder).toLowerCase())
            ? (String(sortOrder).toLowerCase() as 'asc' | 'desc')
            : 'desc';

        return {
            page: validPage,
            limit: validLimit,
            sortBy: validSortBy,
            sortOrder: validSortOrder
        };
    }

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
    
    static async getAllFeedback(options: PaginationOptions) {   
        try {
            const validatedOptions = this.validatePaginationOptions(options.page, options.limit, options.sortBy, options.sortOrder);
            return await feedbackRepo.getAllFeedback(validatedOptions);
        } catch (error) {
            throw new BadRequestError('Error getting all feedbacks');
        }
    }

    static async getAllFeedbackIsActive(options: PaginationOptions) {
        try {
            const validatedOptions = this.validatePaginationOptions(options.page, options.limit, options.sortBy, options.sortOrder);
            return await feedbackRepo.getAllFeedbackIsActive(validatedOptions);
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

    

    static async updateStatusFeedback(id: string) {
        try {
            const feedback = await feedbackRepo.getFeedbackById(id);
            if (!feedback) {
                throw new BadRequestError('Feedback not found');
            }
            return await feedbackRepo.updateStatusFeedback(id);
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