export interface Product {
    id: number;
    name: string;
    price: number;
    mainImage: string;
    categoryName: string; // Single category name
    description?: string;
}

export interface ProductDetails {
    id: number;
    name: string;
    price: number;
    images: string[];
    categoryName: string;
    description: string;
    available: true
}