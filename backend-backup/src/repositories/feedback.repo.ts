import { feedbackModel } from "../models/feedback.model";
import { PaginationOptions, PaginatedResult } from "../interface/pagination.interface";

class FeedbackRepo {
    async getFeedbackById(id: string) {
        return await feedbackModel.findById(id);
    }

    async getFeedbackWithPagination(
        query: any = {},
        options: PaginationOptions
    ): Promise<PaginatedResult> {
        try {
            const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = options;
            const skip = (page - 1) * limit;

            // Tạo sort object
            const sort: { [key: string]: 'asc' | 'desc' } = {
                [sortBy]: sortOrder
            };

            // Thực hiện query với pagination
            const [data, totalItems] = await Promise.all([
                feedbackModel.find(query)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit),
                feedbackModel.countDocuments(query)
            ]);

            const totalPages = Math.ceil(totalItems / limit);

            return {
                data,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    limit,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            };
        } catch (error) {
            throw error;
        }
    }

     async getAllFeedback(options: PaginationOptions) {
        return this.getFeedbackWithPagination({}, options);
    }

    async getAllFeedbackIsActive(options: PaginationOptions) {
        return this.getFeedbackWithPagination({ isActive: true }, options);
    }

    async updateStatusFeedback(id: string) {
        return await feedbackModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    }

    async deleteFeedback(id: string) {
        return await feedbackModel.findByIdAndDelete(id);
    }

    async createFeedback(data: any) {
        return await feedbackModel.create(data);
    }

}

export default new FeedbackRepo();