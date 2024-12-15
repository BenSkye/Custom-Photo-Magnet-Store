import { Modal } from 'antd';
import { formatPrice } from '../../utils/format/formatPrice';

interface ConfirmOrderModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    totalImages: number;
    totalPrice: number;
    isLoading?: boolean;
}

export const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    totalImages,
    totalPrice,
    isLoading = false
}) => {
    return (
        <Modal
            title="Xác nhận đặt hàng"
            open={isOpen}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Xác nhận"
            cancelText="Hủy"
            okButtonProps={{
                className: 'bg-blue-500',
                loading: isLoading
            }}
            cancelButtonProps={{
                disabled: isLoading
            }}
        >
            <p>Bạn có chắc chắn muốn đặt hàng với thông tin đã nhập?</p>
            <div className="mt-4 text-gray-600">
                <p>Tổng số ảnh: x{totalImages}</p>
                <p className="text-lg">Tổng tiền: <span className="font-bold text-red">{formatPrice(totalPrice)}</span></p>
            </div>
        </Modal>
    );
};