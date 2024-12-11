import { IFeedbackQuery } from '../interface/feedback.interface';
import { feedbackModel } from "../models/feedback.model";

class FeedbackRepo {
    async getFeedbackById(id: string) {
        return await feedbackModel.findById(id);
    }
    async getAllFeedback() {
        return await feedbackModel.find();
    }
    async getFeedbackByQuery(query: any) {
        return await feedbackModel.find(query);
    }
    async updateStatusFeedback(id: string, isActive: boolean) {
        return await feedbackModel.findByIdAndUpdate(
            id,
            { isActive },
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