
import React, { useState } from 'react';
import type { Post as PostType, User, Comment } from '../../types';
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, ArrowUturnRightIcon, EllipsisHorizontalIcon, ShieldCheckIcon, ShieldExclamationIcon } from '../ui/Icons';
import { Modal } from '../ui/Modal';
import { moderateContent } from '../../services/geminiService';
import type { ModerationResult } from '../../types';
import { CurrentUser } from '../../constants';

interface PostProps {
    post: PostType;
    handleLikePost: (postId: string) => void;
    handleCommentOnPost: (postId: string, commentText: string) => void;
}

export const Post: React.FC<PostProps> = ({ post, handleLikePost, handleCommentOnPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moderationStatus, setModerationStatus] = useState<'idle' | 'loading' | 'complete'>('idle');
  const [moderationResult, setModerationResult] = useState<ModerationResult | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleReport = async () => {
    setIsModalOpen(true);
    setModerationStatus('loading');
    setModerationResult(null);
    const result = await moderateContent(post.content);
    setModerationResult(result);
    setModerationStatus('complete');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModerationStatus('idle');
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    handleCommentOnPost(post.id, commentText);
    setCommentText('');
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
      <div className="p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
            <img src={post.user.profilePicture} alt={post.user.name} className="h-10 w-10 rounded-full object-cover" />
            <div>
                <p className="font-bold text-sm">{post.user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
            </div>
            </div>
            <div className="relative group">
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400">
                    <EllipsisHorizontalIcon />
                </button>
                <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-slate-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleReport(); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-600">Report Post</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-600">Save Post</a>
                </div>
            </div>
        </div>
        <p className="my-4 text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.image && (
        <div className="-mt-4">
            <img src={post.image} alt="Post content" className="w-full object-cover" />
        </div>
      )}
      
      {(post.likes > 0 || post.comments.length > 0 || post.shares > 0) &&
        <div className="px-4 pt-3 pb-2">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                {post.likes > 0 && <span className="hover:underline cursor-pointer">{post.likes} Likes</span>}
                <div className="flex space-x-4">
                    {post.comments.length > 0 && <span className="hover:underline cursor-pointer">{post.comments.length} Comments</span>}
                    {post.shares > 0 && <span className="hover:underline cursor-pointer">{post.shares} Shares</span>}
                </div>
            </div>
        </div>
      }

      <div className="border-t border-slate-200 dark:border-slate-700 mx-4"></div>

      <div className="flex justify-around py-1">
        <PostActionButton 
            icon={<HeartIcon className={post.likedByCurrentUser ? 'fill-red-500 text-red-500' : ''} />} 
            label="Like" 
            onClick={() => handleLikePost(post.id)}
            isActive={post.likedByCurrentUser}
        />
        <PostActionButton icon={<ChatBubbleOvalLeftEllipsisIcon />} label="Comment" />
        <PostActionButton icon={<ArrowUturnRightIcon />} label="Share" />
      </div>
      
      {(post.comments.length > 0 || true) && <div className="border-t border-slate-200 dark:border-slate-700 mx-4"></div>}

       <div className="p-4 space-y-4">
        {post.comments.map(comment => (
            <div key={comment.id} className="flex items-start space-x-2">
                <img src={comment.user.profilePicture} alt={comment.user.name} className="h-8 w-8 rounded-full object-cover" />
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl px-3 py-2 text-sm w-full">
                    <p className="font-semibold">{comment.user.name}</p>
                    <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
                </div>
            </div>
        ))}
         <div className="flex items-center space-x-2">
             <img src={CurrentUser.profilePicture} alt={CurrentUser.name} className="h-8 w-8 rounded-full object-cover" />
             <form onSubmit={handleCommentSubmit} className="flex-1">
                 <input 
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-full px-4 py-1.5 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                 />
             </form>
         </div>
       </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-lg font-bold mb-4">Content Moderation Report</h3>
        {moderationStatus === 'loading' && <p>Analyzing content with Gemini AI...</p>}
        {moderationStatus === 'complete' && moderationResult && (
            <div className="flex flex-col items-center text-center">
                {moderationResult.isHalal ? (
                    <ShieldCheckIcon className="h-16 w-16 text-green-500 mb-4" />
                ) : (
                    <ShieldExclamationIcon className="h-16 w-16 text-red-500 mb-4" />
                )}
                <p className={`text-xl font-semibold ${moderationResult.isHalal ? 'text-green-600' : 'text-red-600'}`}>
                    {moderationResult.isHalal ? 'Content is Halal' : 'Content is Not Halal'}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-semibold">Reason:</span> {moderationResult.reason}
                </p>
                <p className="mt-4 text-xs text-gray-400">This analysis was performed by an AI and should be reviewed by a human moderator. Thank you for helping keep our community safe.</p>
            </div>
        )}
      </Modal>
    </div>
  );
};

interface PostActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const PostActionButton: React.FC<PostActionButtonProps> = ({ icon, label, onClick, isActive }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition text-sm font-semibold ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-600 dark:text-gray-300'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
