import { useEffect, useState } from 'react';
import { Upload, Button, message, Image } from 'antd';
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { formatPrice } from '../../utils/format/formatPrice';
import { IndexedDBService } from '../../services/indexedDBService';
import { ImageQuantity } from '../../types/imageQuantity';
import { getCurrentPriceConfig } from '../../services/priceConfigService';
import { IPriceConfig } from '../../types/priceConfig';
import { UploadStepSkeleton } from '../skeleton/UploadStepSkeleton';



const { Dragger } = Upload;

interface UploadStepProps {
    fileList: UploadFile[];
    setFileList: (files: UploadFile[]) => void;
    imageQuantities: ImageQuantity[];
    setImageQuantities: React.Dispatch<React.SetStateAction<ImageQuantity[]>>;
    onNext: () => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ fileList,
    setFileList,
    imageQuantities,
    setImageQuantities,
    onNext }) => {

    const indexedDBService = new IndexedDBService();
    const [priceConfig, setPriceConfig] = useState<IPriceConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPriceConfig = async () => {
            try {
                const response = await getCurrentPriceConfig();
                setPriceConfig(response.metadata);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching price config:', error);
            }
        };
        fetchPriceConfig();
    }, []);

    useEffect(() => {
        const loadSavedFiles = async () => {
            try {
                const savedFiles = await indexedDBService.getFromIndexedDB();
                if (savedFiles && Array.isArray(savedFiles)) {
                    const files = savedFiles.map((item: any) => ({
                        uid: item.uid,
                        name: item.name,
                        type: item.type,
                        originFileObj: item.file,
                    }));
                    setFileList(files);

                    // Restore quantities
                    const quantities = savedFiles.map((item: any) => ({
                        uid: item.uid,
                        quantity: item.quantity
                    }));
                    setImageQuantities(quantities);
                }
            } catch (error) {
                console.error('Error loading files from IndexedDB:', error);
            }
        };

        loadSavedFiles();
    }, []);

    useEffect(() => {
        const saveToIndexedDB = async () => {
            try {
                const filesWithQuantities = fileList.map(file => ({
                    ...file,
                    quantity: getQuantity(file.uid)
                }));
                await indexedDBService.saveToIndexedDB(filesWithQuantities);
            } catch (error) {
                console.error('Error saving to IndexedDB:', error);
            }
        };

        saveToIndexedDB();
    }, [fileList, imageQuantities]);

    const calculatePrice = () => {
        const totalQuantity = fileList.reduce((sum, file) => {
            return sum + getQuantity(file.uid);
        }, 0);
        const pricePerImage =
            totalQuantity >= (priceConfig?.bulkDiscountThreshold || 0) ?
                (priceConfig?.bulkPerImagePrice || 0) :
                (priceConfig?.normalPerImagePrice || 0);
        return totalQuantity * pricePerImage;
    };

    const handleChange = async (info: any) => {
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

    const getQuantity = (uid: string) => {
        const item = imageQuantities.find(item => item.uid === uid);
        return item?.quantity || 1;
    };

    const updateQuantity = (uid: string, action: 'increase' | 'decrease') => {
        setImageQuantities((prev: ImageQuantity[]) => {
            const existing = prev.find(item => item.uid === uid);
            if (!existing) {
                return [...prev, { uid, quantity: action === 'increase' ? 2 : 1 }];
            }

            return prev.map(item => {
                if (item.uid === uid) {
                    const newQuantity = action === 'increase'
                        ? item.quantity + 1
                        : Math.max(1, item.quantity - 1);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const handleDeleteImage = async (uid: string) => {
        try {
            // Xóa khỏi IndexedDB
            await indexedDBService.deleteFromIndexedDB(uid);

            // Cập nhật state
            const newFileList = fileList.filter(item => item.uid !== uid);
            setFileList(newFileList);
            setImageQuantities(imageQuantities.filter(item => item.uid !== uid));

            message.success('Đã xóa ảnh thành công');
        } catch (error) {
            console.error('Error deleting file from IndexedDB:', error);
            message.error('Có lỗi xảy ra khi xóa ảnh');
        }
    };

    if (loading || !priceConfig) {
        return <UploadStepSkeleton />;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="max-w-2xl mx-auto">
                <Dragger
                    multiple
                    listType="picture"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false}
                    accept="image/*"
                    className="mb-8"
                    showUploadList={false}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>

                    <p className="text-center font-medium">
                        <span className="text-gray">Giá ảnh: </span>
                        <span className="text-red">{formatPrice(priceConfig?.normalPerImagePrice || 0)}/ảnh</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-gray">Từ {priceConfig?.bulkDiscountThreshold || 0} ảnh: </span>
                        <span className="text-green">{formatPrice(priceConfig?.bulkPerImagePrice || 0)}/ảnh</span>
                    </p>

                    <p className="ant-upload-text">Bấm để tải ảnh lên</p>
                    <p className="ant-upload-hint">
                        Định dạng PNG, JPG, JPEG
                    </p>
                </Dragger>

                {/* Selected Images Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 md:mb-8 lg:mt-4">
                    {fileList.map(file => (
                        <div key={file.uid} className="relative">
                            {/* Badge số lượng */}
                            <div className="absolute text-red top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-1.5 rounded-full z-10 text-sm font-medium shadow-md">
                                x{getQuantity(file.uid)} cái
                            </div>

                            {/* Nút xóa */}
                            <button
                                onClick={() => handleDeleteImage(file.uid)}
                                className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full z-10 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md"
                            >
                                <DeleteOutlined />
                            </button>

                            {/* Ảnh */}
                            <Image
                                src={URL.createObjectURL(file.originFileObj as Blob)}
                                alt={file.name}
                                className="w-full h-40 md:h-32 object-cover rounded-lg shadow-md"
                            />

                            {/* Controls số lượng */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                                <button
                                    onClick={() => updateQuantity(file.uid, 'decrease')}
                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <span className="text-xl font-medium">−</span>
                                </button>
                                <span className="w-12 text-center font-medium text-gray-800">
                                    {getQuantity(file.uid)}
                                </span>
                                <button
                                    onClick={() => updateQuantity(file.uid, 'increase')}
                                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <span className="text-xl font-medium">+</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <span>Số lượng ảnh:</span>
                        <span className="font-semibold">
                            x{fileList.reduce((sum, file) => sum + getQuantity(file.uid), 0)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span>Giá mỗi ảnh:</span>
                        <span className="font-semibold">
                            {fileList.reduce((sum, file) => sum + getQuantity(file.uid), 0) >= (priceConfig?.bulkDiscountThreshold || 0) ? formatPrice(priceConfig?.bulkPerImagePrice || 0) : formatPrice(priceConfig?.normalPerImagePrice || 0)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Tổng tiền:</span>
                        <span className="text-red">
                            {formatPrice(calculatePrice())}
                        </span>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="primary"
                        size="large"
                        disabled={fileList.length === 0}
                        onClick={onNext}
                    >
                        Tiếp tục
                    </Button>
                </div>
            </div>
        </div>
    );
};