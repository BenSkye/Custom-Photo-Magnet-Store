import apiClient from './apiClientService';
import { IOrderRequest } from '../types/order';

export const createOrder = async (order: IOrderRequest) => {
    try {
        const response = await apiClient.post('/v1/api/order', order);
        console.log('API Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}
