import React from 'react';
import { Layout, Button, Space, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Header
            className="
                fixed 
                w-full 
                z-10 
                px-2
                sm:px-4
                md:px-6 
                flex 
                justify-between 
                items-center 
                bg-white 
                shadow-sm
            "
            style={{ height: '64px' }}
        >
            {/* Logo và Welcome text */}
            <div className="flex items-center">
                <Text
                    strong
                    className="
                        text-sm
                        sm:text-base 
                        md:text-lg 
                        lg:text-xl 
                        text-blue-600
                        truncate
                        max-w-[200px]
                        sm:max-w-none
                        pl-12
                    "
                >
                    Dashboard
                </Text>
            </div>

            {/* Logout Button */}
            <Space>
                <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className="
                        flex 
                        items-center 
                        hover:text-blue-600 
                        transition-colors
                        text-xs
                        sm:text-sm
                        md:text-base
                        px-2
                        sm:px-3
                        md:px-4
                    "
                >
                    <span className="hidden sm:inline">Đăng xuất</span>
                </Button>
            </Space>
        </Header>
    );
};

export default AppHeader;