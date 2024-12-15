import React from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    ShoppingOutlined,
    CommentOutlined,
    DollarOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

const menuItems = [
    {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/manage-price',
        icon: <DollarOutlined />,
        label: 'Quản lý giá',
    },
    {
        key: '/orders',
        icon: <ShoppingOutlined />,
        label: 'Quản lý đơn hàng',
    },
    {
        key: '/reviews',
        icon: <CommentOutlined />,
        label: 'Quản lý đánh giá',
    },
    // {
    //     key: '/settings',
    //     icon: <SettingOutlined />,
    //     label: 'Cài đặt',
    // },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = (key: string) => {
        navigate(key);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            className="bg-white fixed h-screen w-[250px] left-0 top-16 bottom-0 overflow-auto"
            width={250}
        >
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                className="h-full border-r-0"
                items={menuItems}
                onClick={({ key }) => handleMenuClick(key)}
            />
        </Sider>
    );
};

export default Sidebar;