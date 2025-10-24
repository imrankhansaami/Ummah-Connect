
import React from 'react';
import { CreatePost } from './CreatePost';
import { Post as PostComponent } from './Post';
import type { Post } from '../../types';

interface FeedProps {
    posts: Post[];
    handleCreatePost: (content: string) => Promise<boolean>;
    handleLikePost: (postId: string) => void;
    handleCommentOnPost: (postId: string, commentText: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, handleCreatePost, handleLikePost, handleCommentOnPost }) => {
  return (
    <div className="space-y-4">
      <CreatePost handleCreatePost={handleCreatePost} />
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} handleLikePost={handleLikePost} handleCommentOnPost={handleCommentOnPost} />
      ))}
    </div>
  );
};