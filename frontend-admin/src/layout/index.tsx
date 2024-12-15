// frontend-admin/src/layout/index.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Grid, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';

const { Content } = Layout;
const { useBreakpoint } = Grid;

interface LayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const screens = useBreakpoint();

    // Reset mobile drawer when screen size changes
    useEffect(() => {
        if (screens.md) {
            setMobileOpen(false);
        }
    }, [screens.md]);

    // Mobile menu toggle
    const toggleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Layout className="min-h-screen">
            {/* Header */}
            <Header />

            <Layout>
                {/* Desktop Sidebar */}
                <div className="hidden md:block">
                    <Sidebar
                        collapsed={collapsed}
                        onCollapse={setCollapsed}
                    />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden fixed left-4 top-4 z-50">
                    <Button
                        type="primary"
                        icon={<MenuOutlined />}
                        onClick={toggleMobileMenu}
                        className="flex items-center justify-center"
                    />
                </div>

                {/* Mobile Drawer */}
                <Drawer
                    placement="left"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    className="md:hidden"
                    bodyStyle={{ padding: 0 }}
                    width={250}
                >
                    <Sidebar
                        collapsed={false}
                        onCollapse={() => { }}
                    />
                </Drawer>

                {/* Main Content */}
                <Layout
                    className="transition-all duration-300"
                    style={{
                        marginLeft: screens.md ? (collapsed ? '80px' : '250px') : '0',
                    }}
                >
                    <Content
                        className="
                            min-h-[calc(100vh-64px)]
                            px-4 
                            py-4
                            sm:px-6 
                            sm:py-6
                            md:px-8
                            md:py-6
                            mt-16
                        "
                    >
                        <div className="
                            bg-white 
                            rounded-lg 
                            shadow-sm 
                            p-4 
                            sm:p-6 
                            md:p-8
                        ">
                            {children}
                        </div>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default MainLayout;