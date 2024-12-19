import apiClient from './apiClientService';
import { IOrderRequest } from '../types/order';

export const createOrder = async (order: IOrderRequest) => {
    try {
        const response = await apiClient.post('/v1/api/order', order);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

export const getOrders = async () => {
    try {
        const response = await apiClient.get('/v1/api/order');
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
}

export const getOrderById = async (orderId: string) => {
    try {
        const response = await apiClient.get(`/v1/api/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting order by id:', error);
        throw error;
    }
}

export const getOrderByCode = async (code: string) => {
    try {
        const response = await apiClient.get(`/v1/api/order/code/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error getting order by code:', error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    try {
        const response = await apiClient.put(`/v1/api/order/${orderId}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}
