import { useEffect, useState } from 'react';
import { Card, Form, InputNumber, Button, message, Modal } from 'antd';
import { IPriceConfig } from '../types/priceConfig';
import { getCurrentPriceConfig, updatePriceConfig } from '../services/priceConfigService';
import { STATUS_CODE } from '../utils/constants';
import { formatPrice } from '../utils/format/formatPrice';

export default function ManagePrice() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [getPriceLoading, setGetPriceLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPriceValues, setNewPriceValues] = useState<IPriceConfig | null>(null);
    const [prices, setPrices] = useState<IPriceConfig>({
        _id: '',
        isActive: true,
        normalPerImagePrice: 0,
        bulkPerImagePrice: 0,
        bulkDiscountThreshold: 0,
    });

    useEffect(() => {
        setGetPriceLoading(true);
        try {
            const fetchPriceConfig = async () => {
                const response = await getCurrentPriceConfig();
                const priceConfig = response.metadata;
                setPrices(priceConfig);
                form.setFieldsValue(priceConfig);
            };
            fetchPriceConfig();
        } catch (error) {
            console.error('Error fetching price config:', error);
        } finally {
            setGetPriceLoading(false);
        }
    }, []);

    const showConfirmModal = (values: IPriceConfig) => {
        setNewPriceValues(values);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNewPriceValues(null);
    };

    const handleConfirm = async () => {
        if (!newPriceValues) return;
        setLoading(true);
        try {
            const response = await updatePriceConfig(prices._id, newPriceValues);
            if (response.status === STATUS_CODE.UPDATE_SUCCESS) {
                message.success('Cập nhật giá thành công');
                setPrices(newPriceValues);
            } else {
                message.error('Có lỗi xảy ra khi cập nhật giá');
            }
        } catch (error) {
            if (error instanceof Error) {
                message.error('Có lỗi xảy ra khi cập nhật giá: ' + error.message);
            } else {
                message.error('Có lỗi xảy ra khi cập nhật giá');
            }
        } finally {
            setLoading(false);
            setIsModalVisible(false);
        }
    };

    if (getPriceLoading) {
        return <>Loading...</>;
    }

    return (
        <div className="p-6">
            <Card title="Quản lý giá" className="max-w-2xl mx-auto">
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={prices}
                    onFinish={showConfirmModal}
                >
                    <Form.Item
                        label="Giá in ảnh thường (VNĐ/ảnh)"
                        name="normalPerImagePrice"
                        rules={[{ required: true, message: 'Vui lòng nhập giá in ảnh thường' }]}
                    >
                        <InputNumber
                            type="number"
                            className="w-full"
                            min={0}
                            step={1000}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Giá in ảnh số lượng lớn (VNĐ/ảnh)"
                        name="bulkPerImagePrice"
                        rules={[{ required: true, message: 'Vui lòng nhập giá in ảnh số lượng lớn' }]}
                    >
                        <InputNumber
                            type="number"
                            className="w-full"
                            min={0}
                            step={1000}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng ảnh để được giá sỉ"
                        name="bulkDiscountThreshold"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng ảnh tối thiểu' }]}
                    >
                        <InputNumber
                            type="number"
                            className="w-full"
                            min={1}
                            step={1}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full bg-blue-500"
                        >
                            Cập nhật giá
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Modal
                title="Xác nhận thay đổi giá"
                open={isModalVisible}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn thay đổi giá với các thông tin sau:</p>
                {newPriceValues && (
                    <div className="mt-4">
                        <p>Giá in ảnh thường: <strong>{formatPrice(newPriceValues.normalPerImagePrice)}</strong></p>
                        <p>Giá in ảnh số lượng lớn: <strong>{formatPrice(newPriceValues.bulkPerImagePrice)}</strong></p>
                        <p>Số lượng ảnh để được giá sỉ: <strong>{newPriceValues.bulkDiscountThreshold} ảnh</strong></p>
                    </div>
                )}
            </Modal>
        </div>
    );
}