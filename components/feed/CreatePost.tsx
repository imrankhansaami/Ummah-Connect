
import React, { useState } from 'react';
import { CurrentUser } from '../../constants';
import { PhotoIcon, VideoCameraIcon, FaceSmileIcon } from '../ui/Icons';

interface CreatePostProps {
    handleCreatePost: (content: string) => Promise<boolean>;
}

export const CreatePost: React.FC<CreatePostProps> = ({ handleCreatePost }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsPosting(true);
    const success = await handleCreatePost(content);
    if (success) {
      setContent('');
    }
    setIsPosting(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
      <div className="flex items-start space-x-3">
        <img src={CurrentUser.profilePicture} alt={CurrentUser.name} className="h-10 w-10 rounded-full object-cover" />
        <div className="w-full">
            <textarea
              placeholder={`What's on your mind, ${CurrentUser.name.split(' ')[0]}?`}
              className="w-full bg-slate-100 dark:bg-slate-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 border-transparent text-sm resize-none"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            ></textarea>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-700 my-3"></div>
      <div className="flex justify-between items-center px-1">
        <div className="flex space-x-1">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition text-gray-600 dark:text-gray-300 font-semibold text-sm">
                <VideoCameraIcon className="text-red-500 h-6 w-6" />
                <span className="hidden sm:inline">Live</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition text-gray-600 dark:text-gray-300 font-semibold text-sm">
                <PhotoIcon className="text-green-500 h-6 w-6" />
                <span className="hidden sm:inline">Photo</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition text-gray-600 dark:text-gray-300 font-semibold text-sm">
                <FaceSmileIcon className="text-yellow-500 h-6 w-6" />
                <span className="hidden sm:inline">Feeling</span>
            </button>
        </div>
        <button 
            onClick={handleSubmit}
            disabled={isPosting || !content.trim()}
            className="bg-blue-600 text-white px-6 py-2 text-sm font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
            {isPosting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};
