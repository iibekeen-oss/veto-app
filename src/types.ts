export type Stance = 'PRO' | 'CON';
export type AppLanguage = 'syr' | 'ar' | 'en';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatarInitial?: string;
}

export interface VetoComment {
  id: string;
  author: string;
  handle: string;
  avatar?: string;
  content: string;
  stance: Stance;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface VetoPost {
  id: string;
  round: number; // 0 for initial post, 1+ for opposition / rebuttal posts
  creatorName: string;
  handle: string;
  avatarInitial: string;
  title: string;
  summary: string;
  videoDuration: string;
  category: string;
  debateTopic: string;
  image: string;
  proCount: number;
  conCount: number;
  userStance: Stance | null;
  comments: VetoComment[];
}
