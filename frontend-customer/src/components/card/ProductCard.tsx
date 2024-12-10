import { ProductCardProps } from '../../types/productCardProps';
import { Button } from '../button/Button';

export const ProductCard: React.FC<ProductCardProps> = ({
    image,
    title,
    description,
    price,
    priceUnit,
    onViewMore,
    onOrder
}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-[680px] flex flex-col justify-between">
            <div>
                <img
                    src={image}
                    alt={title}
                    className="rounded-lg w-full h-[180px] object-cover mb-3"
                />
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {description}
                </p>
            </div>
            <div>
                <div className="mb-4">
                    <span className="text-sm text-gray-600">Giá: </span>
                    <span className="text-lg font-bold text-red-500">{price}</span>
                    <span className="text-sm text-gray-600">/{priceUnit}</span>
                </div>
                <div className="flex flex-row  gap-2">
                    <Button
                        variant='secondary'
                        onClick={onViewMore}
                        className="w-full text-sm py-1.5 px-4"
                    >
                        XEM THÊM THÔNG TIN
                    </Button>
                    <Button
                        variant='primary'
                        onClick={onOrder}
                        className="w-full text-sm py-1.5 px-4"
                    >
                        ĐẶT NGAY
                    </Button>
                </div>
            </div>
        </div>
    );
};