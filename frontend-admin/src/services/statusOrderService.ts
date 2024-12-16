import apiClient from "./apiClientService";

export const getAllStatus = async () => {
    try {
        const response = await apiClient.get('/v1/api/status');
        return response.data;
    } catch (error) {
        console.error('Error getting status:', error);
        throw error;
    }
}
