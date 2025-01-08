import apiClient from './apiClientService';
import { IProductCard } from '../types/productCard';

export const getAllProductCards = async () => {
    try {
        const response = await apiClient.get('/v1/api/product-card');
        return response.data;
    } catch (error) {
        console.error('Error fetching product cards:', error);
        throw error;
    }
}

export const getProductCardById = async (id : string) => {
    try {
        const response = await apiClient.get(`/v1/api/product-card/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product card by id:', error);
        throw error;
    }
}

export const updateProductCard = async (id: string, data: IProductCard) => {    
    try {
        const response = await apiClient.put(`/v1/api/product-card/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating product card:', error);
        throw error;
    }
}