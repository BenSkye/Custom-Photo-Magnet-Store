import axios from 'axios';
import { API_BACKEND_URL } from '../config/backend';

const apiClient = axios.create({
    baseURL: API_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

export default apiClient;