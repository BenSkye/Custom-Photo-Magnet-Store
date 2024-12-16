import { useState, useEffect } from 'react';
import { Table, Tabs, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/orderService';
import { formatPrice } from '../utils/format/formatPrice';
import { Order, Customer, Pricing } from '../types/order';
import { ExportOutlined } from '@ant-design/icons';
import { formatTimeDate } from '../utils/format/formateDate';
import { getAllStatus } from '../services/statusOrderService';
import { IOrderStatus } from '../types/statusOrder';
import { StatusTag } from '../components/tag/statusTag';

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [statusList, setStatusList] = useState<IOrderStatus[]>([]);

    useEffect(() => {
        fetchOrders();
        fetchStatusList();
    }, []);

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

    const columns: ColumnsType<Order> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            render: (id: string) => (
                <a onClick={() => navigate(`/order-detail/${id}`)} className="font-mono text-blue-600">
                    {id}
                    <ExportOutlined />
                </a>

            ),
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer: Customer) => (
                <div>
                    <div>{customer.fullName}</div>
                    <div className="text-gray-500">{customer.phone}</div>
                </div>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'pricing',
            key: 'pricing',
            render: (pricing: Pricing) => (
                <div className='flex flex-col'>
                    <div> {pricing.totalQuantity} × {formatPrice(pricing.pricePerImage)}</div>
                    <div>Tổng: <span className='font-bold text-red'>{formatPrice(pricing.totalAmount)}</span></div>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (statusId: string) => {
                const status = statusList.find(s => s._id === statusId);
                return status ? (
                    <StatusTag status={status} />
                ) : null;
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => formatTimeDate(date),
        },
    ];

    const filterOrdersByStatus = (status: string) => {
        return orders.filter(order => order.status === status);
    };

    return (
        <div className="p-6">
            <Tabs
                defaultActiveKey="all"
                items={[
                    {
                        key: 'all',
                        label: 'Tất cả',
                        children: <Table
                            columns={columns}
                            dataSource={orders}
                            loading={loading}
                            rowKey="_id"
                            pagination={{ pageSize: 10 }}
                        />
                    },
                    ...statusList.map(status => ({
                        key: status._id || '',
                        label: status.name,
                        children: <Table
                            columns={columns}
                            dataSource={filterOrdersByStatus(status._id || '')}
                            loading={loading}
                            rowKey="_id"
                            pagination={{ pageSize: 10 }}
                        />
                    })),
                ]}
            />
        </div>
    );
}