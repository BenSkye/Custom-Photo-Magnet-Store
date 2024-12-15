import { getCurrentPriceConfig } from './priceConfigService';
import { IPriceConfig } from '../types/priceConfig';

export const getProducts = async () => {
    try {
        const response = await getCurrentPriceConfig();
        const priceConfig: IPriceConfig = response.metadata;
        if (!priceConfig.bulkDiscountThreshold || !priceConfig.normalPerImagePrice || !priceConfig.bulkPerImagePrice) {
            throw new Error('Cấu hình giá không hợp lệ');
        }
        return [
            {
                image: '/combo.jpg',
                title: `Combo từ ${priceConfig.bulkDiscountThreshold} ảnh`,
                description: `Đặt in ảnh nam châm theo combo để được ưu đãi với giá tốt nhất. Nguyên 1 bộ ${priceConfig.bulkDiscountThreshold} ảnh chỉ có giá ${priceConfig.bulkPerImagePrice * priceConfig.bulkDiscountThreshold} thôi...`,
                price: priceConfig.bulkPerImagePrice,
                priceUnit: 'bộ',
            },
            {
                image: '/anhle.jpg',
                title: 'In ảnh nam châm lẻ',
                description: `Nếu bạn chỉ muốn in 1 vài hình nhỏ để làm kỉ niệm, tụi mình sẵn sàng tiêp nhận. Cứ mạnh dạn gửi ảnh, tụi mình sẵn lòng in với số lượng chỉ 1 cái...`,
                price: priceConfig.normalPerImagePrice,
                priceUnit: 'cái',
            }
        ];
    } catch (error) {
        console.error('Error in getProducts:', error);
        return [];
    }
};