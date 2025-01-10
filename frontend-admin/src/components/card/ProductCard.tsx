import { useEffect, useMemo, memo, useState } from 'react';
import { Card, Form, Input, InputNumber } from 'antd';
import { IProductCard } from '../../types/productCard';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface ProductCardProps extends IProductCard {
    isEditing: boolean;
    onUpdate: (id: string, data: IProductCard) => Promise<void>;
    onFormChange?: (id: string, values: any) => void;
    onImageUpload?: (file: File) => Promise<string>;
}

const ViewMode = memo(({ imageUrl, title, description, price }: IProductCard) => (
    <Card className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[680px] flex flex-col justify-between">
        <div>
            <img
                src={imageUrl}
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
                    {price.toLocaleString('vi-VN')} đ
                </span>
            </div>
        </div>
    </Card>
));

// Tách EditMode thành component riêng
const EditMode = memo(({
    form,
    imageUrl,
    initialValues,
    handleValuesChange,
    handleFinish,
    onImageUpload,
}: {
    form: any;
    imageUrl: string;
    initialValues: any;
    handleValuesChange: (changedValues: any, allValues: any) => void;
    handleFinish: (values: any) => void;
    onImageUpload?: (file: File) => Promise<string>;
}) => {
    const [imageLoading, setImageLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(imageUrl);

    const handleImageChange = async (info: any) => {
        if (!onImageUpload) return;

        const file = info.file;

        // Kiểm tra file có tồn tại không
        if (!file) return;

        setImageLoading(true);

        try {


            // Upload file và lấy URL mới
            const newImageUrl = await onImageUpload(file);

            console.log('====================================');
            console.log('newImageUrl', newImageUrl);
            console.log('====================================');

            // Cập nhật preview
            setPreviewImage(newImageUrl);

            // Cập nhật giá trị trong form
            form.setFieldsValue({ imageUrl: newImageUrl });

            // Trigger form change để cập nhật state ở component cha
            handleValuesChange(
                { imageUrl: newImageUrl },
                { ...form.getFieldsValue(), imageUrl: newImageUrl }
            );
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setImageLoading(false);
        }
    };

    return (
        <Card className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500">
            <Form
                form={form}
                layout="vertical"
                onValuesChange={handleValuesChange}
                onFinish={handleFinish}
                initialValues={initialValues}
            >
                <Form.Item name="imageUrl" hidden>
                    <Input />
                </Form.Item>

                <div className="mb-4">
                    <Upload
                        name="productImage"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleImageChange}
                    >
                        {previewImage ? (
                            <div className="relative group">
                                <img
                                    src={previewImage}
                                    alt="product"
                                    className="w-full h-[180px] object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                                    <PlusOutlined className="text-white text-2xl" />
                                </div>
                            </div>
                        ) : (
                            <div>
                                {imageLoading ? 'Uploading...' : 'Upload'}
                            </div>
                        )}
                    </Upload>
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
                        min={0}
                        step={1000}
                    />
                </Form.Item>
            </Form>
        </Card>
    );
});

export const ProductCard: React.FC<ProductCardProps> = ({
    _id,
    imageUrl,
    title,
    description,
    price,
    isEditing,
    onUpdate,
    onFormChange,
    onImageUpload
}) => {
    const [form] = Form.useForm();
    const initialValues = useMemo(() => ({
        title,
        description,
        price,
        imageUrl,
    }), [title, description, price, imageUrl]);

    useEffect(() => {
        if (isEditing) {
            form.setFieldsValue(initialValues);
        }
    }, [isEditing]);

    const handleValuesChange = (_: any, allValues: any) => {
        if (onFormChange) {
            onFormChange(_id, allValues);
        }
    };

    const handleFinish = async (values: any) => {
        try {
            if (!_id) {
                console.error('Product ID is missing!');
                return;
            }
            await onUpdate(_id, {
                _id,
                imageUrl: values.imageUrl || imageUrl,
                ...values
            });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return isEditing ? (
        <EditMode
            form={form}
            imageUrl={imageUrl}
            initialValues={initialValues}
            handleValuesChange={handleValuesChange}
            handleFinish={handleFinish}
            onImageUpload={onImageUpload}
        />
    ) : (
        <ViewMode
            _id={_id}
            imageUrl={imageUrl}
            title={title}
            description={description}
            price={price}
        />
    );
};