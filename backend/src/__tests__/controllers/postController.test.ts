import { Request, Response } from 'express'
import * as postController from '../../controllers/postController'
import * as postService from '../../services/postService'
jest.mock('../../services/postService')

const mockRes = (): Partial<Response> => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
})

describe('PostController', () => {
  afterEach(() => jest.clearAllMocks())

  // ---------- getAll ----------

  describe('getAll', () => {
    it('should return all posts with status 200', async () => {
      const posts = [{ title: 'Post 1' }, { title: 'Post 2' }];
      (postService.getAllPosts as jest.Mock).mockResolvedValue(posts)

      const req = {} as Request
      const res = mockRes()

      await postController.getAll(req, res as Response)

      expect(postService.getAllPosts).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(posts)
    })

    it('should return 500 on service error', async () => {
      (postService.getAllPosts as jest.Mock).mockRejectedValue(new Error('DB error'))

      const req = {} as Request
      const res = mockRes()

      await postController.getAll(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'DB error' })
    })
  })

  // ---------- create ----------

  describe('create', () => {
    it('should create a post and return 201', async () => {
      const postData = { title: 'New Post', imageUrl: 'http://img.com/new.jpg', userId: 'user1' }
      const createdPost = { _id: 'p1', ...postData };
      (postService.createPost as jest.Mock).mockResolvedValue(createdPost)

      const req = { body: postData } as Request
      const res = mockRes()

      await postController.create(req, res as Response)

      expect(postService.createPost).toHaveBeenCalledWith(postData)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(createdPost)
    })

    it('should return 400 on validation error', async () => {
      (postService.createPost as jest.Mock).mockRejectedValue(new Error('Validation failed'))

      const req = { body: {} } as Request
      const res = mockRes()

      await postController.create(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Validation failed' })
    })
  })

  // ---------- remove ----------

  describe('remove', () => {
    it('should delete a post and return success message', async () => {
      (postService.deletePost as jest.Mock).mockResolvedValue({})

      const req = { params: { id: 'post-1' } } as unknown as Request
      const res = mockRes()

      await postController.remove(req, res as Response)

      expect(postService.deletePost).toHaveBeenCalledWith('post-1')
      expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted' })
    })

    it('should return 404 if post not found', async () => {
      (postService.deletePost as jest.Mock).mockRejectedValue(new Error('Post not found'))

      const req = { params: { id: 'nonexistent' } } as unknown as Request
      const res = mockRes()

      await postController.remove(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' })
    })
  })

  // ---------- like ----------

  describe('like', () => {
    it('should like a post and return updated post', async () => {
      const updatedPost = { _id: 'post-1', likes: 5 };
      (postService.likePost as jest.Mock).mockResolvedValue(updatedPost)

      const req = { params: { id: 'post-1' } } as unknown as Request
      const res = mockRes()

      await postController.like(req, res as Response)

      expect(postService.likePost).toHaveBeenCalledWith('post-1')
      expect(res.json).toHaveBeenCalledWith(updatedPost)
    })

    it('should return 404 if post not found', async () => {
      (postService.likePost as jest.Mock).mockRejectedValue(new Error('Post not found'))

      const req = { params: { id: 'x' } } as unknown as Request
      const res = mockRes()

      await postController.like(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  // ---------- share ----------

  describe('share', () => {
    it('should share a post and return updated post', async () => {
      const updatedPost = { _id: 'post-1', shared: 3 };
      (postService.sharePost as jest.Mock).mockResolvedValue(updatedPost)

      const req = { params: { id: 'post-1' } } as unknown as Request
      const res = mockRes()

      await postController.share(req, res as Response)

      expect(postService.sharePost).toHaveBeenCalledWith('post-1')
      expect(res.json).toHaveBeenCalledWith(updatedPost)
    })
  })

  // ---------- bought ----------

  describe('bought', () => {
    it('should mark post as bought and return updated post', async () => {
      const updatedPost = { _id: 'post-1', bought: 2 };
      (postService.boughtPost as jest.Mock).mockResolvedValue(updatedPost)

      const req = { params: { id: 'post-1' } } as unknown as Request
      const res = mockRes()

      await postController.bought(req, res as Response)

      expect(postService.boughtPost).toHaveBeenCalledWith('post-1')
      expect(res.json).toHaveBeenCalledWith(updatedPost)
    })
  })
})
