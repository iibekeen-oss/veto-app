/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlusCircle, Flame, Filter, Sparkles, Layers, Settings, User, LogIn, LogOut, Languages } from 'lucide-react';
import { VetoPost, Stance, VetoComment, AuthUser } from './types';
import { INITIAL_POSTS } from './data/mockData';
import { VetoPostCard } from './components/VetoPostCard';
import { CommentsDrawer } from './components/CommentsDrawer';
import { RecordVetoModal } from './components/RecordVetoModal';
import { AndroidPhoneFrame } from './components/AndroidPhoneFrame';
import { KotlinCodeViewer } from './components/KotlinCodeViewer';
import { VetoMissileIcon } from './components/VetoMissileIcon';
import { VetoInterceptGraphic } from './components/VetoInterceptGraphic';
import { VetoHeadOnCollisionLogo } from './components/VetoHeadOnCollisionLogo';
import { VetoHitToKillRender } from './components/VetoHitToKillRender';
import { VetoCadBlueprintLogo } from './components/VetoCadBlueprintLogo';
import { VetoVerticalLaunchIcon } from './components/VetoVerticalLaunchIcon';
import { VetoInterceptorDesignCanvas } from './components/VetoInterceptorDesignCanvas';
import { VetoStopHandCardLogo } from './components/VetoStopHandCardLogo';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { AuthModal } from './components/AuthModal';
import { SettingsModal } from './components/SettingsModal';
import { useLanguage } from './context/LanguageContext';
import { getSavedAuthUser, saveAuthUser } from './lib/i18n';
import { nutritionImg, deadliftImg } from './assets/images';
import {
  updateStanceCountsInSupabase,
  subscribeToStanceUpdates,
  fetchFeedFromSupabase,
  SUPABASE_URL,
  handleLogout as supabaseLogout,
} from './lib/supabaseClient';
import { Database, Radio } from 'lucide-react';

