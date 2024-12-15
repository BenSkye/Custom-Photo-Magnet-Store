import apiClient from './apiClientService';



export const loginApi = async (data: unknown) => {
    const response = await apiClient.post('/v1/api/user/login', data);
    return response.data;
};

export const logoutApi = async () => {
    const response = await apiClient.post('/v1/api/user/logout');
    return response.data;
};

