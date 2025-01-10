import { useEffect, useMemo, memo, useState } from 'react';
import { Card, Form, Input, InputNumber } from 'antd';
import { IProductCard } from '../../types/productCard';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { formatPrice } from '../../utils/format/formatPrice';

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
                    {formatPrice(price)}
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
        <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <Form
                form={form}
                layout="vertical"
                onValuesChange={handleValuesChange}
                onFinish={handleFinish}
                initialValues={initialValues}
                className="space-y-4"
            >
                <Form.Item name="imageUrl" hidden>
                    <Input />
                </Form.Item>

                {/* Image Upload Section */}
                <div className="relative mb-6 group">
                    <Upload
                        name="productImage"
                        listType="picture-card"
                        className="w-full"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleImageChange}
                    >
                        <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
                            {previewImage ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={previewImage}
                                        alt="product"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <PlusOutlined className="text-2xl mb-2" />
                                            <p className="text-sm">Thay đổi ảnh</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                    {imageLoading ? (
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                            <p className="text-gray-600">Đang tải...</p>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            <PlusOutlined className="text-2xl mb-2" />
                                            <p>Tải ảnh lên</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Upload>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input
                            placeholder="Nhập tiêu đề"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Nhập mô tả"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Giá"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <InputNumber
                            className="w-full rounded-md"
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            min={0}
                            step={1000}
                            addonAfter="đ"
                        />
                    </Form.Item>
                </div>
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