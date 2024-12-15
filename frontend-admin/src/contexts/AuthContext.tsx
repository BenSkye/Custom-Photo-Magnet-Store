import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { loginApi, logoutApi } from '../services/authService';


interface User {
    userId: string;
    name: string;
    email: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    user: User | null;
    login: (data: unknown) => Promise<any>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    checkPermission: () => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = Cookies.get('authorization');
            if (accessToken) {
                const decodedUser = jwtDecode(accessToken) as User;
                if (decodedUser) {
                    setUser(decodedUser);
                }
            }
            setIsLoading(false);
        }
        checkAuth();
    }, []);

    const login = async (data: unknown) => {
        try {
            const response = await loginApi(data);
            const { apiKey, user, tokens } = response.metadata;

            // Check role first before setting any cookies
            if (!user.roles?.includes('admin')) {
                message.error('Bạn không có quyền truy cập vào trang quản trị');
                return {
                    success: false,
                    message: 'Unauthorized access'
                };
            }

            // If role is admin, proceed with setting cookies and user state
            Cookies.set('x-api-key', apiKey);
            Cookies.set('x-client-id', user._id);
            Cookies.set('authorization', tokens.accessToken);
            Cookies.set('x-refresh-token', tokens.refreshToken);

            const decodedUser = jwtDecode(tokens.accessToken) as User;
            setUser(decodedUser);

            return {
                success: true,
                data: response.data
            };

        } catch (error: any) {
            console.error('Error login:', error);

            // Handle specific error cases
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        message.error('Email hoặc mật khẩu không chính xác');
                        break;
                    case 404:
                        message.error('Tài khoản không tồn tại');
                        break;
                    case 403:
                        message.error('Tài khoản của bạn đã bị khóa');
                        break;
                    default:
                        message.error('Đã có lỗi xảy ra. Vui lòng thử lại sau');
                }
            } else {
                message.error('Không thể kết nối đến máy chủ');
            }

            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    };

    const logout = async () => {
        try {
            await logoutApi();
            Cookies.remove('x-api-key');
            Cookies.remove('x-client-id');
            Cookies.remove('authorization');
            Cookies.remove('x-refresh-token');
            setUser(null);
            navigate('/login');
        }
        catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const isAuthenticated = user !== null;

    const checkPermission = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated,
            isLoading,
            checkPermission
        }}>
            {children}
        </AuthContext.Provider>
    );
};