import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, Select, message, Image, Divider, Modal } from 'antd';
import { getOrderById, updateOrderStatus } from '../services/orderService';
import { formatPrice } from '../utils/format/formatPrice';
import { STATUS_CODE } from '../utils/constants/index';
import { Order } from '../types/order';
import { StatusTag } from '../components/tag/statusTag';
import { getAllStatus } from '../services/statusOrderService';
import { IOrderStatus } from '../types/statusOrder';
import { formatTimeDate } from '../utils/format/formateDate';

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [statusList, setStatusList] = useState<IOrderStatus[]>([]);


    useEffect(() => {
        fetchOrderDetail();
        fetchStatusList();
    }, [id]);

    // Tìm status hiện tại của order
    const currentStatus = useMemo(() => {
        if (!order || !statusList.length) return null;
        return statusList.find(s => s._id === order.status);
    }, [order, statusList]);

    // Tìm status được chọn để update
    const selectedStatusInfo = useMemo(() => {
        if (!selectedStatus || !statusList.length) return null;
        return statusList.find(s => s._id === selectedStatus);
    }, [selectedStatus, statusList]);

    // status được phép cập nhật
    const nextStatus = useMemo(() => {
        if (!currentStatus || !statusList.length) return null;
        return statusList.find(status => status.order === currentStatus.order + 1);
    }, [currentStatus, statusList]);

    const fetchStatusList = async () => {
        try {
            const response = await getAllStatus();
            setStatusList(response.metadata);
        } catch (error) {
            if (error instanceof Error) {
                message.error('Không thể tải danh sách trạng thái: ' + error.message);
            } else {
                message.error('Không thể tải danh sách trạng thái');
            }
        }
    };

    const fetchOrderDetail = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await getOrderById(id);
            setOrder(response.metadata);
        } catch (error) {
            if (error instanceof Error) {
                message.error(error.message || 'Không thể tải thông tin đơn hàng');
            } else {
                message.error('Không thể tải thông tin đơn hàng');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!id) return message.error('Không tìm thấy đơn hàng');
        if (!selectedStatus) return message.error('Vui lòng chọn trạng thái');

        try {
            const response = await updateOrderStatus(id, selectedStatus);
            if (response.status === STATUS_CODE.UPDATE_SUCCESS) {
                message.success('Cập nhật trạng thái thành công');
                fetchOrderDetail();
                setIsModalVisible(false);
                setSelectedStatus('');
            }
        } catch (error) {
            if (error instanceof Error) {
                message.error('Không thể cập nhật trạng thái: ' + error.message);
            } else {
                message.error('Không thể cập nhật trạng thái');
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedStatus('');
    };

    if (!order) return null;

    return (
        <div className="p-6">
            <div className="mb-4">
                <Button onClick={() => navigate('/orders')}>← Quay lại</Button>
            </div>

            <Card loading={loading}>
                <Descriptions title="Thông tin đơn hàng" bordered>
                    <Descriptions.Item label="Mã đơn hàng">{order.code}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {currentStatus && (
                            <StatusTag status={currentStatus} />
                        )}
                    </Descriptions.Item>

                    <Descriptions.Item label="Cập nhật trạng thái">
                        <Select
                            value={selectedStatus}
                            onChange={(value) => {
                                setSelectedStatus(value);
                                setIsModalVisible(true);
                            }}
                            style={{ width: 200 }}
                            placeholder="Chọn trạng thái mới"
                            onSelect={(value) => {
                                // Luôn show modal khi có selection, kể cả khi chọn giá trị giống hiện tại
                                setSelectedStatus(value);
                                setIsModalVisible(true);
                            }}
                            onDropdownVisibleChange={(open) => {
                                // Chỉ pre-select khi mở dropdown và chưa có selectedStatus
                                if (open && nextStatus && !selectedStatus) {
                                    setSelectedStatus(nextStatus._id || '');
                                }
                            }}
                        >
                            {statusList.map((status) => (
                                <Select.Option
                                    key={status._id}
                                    value={status._id}
                                >
                                    {status.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Descriptions.Item>

                    <Descriptions.Item label="Khách hàng" span={3}>
                        <div>{order.customer.fullName}</div>
                        <div>{order.customer.phone}</div>
                        <div>{order.customer.address.detailAddress}</div>
                    </Descriptions.Item>

                    <Descriptions.Item label="Ngày đặt hàng" span={3}>
                        <div>{formatTimeDate(order.createdAt)}</div>
                    </Descriptions.Item>

                    <Descriptions.Item label="Ghi chú" span={3}>
                        {order.customer.note || 'Không có ghi chú'}
                    </Descriptions.Item>
                </Descriptions>

                <Divider />

                <div>
                    <h3>Danh sách ảnh</h3>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="text-center">
                                <Image
                                    src={item.imageUrl}
                                    alt={`Ảnh ${index + 1}`}
                                    width={200}
                                />
                                <div className="mt-2">Số lượng: {item.quantity}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <Divider />

                <Descriptions bordered>
                    <Descriptions.Item label="Tổng số lượng">
                        {order.pricing.totalQuantity} ảnh
                    </Descriptions.Item>
                    <Descriptions.Item label="Đơn giá">
                        {formatPrice(order.pricing.pricePerImage)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền" >
                        <span className="font-bold text-red">
                            {formatPrice(order.pricing.totalAmount)}
                        </span>
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            {/* Modal Comfirm*/}
            <Modal
                title="Xác nhận thay đổi trạng thái"
                open={isModalVisible}
                onOk={handleConfirm}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng từ</p>
                <p className="font-bold">
                    {currentStatus?.name} → {selectedStatusInfo?.name}
                </p>
            </Modal>
        </div>
    );
}