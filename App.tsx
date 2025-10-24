
import React, { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { Feed } from './components/feed/Feed';
import { ProfilePage } from './components/profile/ProfilePage';
import { Wallet } from './components/blockchain/Wallet';
import { CharityTracker } from './components/blockchain/CharityTracker';
import { NftGallery } from './components/blockchain/NftGallery';
import { CurrentUser, Posts as initialPosts, Users as initialUsers } from './constants';
import type { Page, Post, User, Comment } from './types';
import { moderateContent } from './services/geminiService';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('feed');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [users, setUsers] = useState<User[]>(Object.values(initialUsers));
  const [currentUser, setCurrentUser] = useState<User>(CurrentUser);

  const handleCreatePost = async (content: string): Promise<boolean> => {
    const moderationResult = await moderateContent(content);
    if (!moderationResult.isHalal) {
      alert(`Post cannot be created. Reason: ${moderationResult.reason}`);
      return false;
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      user: currentUser,
      content,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      shares: 0,
    };
    setPosts([newPost, ...posts]);
    return true;
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const liked = !post.likedByCurrentUser;
        return {
          ...post,
          likedByCurrentUser: liked,
          likes: liked ? post.likes + 1 : post.likes - 1,
        };
      }
      return post;
    }));
  };
  
  const handleCommentOnPost = (postId: string, commentText: string) => {
    const newComment: Comment = {
        id: `c${Date.now()}`,
        user: currentUser,
        text: commentText,
        timestamp: 'Just now',
    };

    setPosts(posts.map(post => {
        if (post.id === postId) {
            return {
                ...post,
                comments: [...post.comments, newComment],
            };
        }
        return post;
    }));
  };

  const handleFollowUser = (userId: string) => {
    let userToFollowExisted = false;
    const updatedUsers = users.map(user => {
        if (user.id === userId) {
            userToFollowExisted = true;
            const isFollowed = !user.isFollowedByCurrentUser;
            return {
                ...user,
                isFollowedByCurrentUser: isFollowed,
                followers: isFollowed ? user.followers + 1 : user.followers - 1
            };
        }
        return user;
    });

    if (userToFollowExisted) {
        setUsers(updatedUsers);
        const userToFollow = users.find(u => u.id === userId);
        if (userToFollow) {
            setCurrentUser(prevUser => ({
                ...prevUser,
                following: userToFollow.isFollowedByCurrentUser ? prevUser.following - 1 : prevUser.following + 1
            }));
        }
    }
  };
  
  const suggestedUsers = useMemo(() => {
    return users.filter(u => u.id !== currentUser.id);
  }, [users, currentUser.id]);

  const renderContent = () => {
    switch (activePage) {
      case 'profile':
        return <ProfilePage user={currentUser} posts={posts} handleLikePost={handleLikePost} handleCommentOnPost={handleCommentOnPost} handleCreatePost={handleCreatePost} />;
      case 'wallet':
        return <Wallet />;
      case 'charity':
        return <CharityTracker />;
      case 'nfts':
        return <NftGallery />;
      case 'feed':
      default:
        return <Feed posts={posts} handleCreatePost={handleCreatePost} handleLikePost={handleLikePost} handleCommentOnPost={handleCommentOnPost} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200">
      <Header user={currentUser} setActivePage={setActivePage} activePage={activePage} />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <aside className="hidden lg:block lg:col-span-3">
            <LeftSidebar user={currentUser} setActivePage={setActivePage} activePage={activePage} />
          </aside>
          <div className="col-span-12 lg:col-span-6">
            {renderContent()}
          </div>
          <aside className="hidden lg:block lg:col-span-3">
            <RightSidebar users={suggestedUsers} handleFollowUser={handleFollowUser} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
