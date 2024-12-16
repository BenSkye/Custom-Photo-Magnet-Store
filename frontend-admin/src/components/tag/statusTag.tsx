import { Tag } from 'antd';
import { IOrderStatus } from '../../types/statusOrder';

export const StatusTag = ({ status }: { status: IOrderStatus }) => {
    return <Tag color={status.color}>{status.name}</Tag>;
};