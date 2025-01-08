import { heroSectionModel } from '../models/heroSection.model';
import { IHeroSection } from '../interface/heroSection.interface';

class HeroSectionRepo {
    async createHeroSection(data: IHeroSection) {
        return await heroSectionModel.create(data);
    }

    async getHeroSection() {
        return await heroSectionModel.findOne();
    }

    async updateHeroSection(data: IHeroSection) {
        return await heroSectionModel.findOneAndUpdate({}, data, { new: true });
    }

}

export default new HeroSectionRepo();