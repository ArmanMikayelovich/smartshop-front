import axios from 'axios';
import {Product} from "./types";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/public',
    timeout: 10000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data?.message ||
            'Network error. Please check your connection.';
        return Promise.reject(errorMessage);
    }
);

export const productService = {
    getProducts: () => api.get('/products')
        .then(res => res.data)
        .catch(err => { throw new Error(err); }),
    // Search products
    searchProducts: (query: string) =>
        api.get<Product[]>('/products/search', {
            params: { q: query }
        }).then(res => res.data),

    getProductById: (id: string) => api.get(`/products/${id}`)
        .then(res => res.data)
        .catch(err => { throw new Error(err); }),

    getCategories: () => api.get('/categories')
        .then(res => res.data)
        .catch(err => { throw new Error(err); }),


};