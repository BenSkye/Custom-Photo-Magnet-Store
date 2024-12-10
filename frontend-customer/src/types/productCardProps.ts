export interface ProductCardProps {
    image: string;
    title: string;
    description: string;
    price: string;
    priceUnit: string;
    onViewMore?: () => void;
    onOrder?: () => void;
}