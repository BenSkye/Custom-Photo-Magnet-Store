import { IProductCard, IProductCardCreate } from '../interface/productCard.interface';
import ProductCardRepo from '../repositories/productCard.repo';
import { BadRequestError } from '../core/error.response';

class ProductCardService {
    static async getProductCardById(id: string) {
        return await ProductCardRepo.getProductCardById(id);
    }

    static async getProductCards() {
        return await ProductCardRepo.getProductCards();
    }

    static async createProductCard(data: IProductCardCreate) {
        try {
            return await ProductCardRepo.createProductCard(data);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error creating product card: ${error.message}`);
            }
        }
    }

    static async updateProductCard(id: string, data: IProductCard) {
        try {
            return await ProductCardRepo.updateProductCard(id, data);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error updating product card: ${error.message}`);
            }
        }
    }
}

export default ProductCardService;