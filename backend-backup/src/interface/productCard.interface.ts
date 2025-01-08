export interface IProductCard {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface IProductCardCreate {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}