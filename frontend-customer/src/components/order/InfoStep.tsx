import { Form, Input, Button } from 'antd';

interface InfoStepProps {
    onPrev: () => void;
    onNext: () => void;
    onSubmit: (values: any) => void;
}

export const InfoStep: React.FC<InfoStepProps> = ({ onPrev, onNext, onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
            onNext();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tên người nhận"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                >
                    <Input placeholder="Xin ghi rõ họ và tên" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                    <Input placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ nhận ảnh"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                >
                    <Input placeholder="Địa chỉ" />
                </Form.Item>

                <Form.Item label="Ghi chú" name="note">
                    <Input.TextArea placeholder="Nếu cần gấp hoặc có lưu ý hãy cho shop biết" />
                </Form.Item>

                <div className="flex justify-end gap-4">
                    <Button size="large" onClick={onPrev}>Quay lại</Button>
                    <Button type="primary" size="large" onClick={handleSubmit} className="bg-blue-500">
                        Tiếp tục
                    </Button>
                </div>
            </Form>
        </div>
    );
};