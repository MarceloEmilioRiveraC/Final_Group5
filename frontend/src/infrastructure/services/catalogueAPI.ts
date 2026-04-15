import type { Category, Product } from '@domain/entities/Category';
const BACKEND_URL = 'http://localhost:5000/api';
const EXTERNAL_URL = 'https://api.escuelajs.co/api/v1';

// Transform backend post to Product format
const transformPostToProduct = (post: any): Product => {
  return {
    id: post._id || post.id,
    title: post.title,
    price: 0, // Add price from your posts if available
    description: post.description || '',
    images: Array.isArray(post.images) ? post.images : [post.imageUrl || ''],
    category: {
      id: 1,
      name: 'Clothing',
      image: '',
      slug: 'clothing',
    },
  };
};

export const catalogueApi = {
  // Get all posts from your backend
  getProducts: async (offset = 0, limit = 12): Promise<Product[]> => {
    const res = await fetch(`${BACKEND_URL}/posts?offset=${offset}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch products from backend');
    const posts = await res.json();
    return posts.map(transformPostToProduct);
  },

  // Fallback to external API for categories
  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${EXTERNAL_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  // Get products by category (from external API as fallback)
  getProductsByCategory: async (categoryId: number, offset = 0, limit = 12): Promise<Product[]> => {
    const res = await fetch(`${EXTERNAL_URL}/categories/${categoryId}/products?offset=${offset}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch products by category');
    return res.json();
  },
};