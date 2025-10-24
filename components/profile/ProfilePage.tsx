
import React from 'react';
import type { User, Post } from '../../types';
import { Post as PostComponent } from '../feed/Post';
import { CreatePost } from '../feed/CreatePost';

interface ProfilePageProps {
  user: User;
  posts: Post[];
  handleLikePost: (postId: string) => void;
  handleCommentOnPost: (postId: string, commentText: string) => void;
  handleCreatePost: (content: string) => Promise<boolean>;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, posts, handleLikePost, handleCommentOnPost, handleCreatePost }) => {
  const userPosts = posts.filter(p => p.user.id === user.id);

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <img src={user.coverPhoto} alt="Cover" className="w-full h-48 sm:h-64 object-cover" />
        <div className="p-4 relative">
          <img src={user.profilePicture} alt={user.name} className="absolute -top-12 left-6 h-24 w-24 rounded-full object-cover border-4 border-white dark:border-slate-800" />
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-start">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
              <p className="text-sm mt-2">{user.bio}</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-full hover:bg-blue-700 transition whitespace-nowrap">
              Edit Profile
            </button>
          </div>
          <div className="flex space-x-6 mt-4 border-t border-slate-200 dark:border-slate-700 pt-3">
            <div><span className="font-bold">{user.followers}</span> <span className="text-gray-500">Followers</span></div>
            <div><span className="font-bold">{user.following}</span> <span className="text-gray-500">Following</span></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <CreatePost handleCreatePost={handleCreatePost} />
        {userPosts.map(post => (
            <PostComponent key={post.id} post={post} handleLikePost={handleLikePost} handleCommentOnPost={handleCommentOnPost} />
        ))}
      </div>
    </div>
  );
};
