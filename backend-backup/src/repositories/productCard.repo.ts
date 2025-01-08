import { productCardModel } from '../models/productCard.model';
import { IProductCard, IProductCardCreate} from '../interface/productCard.interface';

class ProductCardRepo {
    async getProductCardById(id: string) {
        return await productCardModel.findById(id);
    }

    async getProductCards() {
        return await productCardModel.find();
    }

    async createProductCard(data: IProductCardCreate) {
        return await productCardModel.create(data);
    }

    async updateProductCard(id: string, data: IProductCard) {
        return await productCardModel.findByIdAndUpdate(id, data, { new: true });
    }
}

export default new ProductCardRepo();