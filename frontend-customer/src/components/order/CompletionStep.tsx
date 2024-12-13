import { useState } from 'react';
import { Button, message } from 'antd';
import { OrderInfo } from '../../types/orderInfor';
import { formatPrice } from '../../utils/format/formatPrice';
import { ConfirmOrderModal } from '../modal/ConfirmOrderModal';
import { FIREBASE_STORAGE_PATH, STATUS_CODE } from '../../utils/constants';
import { uploadImages } from '../../services/uploadService';
import { IndexedDBService } from '../../services/indexedDBService';
import { createOrder } from '../../services/orderService';
import { IOrderRequest } from '../../types/order';


const indexedDBService = new IndexedDBService();
interface CompletionStepProps {
    orderInfo?: OrderInfo;
    totalImages: number;
    totalPrice: number;
    onPrev: () => void;
    onConfirm: (isSuccess: boolean) => void;
}
interface SavedFile {
    file: File;
    name: string;
    quantity: number;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({
    orderInfo,
    totalImages,
    totalPrice,
    onPrev,
    onConfirm,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleConfirmClick = () => {
        setIsModalOpen(true);
    };

    const handleModalConfirm = async () => {
        setIsUploading(true);
        try {
            const loadingMessage = message.loading('Đang xử lý đơn hàng...', 0);

            // Lấy files từ IndexedDB
            const savedFiles = await indexedDBService.getFromIndexedDB() as SavedFile[];

            // Upload từng file lên Firebase
            const uploadPromises = savedFiles.map(async (savedFile: SavedFile) => {
                const imageUrl = await uploadImages(savedFile.file, `${FIREBASE_STORAGE_PATH.ORDERS_IMG}/${Date.now()}-${savedFile.name}`);
                return {
                    imageUrl,
                    quantity: savedFile.quantity || 1
                };
            });

            const uploadedImages = await Promise.all(uploadPromises);

            const orderPayload: IOrderRequest = {
                customer: {
                    fullName: orderInfo?.fullName || '',
                    phone: orderInfo?.phone || '',
                    address: {
                        district: orderInfo?.district || '',
                        ward: orderInfo?.ward || '',
                        detailAddress: orderInfo?.address || ''
                    },
                    note: orderInfo?.note
                },
                orderItems: uploadedImages
            };

            // Gọi API tạo order
            const response = await createOrder(orderPayload);

            if (response.status === STATUS_CODE.CREATE_SUCCESS) {
                message.success('Đặt hàng thành công!');
                // Xóa files đã upload khỏi IndexedDB
                await indexedDBService.clearIndexedDB();
                // Gửi thông báo thành công
                onConfirm(true);
            } else {
                message.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
                // Gửi thông báo thất bại
                onConfirm(false);
            }
            // Đóng loading message
            loadingMessage();
            // Đóng modal và chuyển đến bước tiếp theo
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error processing order:', error);
            message.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
            // Gửi thông báo thất bại
            onConfirm(false);
        } finally {
            setIsUploading(false);
            setIsModalOpen(false);
        }
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6">HOÀN TẤT ĐỂ ĐẶT HÀNG</h2>

                {/* Thông tin khách hàng */}
                <div className="space-y-3 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-600 sm:w-40 mb-1 sm:mb-0">Họ tên: </span>
                        <span className="font-medium break-words max-w-[calc(100%-10rem)] overflow-hidden">{orderInfo?.fullName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-600 sm:w-40 mb-1 sm:mb-0">Số điện thoại:</span>
                        <span className="font-medium break-words max-w-[calc(100%-10rem)] overflow-hidden">{orderInfo?.phone}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <span className="text-gray-600 sm:w-40 mb-1 sm:mb-0">Địa chỉ nhận hàng:</span>
                        <span className="font-medium break-words max-w-[calc(100%-10rem)] overflow-hidden">{orderInfo?.address}</span>
                    </div>
                    {orderInfo?.note && (
                        <div className="flex flex-col sm:flex-row">
                            <span className="text-gray-600 sm:w-40 mb-1 sm:mb-0">Ghi chú:</span>
                            <span className="font-medium break-words max-w-[calc(100%-10rem)] overflow-hidden">
                                {orderInfo.note}
                            </span>
                        </div>
                    )}
                </div>

                {/* Thông tin đơn hàng */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-3 mb-4 sm:mb-6">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Số lượng ảnh:</span>
                        <span className="font-medium">x{totalImages}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tiền ảnh:</span>
                        <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                        <span className="font-bold">Tổng tiền:</span>
                        <span className="font-bold text-red text-2xl">{formatPrice(totalPrice)}</span>
                    </div>
                </div>

                <p className="text-red-500 text-xs sm:text-sm text-center mb-4 sm:mb-6">
                    Hãy bấm HOÀN TẤT nếu tất cả thông tin trên đã chính xác bạn nhé
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <Button
                        size="large"
                        onClick={onPrev}
                        className="min-w-[120px]"
                    >
                        QUAY LẠI
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleConfirmClick}
                        className="min-w-[120px] bg-blue-500"
                        loading={isUploading}
                    >
                        HOÀN TẤT
                    </Button>
                </div>
            </div>
            <ConfirmOrderModal
                isOpen={isModalOpen}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
                totalImages={totalImages}
                totalPrice={totalPrice}
                isLoading={isUploading}
            />
        </div>
    );
};