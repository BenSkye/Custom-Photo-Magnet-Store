import apiClient from "./apiClientService";

export const getHeroSection = async () => {
    try {
        const response = await apiClient.get('/v1/api/heroSection');
        return response.data;
    } catch (error) {
        console.error('Error fetching hero section:', error);
        throw error;
    }
}