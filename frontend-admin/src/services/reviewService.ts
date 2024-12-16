import apiClient from './apiClientService';
import { Review } from '../types/review';
import { PaginationParams } from '../types/pagination';


export const createReview = async (review: Review) => {
    try {
        const response = await apiClient.post('/v1/api/feedback', review);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
}

export const getReviews = async (paginationParams: PaginationParams) => {
    try {
        const response = await apiClient.get('/v1/api/feedback/customer', {
            params: paginationParams
        });
        return response.data;
    } catch (error) {
        console.error('Error getting reviews:', error);
        throw error;
    }
}

export const updateStatusFeedback = async (id: string) => {
    try {
        const response = await apiClient.put(`/v1/api/feedback/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error updating feedback status:', error);
        throw error;
    }
}


