import api from '../api/axiosInstance'

export const postsApi = {
  // Like a product/post
  likePost: async (postId: string): Promise<any> => {
    const { data } = await api.patch(`/posts/${postId}/like`)
    return data
  },

  // Share a product/post
  sharePost: async (postId: string): Promise<any> => {
    const { data } = await api.patch(`/posts/${postId}/share`)
    return data
  },

  // Buy a product/post
  buyPost: async (postId: string): Promise<any> => {
    const { data } = await api.patch(`/posts/${postId}/buy`)
    return data
  },

  // Delete a product/post (admin only)
  deletePost: async (postId: string): Promise<any> => {
    const { data } = await api.delete(`/posts/${postId}`)
    return data
  },
}
