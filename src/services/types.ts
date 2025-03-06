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

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string; // Consider storing thumbnail URLs instead of base64
}

// Helper function to normalize products
export const mapToCartItem = (product: Product | ProductDetails): Omit<CartItem, 'quantity'> => {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: 'mainImage' in product
            ? product.mainImage
            : product.images?.[0] // Take first image from array if exists
    };
};