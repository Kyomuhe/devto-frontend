const API_BASE_URL = 'http://localhost:8081';

// Likes API
export const likesAPI = {
  // Toggle like/unlike
  toggleLike: async (postId, userId) => {
    try {
      console.log('API Call: Toggle Like', { postId, userId });
      
      const response = await fetch(`${API_BASE_URL}/api/v1/likes/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId })
      });

      console.log('Toggle like response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Toggle like response data:', data);
      return data;
    } catch (error) {
      console.error('Error in toggleLike API call:', error);
      throw error;
    }
  },

  // Check if user has liked a post
  hasUserLikedPost: async (postId, userId) => {
    try {
      console.log('API Call: Has User Liked Post', { postId, userId });
      
      const response = await fetch(`${API_BASE_URL}/api/v1/likes/check/${postId}/${userId}`);
      
      console.log('Has user liked response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Has user liked response data:', data);
      return data;
    } catch (error) {
      console.error('Error in hasUserLikedPost API call:', error);
      throw error;
    }
  },

  // Get like count for a post
  getLikeCount: async (postId) => {
    try {
      console.log('API Call: Get Like Count', { postId });
      
      const response = await fetch(`${API_BASE_URL}/api/v1/likes/count/${postId}`);
      
      console.log('Get like count response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Get like count response data:', data);
      return data;
    } catch (error) {
      console.error('Error in getLikeCount API call:', error);
      throw error;
    }
  }
};

// Comments API
export const commentsAPI = {
  // Create a new comment
  createComment: async (postId, userId, content) => {
    try {
      console.log('API Call: Create Comment', { postId, userId, content });
      
      const response = await fetch(`${API_BASE_URL}/api/v1/comments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, content })
      });

      console.log('Create comment response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Create comment response data:', data);
      return data;
    } catch (error) {
      console.error('Error in createComment API call:', error);
      throw error;
    }
  },

  // Get comments for a post
  getCommentsByPost: async (postId) => {
    try {
      console.log('API Call: Get Comments By Post', { postId });
      
      const response = await fetch(`${API_BASE_URL}/api/v1/comments/display/${postId}`);
      
      console.log('Get comments response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Get comments response data:', data);
      return data;
    } catch (error) {
      console.error('Error in getCommentsByPost API call:', error);
      throw error;
    }
  },

  // Get comment count for a post
  getCommentCount: async (postId) => {
    try {
      console.log('API Call: Get Comment Count', { postId });
      
      const response = await fetch(`${API_BASE_URL}/api/v1/comments/count/${postId}`);
      
      console.log('Get comment count response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Get comment count response data:', data);
      return data;
    } catch (error) {
      console.error('Error in getCommentCount API call:', error);
      throw error;
    }
  }
};