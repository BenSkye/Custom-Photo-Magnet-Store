import heroSectionRepo from '../repositories/heroSection.repo';
import { IHeroSection } from '../interface/heroSection.interface';
import { BadRequestError } from '../core/error.response';


class HeroSectionService {
    static async createHeroSection(data: IHeroSection) {
        try {
            return await heroSectionRepo.createHeroSection(data);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error creating hero section: ${error.message}`);
            }
        }
    }

    static async getHeroSection() {
        return await heroSectionRepo.getHeroSection();
    }

    static async updateHeroSection(data: IHeroSection) {
        try {
            return await heroSectionRepo.updateHeroSection(data);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestError(`Error updating hero section: ${error.message}`);
            }
        }
    }
}

export default HeroSectionService;