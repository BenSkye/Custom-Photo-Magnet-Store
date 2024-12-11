import { Link } from 'react-router-dom';
import { Button } from '../components/button/Button';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Collapse } from 'antd';
import { AnimateWrapper } from '../utils/animate/AnimateWrapper';
import { ZALO_PHONE } from '../utils/constants';

export default function Information() {
    return (
        <div className="container mx-auto px-4 py-8">
            <AnimateWrapper variant="slideRight" delay={0.2}>
                <div className="flex flex-col items-center justify-center text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Ảnh nam châm Anacha là gì?</h1>
                    <p className="mb-4">
                        Sau 1 thời gian mày mò và nghiên cứu, Anacha giới thiệu đến các bạn một loại ảnh hoàn toàn mới: Ảnh nam châm.
                    </p>
                    <p className="mb-4">
                        Khác với những loại ảnh truyền thống, khó bảo quản và ít khi sử dụng, thì ảnh nam châm được thiết kế để giữ được độ bền trong nhiều năm, dễ dàng hít ở những vật dụng có từ tính trong nhà như tủ lạnh, tủ sắt,...dễ dàng nhìn ngắm mỗi ngày.
                    </p>
                    <p className="mb-4">
                        Thì ảnh nam châm được tạo ra với mục đích thú vị hơn hẳn.
                    </p>
                </div>
            </AnimateWrapper>

            <AnimateWrapper variant="slideLeft" delay={0.2}>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-4 mb-8">
                    <img src="/hinhanh.jpg" alt="Ảnh 1" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 2" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 3" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 4" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 5" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 6" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 7" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 8" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 8" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 8" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 8" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/hinhanh.jpg" alt="Ảnh 8" className="w-full h-auto rounded-lg shadow-md" />
                    <img src="/combo.jpg" alt="Ảnh 8" className="w-full h-auto rounded-lg shadow-md" />
                </div>
            </AnimateWrapper>

            <AnimateWrapper variant="slideRight" delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
                    <Card className="bg-blue-100 p-4 rounded-lg shadow-md">
                        <p className="text-sm">
                            Ảnh nam châm có kích thước nhỏ gọn 5,4x7,8cm, dày 3mm, nặng 25 gram, rất thích hợp cho việc trang trí.
                            Đặc biệt, Anacha tặng thêm keo dán Nano 2 mặt để bạn có thể dán lên các bề mặt khác trong nhà như gỗ, tường, kính...
                        </p>
                    </Card>
                    <Card className="bg-green-100 p-4 rounded-lg shadow-md">
                        <p className="text-sm">
                            Ảnh nam châm Anacha rất chắc chắn do được cấu tạo từ 5 lớp nguyên liệu khác nhau, đảm bảo độ bền bỉ, không sợ ảnh hư hại theo thời gian.
                        </p>
                    </Card>
                    <Card className="bg-orange-100 p-4 rounded-lg shadow-md">
                        <p className="text-sm">
                            Ảnh nam châm Anacha là ảnh được tạo ra nhờ việc kết hợp đắp ghép 5 lớp khác nhau:
                            <ul className="list-disc pl-5 ">
                                <li>Ngoài cùng là 1 lớp nhựa bóng để chống thấm nước và bảo vệ ảnh</li>
                                <li>Tiếp đến là lớp ảnh được in trên giấy glossy cao cấp</li>
                                <li>Ở giữa là khung kim loại để cố định khuôn ảnh, tạo sự chắc chắn</li>
                                <li>Bên dưới là một lớp đệm để tạo độ dày cho ảnh nam châm</li>
                                <li>Và cuối cùng là một lớp nam châm giúp ảnh có thể hít lên các bề mặt kim loại có từ tính</li>
                            </ul>
                        </p>
                    </Card>
                </div>
            </AnimateWrapper>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link to="/order">
                    <Button variant="primary" bgColor="bg-purple-500/75">
                        <ShoppingCartOutlined className="text-lg" />
                        ĐẶT NGAY
                    </Button>
                </Link>
                <a href={`https://zalo.me/${ZALO_PHONE}`} target="_blank" rel="noopener noreferrer">
                    <Button
                        variant="secondary"
                        icon={<img src='/icons8-zalo-32.png' className="w-6 h-6" />}
                    >
                        NHẮN ZALO
                    </Button>
                </a>
            </div>
            <AnimateWrapper variant="slideRight" delay={0.2}>

                <h2 className="text-2xl font-bold text-center mb-4">Các câu hỏi thường gặp</h2>
                <Collapse accordion>
                    <Collapse.Panel header="Cách gửi ảnh cho Anacha?" key="1">
                        <p>Các bạn có thể vào đây để tải ảnh lên cho Anacha, tụi mình sẽ in gửi đến tận nơi.</p>
                        <p>Hoặc cũng có thể liên hệ qua Zalo: 0357223172</p>
                    </Collapse.Panel>
                    <Collapse.Panel header="Giá tiền cho ảnh Anacha như thế nào?" key="2">
                        <p>Giá tiền phụ thuộc vào số lượng và kích thước ảnh bạn chọn.</p>
                    </Collapse.Panel>
                    <Collapse.Panel header="Thời gian giao hàng là bao lâu?" key="3">
                        <p>Thời gian giao hàng thường từ 3-5 ngày làm việc.</p>
                    </Collapse.Panel>
                    <Collapse.Panel header="Chính sách bảo hành?" key="4">
                        <p>Anacha cam kết bảo hành sản phẩm trong vòng 1 năm.</p>
                    </Collapse.Panel>
                </Collapse>
            </AnimateWrapper>
        </div>
    );
}