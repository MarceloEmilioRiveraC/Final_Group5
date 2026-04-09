import type { Category, Product } from '@domain/entities/Category';

const BASE_URL = 'https://api.escuelajs.co/api/v1';


export const catalogueApi = {
  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  getProducts: async (offset = 0, limit = 12): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getProductsByCategory: async (categoryId: number, offset = 0, limit = 12): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}/products?offset=${offset}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch products by category');
    return res.json();
  },
};