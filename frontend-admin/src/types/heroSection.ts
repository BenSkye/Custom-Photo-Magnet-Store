
export interface IHeroImage {
    imageUrl: string;
    altText: string;
}

export interface IHeroSection {
    title: string;
    subTitle: string;
    description: string;
    images: IHeroImage[];
}