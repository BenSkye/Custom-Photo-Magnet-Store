import apiClient from './apiClientService';
import { Review } from '../types/review';

export const createReview = async (review: Review) => {
    try {
        const response = await apiClient.post('/v1/api/feedback', review);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
}

export const getReviews = async () => {
    try {
        const response = await apiClient.get('/v1/api/feedback');
        return response.data;
    } catch (error) {
        console.error('Error getting reviews:', error);
        throw error;
    }
}

