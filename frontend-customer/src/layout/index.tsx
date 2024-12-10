import React from 'react';
import { Layout } from 'antd';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';


interface LayoutProps {
    children: React.ReactNode;
}

const { Content } = Layout;


const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Layout>
            <Header />
            <Layout>
                <Content
                    className="
                        min-h-screen 
                        p-6 
                        mt-16 
                        transition-all 
                        duration-300
                        bg-gray-100
                    "
                >
                    {children}
                </Content>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default MainLayout;