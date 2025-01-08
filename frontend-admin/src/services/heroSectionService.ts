import apiClient from './apiClientService';
import { IHeroSection } from '../types/heroSection';

export const getHeroSection = async () => {
    try {
        const response = await apiClient.get('/v1/api/heroSection');
        return response.data;
    } catch (error) {
        console.error('Error fetching hero section:', error);
        throw error;
    }
};

export const updateHeroSection = async (data: IHeroSection) => {
    try {
        const response = await apiClient.put('/v1/api/heroSection', data);
        return response.data;
    } catch (error) {
        console.error('Error updating hero section:', error);
        throw error;
    }
}
