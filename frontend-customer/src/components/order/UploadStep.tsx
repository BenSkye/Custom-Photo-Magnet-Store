// Component cho bước 1: Upload ảnh
import { Upload, Button, message } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Dragger } = Upload;

interface UploadStepProps {
    fileList: UploadFile[];
    setFileList: (files: UploadFile[]) => void;
    onNext: () => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ fileList, setFileList, onNext }) => {
    const calculatePrice = () => {
        const pricePerImage = fileList.length >= 6 ? 20000 : 25000;
        return fileList.length * pricePerImage;
    };

    const handleChange = (info: any) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.filter(file => {
            const isImage = file.type?.startsWith('image/');
            if (!isImage) {
                message.error('Chỉ chấp nhận file ảnh!');
            }
            return isImage;
        });
        setFileList(newFileList);
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Copy nội dung từ phần Upload Area cũ */}
            <div className="max-w-2xl mx-auto">
                <Dragger
                    multiple
                    listType="picture"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false}
                    accept="image/*"
                    className="mb-8"
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Bấm để tải ảnh lên</p>
                    <p className="ant-upload-hint">
                        Định dạng PNG, JPG, JPEG
                    </p>
                </Dragger>

                {/* Selected Images Preview */}
                {fileList.length > 0 && (
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Ảnh đã chọn: {fileList.length}</h3>
                            <Button
                                danger
                                onClick={() => setFileList([])}
                                icon={<DeleteOutlined />}
                            >
                                Xóa tất cả
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {fileList.map(file => (
                                <div key={file.uid} className="relative group">
                                    <img
                                        src={URL.createObjectURL(file.originFileObj as Blob)}
                                        alt={file.name}
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => {
                                            const newFileList = fileList.filter(item => item.uid !== file.uid);
                                            setFileList(newFileList);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <DeleteOutlined />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <span>Số lượng ảnh:</span>
                        <span className="font-semibold">{fileList.length}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span>Giá mỗi ảnh:</span>
                        <span className="font-semibold">
                            {fileList.length >= 6 ? '20,000₫' : '25,000₫'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Tổng tiền:</span>
                        <span className="text-red-500">
                            {calculatePrice().toLocaleString()}₫
                        </span>
                    </div>
                </div>
                {/* ... */}
                <div className="flex justify-end gap-4">
                    <Button
                        type="primary"
                        size="large"
                        disabled={fileList.length === 0}
                        onClick={onNext}
                        className="bg-blue-500"
                    >
                        Tiếp tục
                    </Button>
                </div>
            </div>
        </div>
    );
};