import { useState, useEffect } from 'react';
import { Table, Tag, Button, message, Modal, Select, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { getOrders } from '../services/orderService';
import { IPriceConfigRequest } from '../types/priceConfig';
import { formatPrice } from '../utils/format/formatPrice';
import { getOrderStatusLabel, ORDER_STATUS_COLORS, ORDER_STATUS_LABEL, OrderStatus } from '../utils/constants/index';

interface OrderItem {
    imageUrl: string;
    quantity: number;
}

interface Address {
    district: string;
    ward: string;
    detailAddress: string;
}

interface Customer {
    fullName: string;
    phone: string;
    address: Address;
    note: string;
}

interface Order {
    _id: string;
    customer: Customer;
    orderItems: OrderItem[];
    pricing: IPriceConfigRequest;
    status: keyof typeof ORDER_STATUS_LABEL;
    createdAt: string;
    updatedAt: string;

}

interface Pricing {
    totalAmount: number;
    totalQuantity: number;
    pricePerImage: number;
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrders();
            const orders = response.metadata;
            setOrders(orders);
        } catch (error) {
            if (error instanceof Error) {
                message.error('Không thể tải danh sách đơn hàng: ' + error.message);
            } else {
                message.error('Không thể tải danh sách đơn hàng');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (newStatus: string) => {
        if (!selectedOrder) return;

        try {
            // Replace with your actual API call
            await fetch(`your-api-endpoint/orders/${selectedOrder._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            message.success('Cập nhật trạng thái thành công');
            setIsModalVisible(false);
            fetchOrders();
        } catch (error) {
            if (error instanceof Error) {
                message.error('Không thể cập nhật trạng thái: ' + error.message);
            } else {
                message.error('Không thể cập nhật trạng thái');
            }
        }
    };

    const columns: ColumnsType<Order> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            render: (id: string) => <span className="font-mono">{id.slice(-6)}</span>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer: Customer) => (
                <div>
                    <div>{customer.fullName}</div>
                    <div className="text-gray-500">{customer.phone}</div>
                    <div className="text-gray-500 text-sm">{customer.address.detailAddress}</div>
                </div>
            ),
        },
        {
            title: 'Ảnh đặt in',
            dataIndex: 'orderItems',
            key: 'orderItems',
            render: (items: OrderItem[]) => (
                <div className="flex gap-2">
                    {items.map((item, index) => (
                        <div key={index} className="text-center">
                            <Image
                                src={item.imageUrl}
                                alt={`Ảnh ${index + 1}`}
                                width={50}
                                height={50}
                                className="object-cover"
                            />
                            <div className="text-xs mt-1">SL: {item.quantity}</div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'pricing',
            key: 'pricing',
            render: (pricing: Pricing) => (
                <div>
                    <div>{formatPrice(pricing.totalAmount)}</div>
                    <div className="text-gray-500 text-sm">
                        {pricing.totalQuantity} ảnh × {formatPrice(pricing.pricePerImage)}
                    </div>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: OrderStatus) => (
                <Tag color={ORDER_STATUS_COLORS[status]}>
                    {getOrderStatusLabel(status)}
                </Tag>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setSelectedOrder(record);
                        setIsModalVisible(true);
                    }}
                >
                    Cập nhật
                </Button>
            ),
        },

    ];

    return (
        <div className="p-6">
            <Table
                columns={columns}
                dataSource={orders}
                loading={loading}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 1200 }}
            />

            <Modal
                title="Cập nhật trạng thái đơn hàng"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <div className="space-y-4">
                    <Select
                        className="w-full"
                        value={selectedOrder?.status}
                        onChange={handleUpdateStatus}
                    >
                        {Object.entries(ORDER_STATUS_LABEL).map(([key, label]) => (
                            <Select.Option key={key} value={key}>
                                {label}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </Modal>
        </div>
    );
}