import React from 'react';
import { InstagramOutlined, FacebookOutlined, YoutubeOutlined, TikTokOutlined } from '@ant-design/icons';


const Footer: React.FC = () => {
    return (
        <footer className="bg-[#2D3339] py-6">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 text-white">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Brand Section */}
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-white text-2xl font-medium mb-1">
                            Ảnh Nam Châm
                        </h2>
                        <p className="text-gray-400">
                            Lưu giữ khoảnh khắc trên những bức hình
                        </p>
                    </div>

                    {/* Social Media Section */}
                    <div className="text-center md:text-right flex flex-col items-center">
                        <h3 className="text-gray-400 text-sm font-medium mb-3">
                            SOCIAL MEDIA
                        </h3>
                        <div className="flex items-center space-x-8">
                            <a
                                href="#"
                                className="text-white hover:text-white transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <InstagramOutlined className="text-xl" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="TikTok"
                            >
                                <TikTokOutlined className="text-xl" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <FacebookOutlined className="text-xl" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="YouTube"
                            >
                                <YoutubeOutlined className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;