
export interface User {
  id: string;
  name: string;
  username: string;
  profilePicture: string;
  coverPhoto: string;
  bio: string;
  followers: number;
  following: number;
  isFollowedByCurrentUser?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
  likedByCurrentUser?: boolean;
}

export interface PrayerTime {
  name: string;
  time: string;
}

export interface IslamicEvent {
  name: string;
  date: string;
}

export interface Nft {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  price: number;
}

export interface CharityTransaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: string;
  project: string;
}

export type Page = 'feed' | 'profile' | 'wallet' | 'charity' | 'nfts' | 'groups' | 'marketplace';

export interface ModerationResult {
  isHalal: boolean;
  reason: string;
}