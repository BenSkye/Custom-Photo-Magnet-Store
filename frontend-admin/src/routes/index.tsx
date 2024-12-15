import { AppRoute } from '../types/route';
import Reviews from '../pages/Reviews';
import Order from '../pages/Order';
import Information from '../pages/Information';
import Dashboard from '../pages/Dashboard';
import ManagePrice from '../pages/ManagePrice';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoutes';
import { Navigate } from 'react-router-dom';

export const publicRoutes: AppRoute[] = [
  {
    path: '/login',
    key: 'login',
    label: 'Đăng nhập',
    element: <Login />,
  },
];

export const privateRoutes: AppRoute[] = [
  {
    path: '/dashboard',
    key: 'dashboard',
    label: 'Thống kê',
    element: <Dashboard />,
  },
  {
    path: '/manage-price',
    key: 'manage-price',
    label: 'Quản lý giá',
    element: <ManagePrice />,
  },
  {
    path: '/reviews',
    key: 'reviews',
    label: 'Đánh giá',
    element: <Reviews />,
  },
  {
    path: '/orders',
    key: 'order',
    label: 'Đặt hàng',
    element: <Order />,
  },
  {
    path: '/information',
    key: 'information',
    label: 'Thông tin',
    element: <Information />,
  },
];

export const routes: AppRoute[] = [
  ...publicRoutes,
  {
    path: '/',
    key: 'root',
    label: 'Dashboard',
    element: <Navigate to="/dashboard" replace />,
  },
  ...privateRoutes.map(route => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
  })),
];