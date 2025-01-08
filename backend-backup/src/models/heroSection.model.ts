import { Schema, model, Document } from "mongoose";
import { IHeroSection } from '../interface/heroSection.interface';
import { COLLECTION_DOCUMENT_NAME, COLLECTION_NAME_CONST } from '../utils/constants';

const heroSectionSchema = new Schema<IHeroSection>({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [
            {
                imageUrl: {
                    type: String,
                    required: true
                },
                altText: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME_CONST.HERO_SECTION
})

export const heroSectionModel = model<IHeroSection>(COLLECTION_DOCUMENT_NAME.HERO_SECTION, heroSectionSchema);



