import { getPosts } from '@application/posts/getPosts'
import { createPost } from '@application/posts/createPost'
import { deletePost } from '@application/posts/deletePost'
import { likePost } from '@application/posts/likePost'
import { sharePost } from '@application/posts/sharePost'
import { boughtPost } from '@application/posts/boughtPost'
import type { IPostRepository } from '@domain/repositories/IPostRepository'
import type { Post } from '@domain/entities/Post'

const mockRepo: jest.Mocked<IPostRepository> = {
  getAll: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  like: jest.fn(),
  share: jest.fn(),
  buy: jest.fn(),
}

const samplePost: Post = {
  _id: 'p1',
  title: 'Test Post',
  description: 'A test',
  imageUrl: 'http://img.com/test.jpg',
  createdAt: new Date(),
  likes: 0,
  shared: 0,
  bought: 0,
  userId: 'u1',
}

describe('Post Use Cases', () => {
  afterEach(() => jest.clearAllMocks())

  describe('getPosts', () => {
    it('should call repository.getAll and return posts', async () => {
      mockRepo.getAll.mockResolvedValue([samplePost])

      const result = await getPosts(mockRepo)

      expect(mockRepo.getAll).toHaveBeenCalled()
      expect(result).toEqual([samplePost])
    })

    it('should return empty array when no posts', async () => {
      mockRepo.getAll.mockResolvedValue([])

      const result = await getPosts(mockRepo)

      expect(result).toEqual([])
    })
  })

  describe('createPost', () => {
    it('should call repository.create with post data', async () => {
      const newData = { title: 'New Post', imageUrl: 'http://img.com/new.jpg' }
      mockRepo.create.mockResolvedValue({ ...samplePost, ...newData })

      const result = await createPost(mockRepo, newData)

      expect(mockRepo.create).toHaveBeenCalledWith(newData)
      expect(result.title).toBe('New Post')
    })
  })

  describe('deletePost', () => {
    it('should call repository.delete with the post id', async () => {
      mockRepo.delete.mockResolvedValue(undefined)

      await deletePost(mockRepo, 'p1')

      expect(mockRepo.delete).toHaveBeenCalledWith('p1')
    })
  })

  describe('likePost', () => {
    it('should call repository.like with the post id', async () => {
      const likedPost = { ...samplePost, likes: 1 }
      mockRepo.like.mockResolvedValue(likedPost)

      const result = await likePost(mockRepo, 'p1')

      expect(mockRepo.like).toHaveBeenCalledWith('p1')
      expect(result.likes).toBe(1)
    })
  })

  describe('sharePost', () => {
    it('should call repository.share with the post id', async () => {
      const sharedPost = { ...samplePost, shared: 1 }
      mockRepo.share.mockResolvedValue(sharedPost)

      const result = await sharePost(mockRepo, 'p1')

      expect(mockRepo.share).toHaveBeenCalledWith('p1')
      expect(result.shared).toBe(1)
    })
  })

  describe('boughtPost', () => {
    it('should call repository.buy with the post id', async () => {
      const boughtP = { ...samplePost, bought: 1 }
      mockRepo.buy.mockResolvedValue(boughtP)

      const result = await boughtPost(mockRepo, 'p1')

      expect(mockRepo.buy).toHaveBeenCalledWith('p1')
      expect(result.bought).toBe(1)
    })
  })
})
