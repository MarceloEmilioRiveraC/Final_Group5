import { useState, useEffect, useCallback } from 'react'
import type { Category, Product } from '@domain/entities/Category'
import { catalogueApi } from '@infrastructure/services/catalogueAPI'

export const useCatalogue = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  // Load categories on mount
  const loadCategories = useCallback(async () => {
    try {
      const data = await catalogueApi.getCategories()
      console.log('Categories loaded:', data)
      // Extra safety: filter for valid categories only
      const validCategories = data.filter(cat => cat && cat.id && cat.name);
      setCategories(validCategories)
    } catch (err) {
      console.error('Error loading categories:', err)
      setError('Failed to load categories')
    }
  }, [])

  // Load products from allowed clothing types
  const loadProducts = useCallback(async (categoryId?: number, newOffset = 0) => {
    try {
      setLoading(true)
      console.log('Starting product load...', { categoryId, newOffset })
      let data: Product[]
      
      if (categoryId) {
        // Load products from specific category
        console.log(`Fetching products for category ${categoryId}...`)
        data = await catalogueApi.getProductsByCategory(categoryId, newOffset, 12)
      } else {
        // Load all products
        console.log('Fetching all products...')
        data = await catalogueApi.getProducts(newOffset, 12)
      }
      
      console.log(`Got ${data.length} products from API`)
      
      // Extra safety: filter to ensure all products are valid
      const validProducts = data.filter(p => p && p.id && p.title);
      
      console.log(`After filtering: ${validProducts.length} valid products`)
      
      if (newOffset === 0) {
        setProducts(validProducts)
      } else {
        setProducts(prev => [...prev, ...validProducts])
      }
      
      setHasMore(validProducts.length === 12)
      setOffset(newOffset + 12)
    } catch (err) {
      console.error('Error loading products - Full error:', err)
      console.error('Error message:', (err as Error).message)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load more clothing items
  const loadMore = useCallback(async (categoryId?: number) => {
    try {
      setLoadingMore(true)
      let data: Product[]
      
      if (categoryId) {
        data = await catalogueApi.getProductsByCategory(categoryId, offset, 12)
      } else {
        data = await catalogueApi.getProducts(offset, 12)
      }
      
      // Extra safety: filter to ensure all products are valid
      const validProducts = data.filter(p => p && p.id && p.title);
      
      setProducts(prev => [...prev, ...validProducts])
      setHasMore(validProducts.length === 12)
      setOffset(prev => prev + 12)
    } catch (err) {
      setError('Failed to load more products')
      console.error('Error loading more products:', err)
    } finally {
      setLoadingMore(false)
    }
  }, [offset])

  // Load clothing types on mount
  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  // Load clothing items on mount
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    categories,
    products,
    loading,
    loadingMore,
    error,
    hasMore,
    loadProducts,
    loadMore,
  }
}
