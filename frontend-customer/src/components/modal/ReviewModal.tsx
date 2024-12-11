import { Form, Button, Modal, Input, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Review } from '../../types/review';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Review) => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
    const [form] = Form.useForm();

    const handleSubmit = (values: Review) => {
        onSubmit(values);
        form.resetFields();
    };

    return (
        <Modal
            title="Viết bình luận"
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="pt-4"
            >
                <Form.Item
                    name="name"
                    label="Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input placeholder="Nhập tên của bạn" />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Vai trò"
                    rules={[{ required: true, message: 'Vui lòng nhập vai trò!' }]}
                >
                    <Input placeholder="Ví dụ: Khách hàng" />
                </Form.Item>

                <Form.Item
                    name="comment"
                    label="Bình luận"
                    rules={[
                        { required: true, message: 'Vui lòng nhập bình luận!' },
                        { max: 400, message: 'Bình luận không được quá 400 từ!' }
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Nhập bình luận của bạn (tối đa 400 từ)"
                        maxLength={400}
                        showCount
                    />
                </Form.Item>

                <Form.Item
                    name="rating"
                    label="Đánh giá"
                    rules={[{ required: true, message: 'Vui lòng chọn đánh giá!' }]}
                >
                    <Rate />
                </Form.Item>

                <Form.Item className="mb-0 flex justify-end gap-2">
                    <Button onClick={onClose} className='mr-2'>
                        Hủy
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Gửi bình luận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}