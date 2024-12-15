import { Modal, Button, Descriptions } from 'antd';

interface Customer {
    fullName: string;
    phone: string;
    address: {
        district: string;
        ward: string;
        addressDetail: string;
    }
    note?: string;
}

interface CustomerDetailModalProps {
    customer: Customer | null;
    visible: boolean;
    onClose: () => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
    customer,
    visible,
    onClose
}) => {
    if (!customer) return null;

    return (
        <Modal
            title="Chi tiết khách hàng"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>
            ]}
            width={600}
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Họ và tên">
                    {customer.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                    {customer.phone}
                </Descriptions.Item>

                <Descriptions.Item label="Quận/Huyện">
                    {(customer.address.district)}
                </Descriptions.Item>
                <Descriptions.Item label="Phường/Xã">
                    {(customer.address.ward)}
                </Descriptions.Item>
                {customer.note && (
                    <Descriptions.Item label="Ghi chú">
                        {customer.note}
                    </Descriptions.Item>
                )}
            </Descriptions>
        </Modal>
    );
};