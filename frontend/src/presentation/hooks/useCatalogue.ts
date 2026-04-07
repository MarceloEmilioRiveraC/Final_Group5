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
      setCategories(data)
    } catch (err) {
      setError('Failed to load categories')
    }
  }, [])

  // Load products
  const loadProducts = useCallback(async (categoryId?: number, newOffset = 0) => {
    try {
      setLoading(true)
      let data: Product[]
      
      if (categoryId) {
        data = await catalogueApi.getProductsByCategory(categoryId, newOffset, 12)
      } else {
        data = await catalogueApi.getProducts(newOffset, 12)
      }
      
      if (newOffset === 0) {
        setProducts(data)
      } else {
        setProducts(prev => [...prev, ...data])
      }
      
      setHasMore(data.length === 12)
      setOffset(newOffset + 12)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  // Load more products
  const loadMore = useCallback(async (categoryId?: number) => {
    try {
      setLoadingMore(true)
      let data: Product[]
      
      if (categoryId) {
        data = await catalogueApi.getProductsByCategory(categoryId, offset, 12)
      } else {
        data = await catalogueApi.getProducts(offset, 12)
      }
      
      setProducts(prev => [...prev, ...data])
      setHasMore(data.length === 12)
      setOffset(prev => prev + 12)
    } catch (err) {
      setError('Failed to load more products')
    } finally {
      setLoadingMore(false)
    }
  }, [offset])

  // Load categories on mount
  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  // Load products on mount
  useEffect(() => {
    loadProducts()
  }, [])

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
