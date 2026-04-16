const BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  ...(localStorage.getItem('accessToken') && {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  })
});

export const postsApi = {
  // Like a product/post
  likePost: async (postId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to like post');
    return res.json();
  },

  // Buy a product/post
  buyPost: async (postId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/posts/${postId}/buy`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to buy post');
    return res.json();
  },

  // Delete a product/post (admin only)
  deletePost: async (postId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete post');
    return res.json();
  }
};
