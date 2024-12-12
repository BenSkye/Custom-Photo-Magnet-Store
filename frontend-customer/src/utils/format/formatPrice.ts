export const formatPrice = (price: number, unit: string = '₫') => {
    return `${price.toLocaleString('vi-VN')}${unit}`;
}