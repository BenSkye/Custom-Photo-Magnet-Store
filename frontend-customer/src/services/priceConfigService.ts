import { IPriceConfigRequest } from '../types/priceConfig';
import apiClient from "./apiClientService";


export const getCurrentPriceConfig = async () => {
    try {
        const response = await apiClient.get('/v1/api/config-price');
        return response.data;
    } catch (error) {
        console.error('Error fetching price config:', error);
        throw error;
    }
};

export const updatePriceConfig = async (id: string, data: IPriceConfigRequest) => {
    try {
        const response = await apiClient.put(`/v1/api/price-config/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating price config:', error);
        throw error;
    }
}

