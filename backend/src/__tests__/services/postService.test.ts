import { PostModel } from '../../models/Posts'
import * as statsService from '../../services/statsService'
import * as postService from '../../services/postService'
import { jest } from '@jest/globals'
import { describe, it, expect, afterEach } from '@jest/globals'
// Mock Mongoose PostModel
jest.mock('../../models/Posts', () => {
  const mockSort = jest.fn()
  const mockPopulate = jest.fn().mockReturnValue({ sort: mockSort })
  const mockFind = jest.fn().mockReturnValue({ populate: mockPopulate })

  return {
    PostModel: Object.assign(
      jest.fn().mockImplementation((data: any) => ({
        ...data,
        save: jest.fn().mockResolvedValue(data),
      })),
      {
        find: mockFind,
        findByIdAndDelete: jest.fn(),
        findByIdAndUpdate: jest.fn(),
      }
    ),
    __mockFind: mockFind,
    __mockPopulate: mockPopulate,
    __mockSort: mockSort,
  }
})

// Mock statsService
jest.mock('../../services/statsService', () => ({
  incrementLikes: jest.fn().mockResolvedValue(undefined),
  incrementShares: jest.fn().mockResolvedValue(undefined),
  incrementBuys: jest.fn().mockResolvedValue(undefined),
}))

describe('PostService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // ---------- getAllPosts ----------

  describe('getAllPosts', () => {
    it('should call find, populate, and sort', async () => {
      const mockPosts = [{ title: 'Post 1' }, { title: 'Post 2' }]
      const { __mockSort } = require('../../models/Posts')
      __mockSort.mockResolvedValue(mockPosts)

      const result = await postService.getAllPosts()
      expect(PostModel.find).toHaveBeenCalled()
      expect(result).toEqual(mockPosts)
    })
  })

  // ---------- createPost ----------

  describe('createPost', () => {
    it('should create and save a new post', async () => {
      const postData = {
        title: 'Test Post',
        description: 'A description',
        imageUrl: 'http://img.com/test.jpg',
        userId: 'user-123',
      }

      const result = await postService.createPost(postData)
      expect(result).toMatchObject(postData)
    })
  })

  // ---------- deletePost ----------

  describe('deletePost', () => {
    it('should delete an existing post', async () => {
      const mockPost = { _id: 'post-1', title: 'Deleted' };
      (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockPost)

      const result = await postService.deletePost('post-1')
      expect(PostModel.findByIdAndDelete).toHaveBeenCalledWith('post-1')
      expect(result).toEqual(mockPost)
    })

    it('should throw if post is not found', async () => {
      (PostModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null)

      await expect(postService.deletePost('nonexistent')).rejects.toThrow('Post not found')
    })
  })

  // ---------- likePost ----------

  describe('likePost', () => {
    it('should increment likes and update stats', async () => {
      const mockPost = { _id: 'post-1', likes: 1 };
      (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockPost)

      const result = await postService.likePost('post-1')
      expect(PostModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'post-1',
        { $inc: { likes: 1 } },
        { new: true }
      )
      expect(statsService.incrementLikes).toHaveBeenCalled()
      expect(result).toEqual(mockPost)
    })

    it('should throw if post is not found', async () => {
      (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null)

      await expect(postService.likePost('nonexistent')).rejects.toThrow('Post not found')
    })
  })

  // ---------- sharePost ----------

  describe('sharePost', () => {
    it('should increment shared count and update stats', async () => {
      const mockPost = { _id: 'post-1', shared: 1 };
      (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockPost)

      const result = await postService.sharePost('post-1')
      expect(PostModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'post-1',
        { $inc: { shared: 1 } },
        { new: true }
      )
      expect(statsService.incrementShares).toHaveBeenCalled()
      expect(result).toEqual(mockPost)
    })

    it('should throw if post is not found', async () => {
      (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null)

      await expect(postService.sharePost('nonexistent')).rejects.toThrow('Post not found')
    })
  })

  // ---------- boughtPost ----------

  describe('boughtPost', () => {
    it('should increment bought count and update stats', async () => {
      const mockPost = { _id: 'post-1', bought: 1 };
      (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockPost)

      const result = await postService.boughtPost('post-1')
      expect(PostModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'post-1',
        { $inc: { bought: 1 } },
        { new: true }
      )
      expect(statsService.incrementBuys).toHaveBeenCalled()
      expect(result).toEqual(mockPost)
    })

    it('should throw if post is not found', async () => {
      (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null)

      await expect(postService.boughtPost('nonexistent')).rejects.toThrow('Post not found')
    })
  })
})
