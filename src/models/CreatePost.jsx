import React, { useState } from 'react';
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
  Settings
} from 'lucide-react';
import logo from '../assets/logo.webp';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('edit');
  const [coverImage, setCoverImage] = useState(null);

  //if (!isOpen) return null;

  const handleCoverImageUpload = () => {
    // Handle cover image upload
    console.log('Upload cover image');
  };

  const handlePublish = () => {
    const postData = {
      title,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      content,
      coverImage
    };
    console.log('Publishing post:', postData);
    // Handle publish logic
  };

  const handleSaveDraft = () => {
    console.log('Saving draft');
    // Handle save draft logic
  };

  const handleRevertChanges = () => {
    console.log('Reverting changes');
    setTitle('');
    setTags('');
    setContent('');
    setCoverImage(null);
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
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="DEV"
            className="w-8 h-8"
          />
          <h1 className="text-lg font-semibold text-gray-900">Create Post</h1>
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
            onClick={() => navigate(-1)} 
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-8">
        {activeTab === 'edit' ? (
          <>
            {/* Cover Image */}
            <div className="mb-6">
              <button
                onClick={handleCoverImageUpload}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Add a cover image
              </button>
            </div>

            {/* Title */}
            <div className="mb-6">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New post title here..."
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
                placeholder="Add up to 4 tags..."
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
                placeholder="Write your post content here..."
                className="w-full h-full min-h-96 text-gray-700 placeholder-gray-400 border-none outline-none resize-none"
              />
            </div>
          </>
        ) : (
          /* Preview Tab */
          <div className="flex-1">
            {coverImage && (
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
            )}
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title || 'New post title here...'}
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
                <p className="text-gray-400">Write your post content here...</p>
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200"
          >
            Publish
          </button>
          <button
            onClick={handleSaveDraft}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
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
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            Revert new changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;