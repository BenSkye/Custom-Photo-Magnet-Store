import { AppRoute } from '../types/route';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Reviews from '../pages/Reviews';
import Contact from '../pages/Contact';
import Order from '../pages/Order';
import Information from '../pages/Information';

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
  {
    path: '/order',
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