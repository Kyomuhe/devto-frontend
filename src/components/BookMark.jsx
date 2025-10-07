import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import PostCard from './PostCard'; 

export const BookmarkButton = ({ postId, userId, isInitiallyBookmarked = false, onBookmarkChange }) => {
  const [isBookmarked, setIsBookmarked] = useState(isInitiallyBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  // Updating bookmark state when prop changes
  useEffect(() => {
    setIsBookmarked(isInitiallyBookmarked);
  }, [isInitiallyBookmarked]);

  const toggleBookmark = async () => {
    if (!userId || isLoading) return;
    
    setIsLoading(true);
    
    try {
      const endpoint = isBookmarked 
        ? `http://localhost:8081/api/v1/posts/unbookmark/${userId}/${postId}`
        : `http://localhost:8081/api/v1/posts/bookmark/${userId}/${postId}`;
      
      const method = isBookmarked ? 'DELETE' : 'POST';
      
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newState = !isBookmarked;
        setIsBookmarked(newState);
        
        // Notify parent component of change
        if (onBookmarkChange) {
          onBookmarkChange(postId, newState);
        }
      } else {
        console.error('Failed to toggle bookmark');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleBookmark}
      disabled={isLoading || !userId}
      className={`hover:bg-gray-50 p-1 rounded transition-colors ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-4 h-4 text-blue-600 fill-current" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </button>
  );
};

const BookmarkPostCard = ({ bookmark, currentUserId, onBookmarkChange }) => {
  const handleBookmarkToggle = (postId, isBookmarked) => {
    // Calling the parent's bookmark change handler
    if (onBookmarkChange) {
      onBookmarkChange(postId, isBookmarked);
    }
  };

  return (
    <PostCard 
      post={bookmark.post} 
      currentUserId={currentUserId}
      isInitiallyBookmarked={true}
      onBookmarkChange={handleBookmarkToggle}
    />
  );
};

const BookmarkPage = ({ user }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchBookmarks();
    }
  }, [user?.id]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/api/v1/posts/displayBookMarks/${user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }
      
      const data = await response.json();
      setBookmarks(data || []);
    } catch (error) {
      setError('Failed to load bookmarks');
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkChange = (postId, isBookmarked) => {
    if (!isBookmarked) {
      // Remove the bookmark from the list when unbookmarked
      setBookmarks(prev => prev.filter(bookmark => bookmark.post.postId !== postId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading your bookmarks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchBookmarks}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pt-8 px-4">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <BookmarkCheck className="w-6 h-6 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
          </div>
          <p className="text-gray-600">
            {bookmarks.length} {bookmarks.length === 1 ? 'post' : 'posts'} saved
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
            <p className="text-gray-600">
              Start bookmarking posts you want to read later!
            </p>
          </div>
        ) : (
          <div>
            {bookmarks.map((bookmark) => (
              <BookmarkPostCard
                key={bookmark.bookMarkId}
                bookmark={bookmark}
                currentUserId={user.id}
                onBookmarkChange={handleBookmarkChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;