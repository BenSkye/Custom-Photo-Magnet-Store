import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { GOOGLE_MAP_URL, ZALO_PHONE } from '../utils/constants/index';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';


export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-4">LIÊN HỆ VỚI CHÚNG TÔI</h1>
                <p className="text-gray-600">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
            </div>

            <div className="grid grid-cols-1 gap-12">
                {/* Contact Information */}
                <AnimateWrapper variant="slideDown" delay={0.2}>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Thông Tin Liên Hệ</h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <EnvironmentOutlined className="text-2xl text-blue-500 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Địa Chỉ</h3>
                                    <p className="text-gray-600">Quận 9, TP.HCM</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <PhoneOutlined className="text-2xl text-blue-500 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Điện Thoại</h3>
                                    <p className="text-gray-600">{ZALO_PHONE}</p>
                                </div>
                            </div>
                            <a href={`https://zalo.me/${ZALO_PHONE}`} target="_blank" className="flex items-start space-x-4">
                                <img src='/icons8-zalo-32.png' className="text-2xl text-blue-500 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Zalo</h3>
                                    <p className="text-gray-600">{ZALO_PHONE}</p>
                                </div>
                            </a>

                            <div className="flex items-start space-x-4">
                                <MailOutlined className="text-2xl text-blue-500 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">info@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <ClockCircleOutlined className="text-2xl text-blue-500 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Giờ Làm Việc</h3>
                                    <p className="text-gray-600">Thứ 2 - Thứ 7: 9:00 - 18:00</p>
                                    <p className="text-gray-600">Chủ nhật: Đóng cửa</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="mt-8 rounded-lg overflow-hidden">
                            <iframe
                                src={GOOGLE_MAP_URL}
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>
                </AnimateWrapper>
            </div>
        </div>
    );
}