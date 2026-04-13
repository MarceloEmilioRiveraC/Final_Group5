const BASE_URL = 'http://localhost:5000/api';

export const postsApi = {
  // Like a product/post
  likePost: async (postId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if available
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      }
    });
    if (!res.ok) throw new Error('Failed to like post');
    return res.json();
  },

  // Buy a product/post
  buyPost: async (postId: string): Promise<any> => {
    const res = await fetch(`${BASE_URL}/posts/${postId}/buy`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      }
    });
    if (!res.ok) throw new Error('Failed to buy post');
    return res.json();
  }
};
