import { useState, useEffect } from 'react'
import type { Post } from '@domain/entities/Post'
import { PostRepository } from '@infrastructure/repositories/PostRepository'
import { getPosts }   from '@application/posts/getPosts'
import { createPost } from '@application/posts/createPost'
import { deletePost } from '@application/posts/deletePost'
import { likePost }   from '@application/posts/likePost'
import { sharePost }  from '@application/posts/sharePost'
import { boughtPost } from '@application/posts/boughtPost'

const repo = new PostRepository()

export const usePosts = () => {
  const [posts,   setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getPosts(repo)
      setPosts(data)
    } catch {
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (data: Partial<Post>) => {
    const post = await createPost(repo, data)
    setPosts(prev => [post, ...prev])
  }

  const handleDelete = async (id: string) => {
    await deletePost(repo, id)
    setPosts(prev => prev.filter(p => p._id !== id))
  }

  const handleLike = async (id: string) => {
    const updated = await likePost(repo, id)
    setPosts(prev => prev.map(p => p._id === id ? updated : p))
  }

  const handleShare = async (id: string) => {
    const updated = await sharePost(repo, id)
    setPosts(prev => prev.map(p => p._id === id ? updated : p))
  }

  const handleBuy = async (id: string) => {
    const updated = await boughtPost(repo, id)
    setPosts(prev => prev.map(p => p._id === id ? updated : p))
  }

  useEffect(() => { load() }, [])

  return { posts, loading, error, handleCreate, handleDelete, handleLike, handleShare, handleBuy }
}