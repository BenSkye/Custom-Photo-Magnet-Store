import apiClient from './apiClientService';

export const getAllProductCards = async () => {
    try {
        const response = await apiClient.get('/v1/api/product-card');
        return response.data;
    } catch (error) {
        console.error('Error fetching product cards:', error);
        throw error;
    }
}


