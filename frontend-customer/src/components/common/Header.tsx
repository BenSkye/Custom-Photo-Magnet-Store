import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { key: '/', label: 'Trang chủ' },
        { key: '/products', label: 'Sản phẩm' },
        { key: '/reviews', label: 'Đánh giá' },
        { key: '/contact', label: 'Liên hệ' },
    ];

    return (
        <header className="fixed w-full z-10 flex justify-center items-center bg-white lg:py-2 ">
            <Menu
                mode="horizontal"
                defaultSelectedKeys={['/']}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
                style={{
                    border: 'none',

                }}
                className="hidden lg:flex !flex-nowrap"  // Ngăn items bị wrap
                overflowedIndicator={null}
                disabledOverflow={true}  // Vô hiệu hóa overflow behavior của Ant Design
            />
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="lg:hidden mr-auto"
            />
            {/* Mobile Menu */}
            {collapsed && (
                <div className="lg:hidden fixed top-8 left-0 w-full h-screen bg-white z-50">
                    <Menu
                        mode="inline"
                        items={menuItems}
                        onClick={({ key }) => {
                            navigate(key);
                            setCollapsed(false);
                        }}
                    />
                </div>
            )}
        </header>
    );
};

export default Header;