export default function App() {
  const { language, setLanguage, toggleLanguage, t, isRtl, currentLang, changeLanguage } = useLanguage();
  const [posts, setPosts] = useState<VetoPost[]>(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'VETO_0' | 'REBUTTALS'>('ALL');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isPhoneView, setIsPhoneView] = useState(true);
  const [isCodeViewerOpen, setIsCodeViewerOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(true);

  // Auth & Settings state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(getSavedAuthUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await supabaseLogout();
    } catch (e) {
      console.warn("Supabase sign out fallback:", e);
    }
    setCurrentUser(null);
    saveAuthUser(null);
  };

  // Refresh feed from Supabase
  const refreshFeed = async () => {
    const res = await fetchFeedFromSupabase();
    if (res.success && res.data && res.data.length > 0) {
      const mappedPosts: VetoPost[] = res.data.map((item, idx) => ({
        id: String(item.id),
        round: item.veto_level ?? (idx + 1),
        creatorName: item.creator_name || 'Verified Athlete',
        handle: item.handle || '@veto_specialist',
        avatarInitial: (item.creator_name || 'V')[0],
        title: item.title,
        summary: item.content || item.summary || '',
        videoDuration: '0:35',
        category: (item.category || 'BIOMECHANICS').toUpperCase(),
        debateTopic: item.debate_topic || 'EXERCISE TECHNIQUE',
        image: item.video_url || (idx % 2 === 0 ? nutritionImg : deadliftImg),
        proCount: item.pro_count ?? 1,
        conCount: item.con_count ?? 0,
        userStance: null,
        comments: [],
      }));
      setPosts((prev) => {
        // Merge Supabase entries with local defaults preserving existing interactions
        const existingIds = new Set(mappedPosts.map((p) => p.id));
        const keptLocal = prev.filter((p) => !existingIds.has(p.id));
        return [...mappedPosts, ...keptLocal];
      });
    }
  };

  // Subscribe to real-time updates for pro_count and con_count
  React.useEffect(() => {
    refreshFeed();

    const channel = subscribeToStanceUpdates(({ id, pro_count, con_count }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              proCount: pro_count !== undefined ? pro_count : post.proCount,
              conCount: con_count !== undefined ? con_count : post.conCount,
            };
          }
          return post;
        })
      );
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'VETO_0') return post.round === 0;
    if (activeFilter === 'REBUTTALS') return post.round > 0;
    return true;
  });

  const activeCommentPost = posts.find((p) => p.id === activeCommentPostId);

  // Handle Stance Vote with Real-time Supabase Counter Sync
  const handleVote = async (postId: string, clickedStance: Stance) => {
    let finalPro = 0;
    let finalCon = 0;

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        let newProCount = post.proCount;
        let newConCount = post.conCount;
        let newUserStance: Stance | null = post.userStance;

        if (post.userStance === clickedStance) {
          // Unvote
          if (clickedStance === 'PRO') newProCount = Math.max(0, newProCount - 1);
          if (clickedStance === 'CON') newConCount = Math.max(0, newConCount - 1);
          newUserStance = null;
        } else {
          // Switch or cast vote
          if (post.userStance === 'PRO') newProCount = Math.max(0, newProCount - 1);
          if (post.userStance === 'CON') newConCount = Math.max(0, newConCount - 1);

          if (clickedStance === 'PRO') newProCount += 1;
          if (clickedStance === 'CON') newConCount += 1;
          newUserStance = clickedStance;
        }

        finalPro = newProCount;
        finalCon = newConCount;

        return {
          ...post,
          proCount: newProCount,
          conCount: newConCount,
          userStance: newUserStance,
        };
      })
    );

    // Trigger Supabase real-time update atomically for both counters
    await updateStanceCountsInSupabase(postId, finalPro, finalCon);
  };

  // Handle adding comment
  const handleAddComment = (postId: string, content: string, stance: Stance) => {
    const newComment: VetoComment = {
      id: `c-${Date.now()}`,
      author: 'You (Athlete)',
      handle: '@gym_disciple',
      content,
      stance,
      timestamp: 'Just now',
      likes: 1,
      userLiked: true,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: [newComment, ...post.comments],
        };
      })
    );
  };

  // Handle comment like
  const handleToggleLikeComment = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            const newLiked = !comment.userLiked;
            return {
              ...comment,
              userLiked: newLiked,
              likes: newLiked ? comment.likes + 1 : Math.max(0, comment.likes - 1),
            };
          }),
        };
      })
    );
  };

  // Handle publishing a new VETO rebuttal post & auto-refreshing feed
  const handlePublishPost = async (newPost: VetoPost) => {
    // 1. Immediately prepend into local state for zero-latency UI update
    setPosts((prev) => [newPost, ...prev]);

    // 2. Automatically refresh feed from Supabase
    await refreshFeed();
  };

  return (
    <AndroidPhoneFrame
      isPhoneView={isPhoneView}
      onToggleView={() => setIsPhoneView(!isPhoneView)}
      onOpenCodeInspector={() => setIsCodeViewerOpen(true)}
    >
      <div className="w-full flex flex-col bg-[#121212] min-h-full">
        {/* App Top Bar */}
        <header className="sticky top-0 z-20 bg-[#121212]/95 backdrop-blur-md border-b border-[#222226] px-3.5 py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Brand Logo: Glowing Red Stop Hand / Veto Card Vector Icon */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="relative group cursor-pointer shrink-0"
                title={isRtl ? 'بطاقة الفيتو الحاسمة: اضغط للإعدادات' : 'Glowing Red Stop Hand / Veto Card: Click to configure'}
                onClick={() => setIsSettingsModalOpen(true)}
              >
                <VetoStopHandCardLogo size={42} showText />
              </div>
              <div className="min-w-0">
                <h1 className="text-white font-black text-base sm:text-lg tracking-wider font-mono flex items-center gap-1.5 leading-none">
                  <span>{t.appName}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-pulse shrink-0" />
                </h1>
                <p className="text-[9px] sm:text-[10px] text-[#757575] font-mono tracking-tight truncate">
                  {t.appSubtitle}
                </p>
              </div>
            </div>

            {/* Quick Actions: Language Switcher, Auth Button, Settings Button, Rebuttal Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* قائمة اختيار اللغة المنسدلة (select dropdown) */}
              <div className="relative flex items-center">
                <select
                  id="langSelect"
                  value={currentLang}
                  onChange={(e) => changeLanguage(e.target.value as any)}
                  className="py-1 px-2.5 rounded-lg bg-[#1a1b20] hover:bg-[#25262e] border border-[#2a2b34] hover:border-[#00FF66]/60 text-white text-[11px] font-mono font-bold transition-all cursor-pointer shadow-sm outline-none focus:border-[#00FF66] appearance-none pr-6 rtl:pr-2.5 rtl:pl-6 text-center"
                  title={t.language}
                >
                  <option value="syr" className="bg-[#121216] text-white">السريانية</option>
                  <option value="en" className="bg-[#121216] text-white">English</option>
                  <option value="es" className="bg-[#121216] text-white">Español</option>
                  <option value="fr" className="bg-[#121216] text-white">Français</option>
                  <option value="de" className="bg-[#121216] text-white">Deutsch</option>
                  <option value="it" className="bg-[#121216] text-white">Italiano</option>
                  <option value="el" className="bg-[#121216] text-white">Ελληνικά</option>
                  <option value="sv" className="bg-[#121216] text-white">Svenska</option>
                  <option value="no" className="bg-[#121216] text-white">Norsk</option>
                  <option value="da" className="bg-[#121216] text-white">Dansk</option>
                  <option value="ru" className="bg-[#121216] text-white">Русский</option>
                  <option value="fa" className="bg-[#121216] text-white">فارسی</option>
                  <option value="tr" className="bg-[#121216] text-white">Türkçe</option>
                  <option value="ko" className="bg-[#121216] text-white">한국어</option>
                  <option value="zh" className="bg-[#121216] text-white">中文</option>
                  <option value="ja" className="bg-[#121216] text-white">日本語</option>
                </select>
                <div className="pointer-events-none absolute right-2 rtl:right-auto rtl:left-2 text-[#00FF66] text-[10px]">
                  ▼
                </div>
              </div>

              {/* User Profile / Login Button */}
              {currentUser ? (
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(true)}
                  className="flex items-center gap-1.5 py-1 px-2 rounded-lg bg-[#1f1618] hover:bg-[#2b1c20] border border-[#FF3333]/30 text-white font-mono text-xs transition-all cursor-pointer"
                  title={`${t.profile}: ${currentUser.name}`}
                >
                  <span className="w-5 h-5 rounded-md bg-[#FF3333] text-black font-black text-[10px] flex items-center justify-center">
                    {currentUser.avatarInitial || currentUser.name[0]}
                  </span>
                  <span className="hidden sm:inline font-bold text-[11px] truncate max-w-[80px]">
                    {currentUser.name}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenAuth('login')}
                  className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-[#142319] hover:bg-[#1a3022] border border-[#00FF66]/30 text-[#00FF66] font-mono font-bold text-[11px] transition-all cursor-pointer shadow-[0_0_10px_rgba(0,255,102,0.15)]"
                  title={t.login}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="inline">{t.login}</span>
                </button>
              )}

              {/* Settings Modal Button */}
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-1.5 rounded-lg bg-[#1a1b20] hover:bg-[#25262e] text-[#8e8e93] hover:text-white border border-[#2a2b34] transition-all cursor-pointer"
                title={t.settings}
              >
                <Settings className="w-3.5 h-3.5" />
              </button>

              {/* Record Rebuttal Button */}
              <button
                onClick={() => setIsRecordModalOpen(true)}
                className="flex items-center gap-1 py-1.5 px-2.5 sm:px-3 rounded-lg bg-[#FF3333] hover:bg-[#FF3333]/90 text-white font-mono font-bold text-[11px] sm:text-xs shadow-[0_0_12px_rgba(255,51,51,0.4)] transition-all cursor-pointer shrink-0"
              >
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">+ {t.recordVetoBtn}</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#1f1f22] overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-[#252528] text-white border border-[#3e3e44]'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              {t.allFilter} ({posts.length})
            </button>
            <button
              onClick={() => setActiveFilter('VETO_0')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'VETO_0'
                  ? 'bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66] shadow-[0_0_8px_rgba(0,255,102,0.3)]'
                  : 'text-[#888888] hover:text-[#00FF66]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
              {t.veto0Filter}
            </button>
            <button
              onClick={() => setActiveFilter('REBUTTALS')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === 'REBUTTALS'
                  ? 'bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333] shadow-[0_0_8px_rgba(255,51,51,0.3)]'
                  : 'text-[#888888] hover:text-[#FF3333]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333]" />
              {t.rebuttalsFilter}
            </button>
          </div>
        </header>

        {/* Supabase Realtime Stance & Stop Hand Status Card */}
        <div className="mx-4 mt-3 rounded-2xl bg-gradient-to-r from-[#17171c] via-[#1c1c24] to-[#17171c] border border-[#2e2e38] p-3.5 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3.5">
            <VetoStopHandCardLogo size={62} className="ring-2 ring-[#FF3333]/50 shadow-[0_0_24px_rgba(255,51,51,0.4)]" showText />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-white tracking-wide">
                    SUPABASE REALTIME STANCE SYNC
                  </span>
                  <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-[#3ECF8E]/25 text-[#3ECF8E] border border-[#3ECF8E]/50 animate-pulse">
                    CONNECTED
                  </span>
                </div>
                <button
                  onClick={() => setIsSupabaseModalOpen(true)}
                  className="text-[10px] font-mono text-[#3ECF8E] underline hover:text-[#3ECF8E]/80 cursor-pointer"
                >
                  Configure Key
                </button>
              </div>
              <p className="text-[11px] text-[#a4aab8] leading-tight mt-1">
                Glowing red <strong className="text-[#FF3333]">Stop Hand / Veto Card</strong> vector logo active. Voting <strong className="text-[#00FF66]">PRO (+)</strong> or <strong className="text-[#FF3333]">CON (-)</strong> updates <code className="text-[#3ECF8E]">pro_count</code> and <code className="text-[#FF3333]">con_count</code> in real-time.
              </p>
              <div className="flex items-center gap-3 mt-2 text-[10px] font-mono">
                <span className="text-[#3ECF8E] flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" /> SUPABASE POSTGRES
                </span>
                <span className="text-[#00FF66] flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" /> PRO COUNTER
                </span>
                <span className="text-[#FF3333] flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333]" /> CON COUNTER
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feed List */}
        <main className="p-4 space-y-5 pb-24">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-[#757575]">
              <Layers className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#8e8e93]" />
              <p className="text-sm font-medium">No debate posts in this filter.</p>
              <button
                onClick={() => setActiveFilter('ALL')}
                className="mt-3 px-3 py-1.5 rounded-lg bg-[#222226] text-white text-xs font-mono"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <VetoPostCard
                key={post.id}
                post={post}
                onVote={handleVote}
                onOpenComments={(p) => setActiveCommentPostId(p.id)}
                onChallengeRebuttal={() => setIsRecordModalOpen(true)}
              />
            ))
          )}
        </main>

        {/* Audience Comments Bottom Sheet */}
        {activeCommentPost && (
          <CommentsDrawer
            post={activeCommentPost}
            onClose={() => setActiveCommentPostId(null)}
            onAddComment={handleAddComment}
            onToggleLikeComment={handleToggleLikeComment}
          />
        )}

        {/* Record Rebuttal Modal */}
        {isRecordModalOpen && (
          <RecordVetoModal
            currentRoundsCount={posts.length}
            onClose={() => setIsRecordModalOpen(false)}
            onSubmit={handlePublishPost}
          />
        )}

        {/* Kotlin & Jetpack Compose Code Inspector Modal */}
        <KotlinCodeViewer
          isOpen={isCodeViewerOpen}
          onClose={() => setIsCodeViewerOpen(false)}
        />

        {/* Supabase Configuration Modal */}
        <SupabaseConfigModal
          isOpen={isSupabaseModalOpen}
          onClose={() => setIsSupabaseModalOpen(false)}
          isConnected={supabaseConnected}
        />

        {/* Authentication Modal (Login / Signup) */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          currentUser={currentUser}
          initialMode={authModalMode}
          onAuthSuccess={(user) => {
            setCurrentUser(user);
          }}
        />

        {/* Settings Modal (Language & Profile) */}
        {isSettingsModalOpen && (
          <SettingsModal
            currentLang={currentLang}
            onLanguageChange={changeLanguage}
            onClose={() => setIsSettingsModalOpen(false)}
            user={currentUser}
            onLoginClick={() => handleOpenAuth('login')}
            onSignupClick={() => handleOpenAuth('signup')}
            onLogout={handleLogout}
            onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          />
        )}
      </div>
    </AndroidPhoneFrame>
  );
}
