import { AppRoute } from '../types/route';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Reviews from '../pages/Reviews';
import Contact from '../pages/Contact';

export const routes: AppRoute[] = [
  {
    path: '/',
    key: 'home',
    label: 'Trang chủ',
    element: <Home />,
  },
  {
    path: '/products',
    key: 'products',
    label: 'Sản phẩm',
    element: <Products />,
  },
  {
    path: '/reviews',
    key: 'reviews',
    label: 'Đánh giá',
    element: <Reviews />,
  },
  {
    path: '/contact',
    key: 'contact',
    label: 'Liên hệ',
    element: <Contact />,
  },
];