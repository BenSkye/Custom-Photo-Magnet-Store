import { useEffect } from 'react';
import { Card, Form, Input, InputNumber } from 'antd';
import { IProductCard } from '../../types/productCard';

interface ProductCardProps extends IProductCard {
    isEditing: boolean;
    onUpdate: (id: string, data: IProductCard) => Promise<void>;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    _id,
    imageUrl,
    title,
    description,
    price,
    isEditing,
    onUpdate
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEditing) {
            form.setFieldsValue({
                title,
                description,
                price,
            });
        }
    }, [isEditing, form, title, description, price]);

    const handleFinish = async (values: any) => {
        if (!_id) {
            console.error('Product ID is missing!');
            return;
        };
        await onUpdate(_id, {
            _id,
            imageUrl,
            ...values
        });
    };

    const ViewMode = () => (
        <Card className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[680px] flex flex-col justify-between">
            <div>
                <img
                    src={imageUrl}
                    alt={title}
                    className="rounded-lg w-full h-[180px] object-cover mb-3"
                />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {description}
                </p>
            </div>
            <div>
                <div className="mb-4 flex items-center">
                    <span className="text-sm text-gray-600">Giá: </span>
                    <span className="text-2xl font-bold text-red ml-1">
                        {price} đ
                    </span>
                </div>
            </div>
        </Card>
    );

    const EditMode = () => (
        <Card className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <div className="mb-4">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-lg w-full h-[180px] object-cover"
                    />
                </div>

                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder="Nhập tiêu đề" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input.TextArea rows={3} placeholder="Nhập mô tả" />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                >
                    <InputNumber
                        className="w-full"
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
            </Form>
        </Card>
    );

    return isEditing ? <EditMode /> : <ViewMode />;
};