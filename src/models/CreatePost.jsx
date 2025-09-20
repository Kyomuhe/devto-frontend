import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Bold, 
  Italic, 
  Link, 
  List, 
  ListOrdered, 
  Heading, 
  Quote, 
  Code, 
  Square, 
  Zap, 
  Image as ImageIcon,
  MoreHorizontal,
  Settings,
  Upload,
  Trash2
} from 'lucide-react';
import logo from '../assets/logo.webp';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ user, existingPost, isEditing = false }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');
  const [hasExistingImage, setHasExistingImage] = useState(false);
  
  const fileInputRef = useRef(null);

  const userId = user?.id;

  // Pre-fill form data when editing
  useEffect(() => {
    if (isEditing && existingPost) {
      setTitle(existingPost.title || '');
      setTags(existingPost.tags || '');
      setContent(existingPost.description || '');
      
      // Check if existing post has cover image
      if (existingPost.hasCoverImage || existingPost.coverImage) {
        setHasExistingImage(true);
        setCoverImagePreview(`http://localhost:8081/posts/image/${existingPost.postId}`);
      }
    }
  }, [isEditing, existingPost]);

  const handleCoverImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validating file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setCoverImage(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setCoverImagePreview(previewUrl);
      setHasExistingImage(false); // New image replaces existing one
      setError('');
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    if (coverImagePreview && !hasExistingImage) {
      URL.revokeObjectURL(coverImagePreview);
    }
    setCoverImagePreview(null);
    setHasExistingImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePublish = async () => {
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setIsPublishing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', content.trim());
      formData.append('tags', tags);
      formData.append('userId', userId.toString());
      
      // Only append cover image if a new one was selected
      if (coverImage) {
        formData.append('coverImage', coverImage);
      }

      const url = isEditing 
        ? `http://localhost:8081/posts/${existingPost.postId}` 
        : 'http://localhost:8081/posts/create';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      const savedPost = await response.json();
      console.log(`Post ${isEditing ? 'updated' : 'created'} successfully:`, savedPost);
      
      // Navigate back to my posts if editing, or to main page if creating
      navigate(isEditing ? '/my-posts' : '/main-loggedin', { replace: true });
      
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} post:`, error);
      setError(error.message || `Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRevertChanges = () => {
    if (isEditing && existingPost) {
      // Revert to original values
      setTitle(existingPost.title || '');
      setTags(existingPost.tags || '');
      setContent(existingPost.description || '');
      
      // Reset image to original state
      setCoverImage(null);
      if (existingPost.hasCoverImage || existingPost.coverImage) {
        setHasExistingImage(true);
        setCoverImagePreview(`http://localhost:8081/posts/image/${existingPost.postId}`);
      } else {
        setCoverImagePreview(null);
        setHasExistingImage(false);
      }
    } else {
      // Clear everything for new post
      setTitle('');
      setTags('');
      setContent('');
      removeCoverImage();
    }
    setError('');
  };

  const toolbarButtons = [
    { icon: Bold, tooltip: 'Bold' },
    { icon: Italic, tooltip: 'Italic' },
    { icon: Link, tooltip: 'Link' },
    { icon: List, tooltip: 'Unordered List' },
    { icon: ListOrdered, tooltip: 'Ordered List' },
    { icon: Heading, tooltip: 'Heading' },
    { icon: Quote, tooltip: 'Quote' },
    { icon: Code, tooltip: 'Code' },
    { icon: Square, tooltip: 'Code Block' },
    { icon: Zap, tooltip: 'Embed' },
    { icon: ImageIcon, tooltip: 'Upload Image' }
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="DEV"
            className="w-8 h-8"
          />
          <h1 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Post' : 'Create Post'}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === 'edit'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === 'preview'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => navigate(isEditing ? '/my-posts' : -1)} 
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-8">
        {activeTab === 'edit' ? (
          <>
            {/* Cover Image */}
            <div className="mb-6">
              {coverImagePreview ? (
                <div className="relative">
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={handleCoverImageUpload}
                      className="p-2 bg-white bg-opacity-90 rounded-full shadow-sm hover:bg-opacity-100 transition-all"
                      title="Change cover image"
                    >
                      <Upload className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={removeCoverImage}
                      className="p-2 bg-white bg-opacity-90 rounded-full shadow-sm hover:bg-opacity-100 transition-all"
                      title="Remove cover image"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleCoverImageUpload}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Add a cover image</span>
                </button>
              )}
            </div>

            {/* Title */}
            <div className="mb-6">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isEditing ? "Edit post title..." : "New post title here..."}
                className="w-full text-4xl font-bold text-gray-900 placeholder-gray-500 border-none outline-none resize-none overflow-hidden"
                rows={1}
                style={{ minHeight: '60px' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add up to 4 tags (comma separated)..."
                className="w-full text-gray-600 placeholder-gray-400 border-none outline-none"
              />
            </div>

            {/* Toolbar */}
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-200">
              {toolbarButtons.map((button, index) => (
                <button
                  key={index}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
                  title={button.tooltip}
                >
                  <button.icon className="w-5 h-5" />
                </button>
              ))}
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Content Editor */}
            <div className="flex-1 mb-8">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={isEditing ? "Edit your post content..." : "Write your post content here..."}
                className="w-full h-full min-h-96 text-gray-700 placeholder-gray-400 border-none outline-none resize-none"
              />
            </div>
          </>
        ) : (
          /* Preview Tab */
          <div className="flex-1">
            {coverImagePreview && (
              <img
                src={coverImagePreview}
                alt="Cover"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
            )}
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title || (isEditing ? "Edit post title..." : "New post title here...")}
            </h1>
            
            {tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
            
            <div className="prose max-w-none">
              {content ? (
                <pre className="whitespace-pre-wrap font-sans">
                  {content}
                </pre>
              ) : (
                <p className="text-gray-400">
                  {isEditing ? "Edit your post content..." : "Write your post content here..."}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`font-medium px-6 py-2 rounded-md transition-colors duration-200 ${
              isPublishing
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPublishing 
              ? (isEditing ? 'Updating...' : 'Publishing...') 
              : (isEditing ? 'Update Post' : 'Publish')
            }
          </button>
          <button
            disabled={isPublishing}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 disabled:opacity-50"
          >
            Save draft
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200">
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleRevertChanges}
            disabled={isPublishing}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 disabled:opacity-50"
          >
            {isEditing ? 'Revert changes' : 'Revert new changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;