import { PostRepository } from '@infrastructure/repositories/PostRepository'
import { api } from '@infrastructure/api/axiosInstance'

jest.mock('@infrastructure/api/axiosInstance', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  },
}))

const repo = new PostRepository()

const samplePost = {
  _id: 'p1',
  title: 'Test Post',
  description: 'desc',
  imageUrl: 'http://img.com/test.jpg',
  createdAt: new Date().toISOString(),
  likes: 0,
  shared: 0,
  bought: 0,
  userId: 'u1',
}

describe('PostRepository', () => {
  afterEach(() => jest.clearAllMocks())

  describe('getAll', () => {
    it('should GET /posts and return data', async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: [samplePost] })

      const result = await repo.getAll()

      expect(api.get).toHaveBeenCalledWith('/posts')
      expect(result).toEqual([samplePost])
    })
  })

  describe('create', () => {
    it('should POST /posts with post data', async () => {
      const newPost = { title: 'New', imageUrl: 'http://img.com/new.jpg' };
      (api.post as jest.Mock).mockResolvedValue({ data: { ...samplePost, ...newPost } })

      const result = await repo.create(newPost)

      expect(api.post).toHaveBeenCalledWith('/posts', newPost)
      expect(result.title).toBe('New')
    })
  })

  describe('delete', () => {
    it('should DELETE /posts/:id', async () => {
      (api.delete as jest.Mock).mockResolvedValue({})

      await repo.delete('p1')

      expect(api.delete).toHaveBeenCalledWith('/posts/p1')
    })
  })

  describe('like', () => {
    it('should PATCH /posts/:id/like', async () => {
      (api.patch as jest.Mock).mockResolvedValue({ data: { ...samplePost, likes: 1 } })

      const result = await repo.like('p1')

      expect(api.patch).toHaveBeenCalledWith('/posts/p1/like')
      expect(result.likes).toBe(1)
    })
  })

  describe('share', () => {
    it('should PATCH /posts/:id/share', async () => {
      (api.patch as jest.Mock).mockResolvedValue({ data: { ...samplePost, shared: 1 } })

      const result = await repo.share('p1')

      expect(api.patch).toHaveBeenCalledWith('/posts/p1/share')
      expect(result.shared).toBe(1)
    })
  })

  describe('buy', () => {
    it('should PATCH /posts/:id/buy', async () => {
      (api.patch as jest.Mock).mockResolvedValue({ data: { ...samplePost, bought: 1 } })

      const result = await repo.buy('p1')

      expect(api.patch).toHaveBeenCalledWith('/posts/p1/buy')
      expect(result.bought).toBe(1)
    })
  })
})
