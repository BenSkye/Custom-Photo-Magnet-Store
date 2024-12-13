import { useState, useEffect } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import { OrderInfo } from '../types/orderInfor';
import { ImageQuantity } from '../types/imageQuantity';
import { IndexedDBService } from '../services/indexedDBService';

export const useOrderStorage = () => {
    const indexedDBService = new IndexedDBService();
    
    // State cho files và quantities sẽ được load từ IndexedDB
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageQuantities, setImageQuantities] = useState<ImageQuantity[]>([]);

    // Các state khác vẫn dùng localStorage
    const [current, setCurrent] = useState(() => {
        const saved = localStorage.getItem('orderStep');
        return saved ? parseInt(saved) : 0;
    });

    const [orderInfo, setOrderInfo] = useState<OrderInfo | undefined>(() => {
        const saved = localStorage.getItem('orderInfo');
        return saved ? JSON.parse(saved) : undefined;
    });

    const [orderStatus, setOrderStatus] = useState<'success' | 'failure' | null>(() => {
        const saved = localStorage.getItem('orderStatus');
        return saved ? JSON.parse(saved) : null;
    });

    // Load files từ IndexedDB khi component mount
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

                    const quantities = savedFiles.map((item: any) => ({
                        uid: item.uid,
                        quantity: item.quantity || 1
                    }));
                    setImageQuantities(quantities);
                }
            } catch (error) {
                console.error('Error loading files from IndexedDB:', error);
            }
        };

        loadSavedFiles();
    }, []);

    // Lưu các state khác vào localStorage
    useEffect(() => {
        localStorage.setItem('orderStep', current.toString());
    }, [current]);

    useEffect(() => {
        localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
    }, [orderInfo]);

    useEffect(() => {
        localStorage.setItem('orderStatus', JSON.stringify(orderStatus));
    }, [orderStatus]);

    // Clear tất cả data
    const clearOrderData = async () => {
        // Clear IndexedDB
        await indexedDBService.clearIndexedDB();
        
        // Clear localStorage
        localStorage.removeItem('orderStep');
        localStorage.removeItem('orderInfo');
        localStorage.removeItem('orderStatus');
        
        // Reset states
        setFileList([]);
        setImageQuantities([]);
        setCurrent(0);
        setOrderInfo(undefined);
        setOrderStatus(null);
    };

    return {
        current,
        setCurrent,
        fileList,
        setFileList,
        imageQuantities,
        setImageQuantities,
        orderInfo,
        setOrderInfo,
        orderStatus,
        setOrderStatus,
        clearOrderData
    };
};