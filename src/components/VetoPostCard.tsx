import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, MessageSquare, Share2, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { VetoPost, Stance } from '../types';
import { StanceCounters } from './StanceCounters';
import { useLanguage } from '../context/LanguageContext';

interface VetoPostCardProps {
  post: VetoPost;
  onVote: (postId: string, stance: Stance) => void;
  onOpenComments: (post: VetoPost) => void;
  onChallengeRebuttal?: (post: VetoPost) => void;
}

export const VetoPostCard: React.FC<VetoPostCardProps> = ({
  post,
  onVote,
  onOpenComments,
  onChallengeRebuttal,
}) => {
  const { t, isRtl } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [playProgress, setPlayProgress] = useState(0);

  const isOriginal = post.round === 0;
  // Border & Glow logic:
  // Veto 0 (Original): Neon Green (#00FF66)
  // Veto 1+ (Opposition / Rebuttal): Glowing Red (#FF3333)
  const glowBorderClass = isOriginal
    ? 'border-[#00FF66] shadow-[0_0_22px_rgba(0,255,102,0.35)]'
    : 'border-[#FF3333] shadow-[0_0_22px_rgba(255,51,51,0.35)]';

  const badgeColorClass = isOriginal
    ? 'bg-[#121212]/90 text-[#00FF66] border-[#00FF66]'
    : 'bg-[#121212]/90 text-[#FF3333] border-[#FF3333]';

  const dotColorClass = isOriginal ? 'bg-[#00FF66]' : 'bg-[#FF3333]';

  // Play animation simulator
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <article
      className={`w-full bg-[#1b1b1b] rounded-2xl border-2 ${glowBorderClass} transition-all duration-300 overflow-hidden flex flex-col p-4 md:p-5`}
    >
      {/* Header: Creator, Category & Topic */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-[#242426] border flex items-center justify-center font-bold text-white text-base font-mono ${
              isOriginal ? 'border-[#00FF66]/50' : 'border-[#FF3333]/50'
            }`}
          >
            {post.avatarInitial}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-white font-bold text-sm tracking-tight">
                {post.creatorName}
              </h3>
              {isOriginal ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66]" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-[#FF3333]" />
              )}
            </div>
            <p className="text-[#8e8e93] text-xs font-mono">{post.handle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#252528] text-[#a0a0a0] border border-[#333336]">
            {post.category}
          </span>
        </div>
      </div>

      {/* Video & Media Viewport */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-black border border-[#2a2a2e] group">
        <img
          src={post.image}
          alt={post.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isPlaying ? 'scale-105 brightness-105' : 'group-hover:scale-102 brightness-90'
          }`}
          onError={(e) => {
            // High-fidelity fallback if image cannot load
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Cinematic gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/60 pointer-events-none" />

        {/* Top-Left: "VETO" Round Indicator Badge */}
        <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} z-10`}>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono font-extrabold tracking-wide backdrop-blur-md shadow-lg ${badgeColorClass}`}
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${dotColorClass}`} />
            <span>
              {isOriginal
                ? (isRtl ? 'فيتو 0 · الأطروحة الأصلية' : 'VETO 0 · ORIGINAL THESIS')
                : (isRtl ? `فيتو ${post.round} · رد تكتيكي` : `VETO ${post.round} · REBUTTAL`)}
            </span>
          </div>
        </div>

        {/* Top-Right: Video Duration & Mute Controls */}
        <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} z-10 flex items-center gap-2`}>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-md bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors border border-white/10"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#b0b0b0]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#00FF66]" />
            )}
          </button>
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white border border-white/10">
            {post.videoDuration}
          </span>
        </div>

        {/* Center: Play / Pause Control Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border-2 cursor-pointer shadow-xl ${
              isOriginal
                ? 'bg-black/60 border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66] hover:text-[#121212] shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                : 'bg-black/60 border-[#FF3333] text-[#FF3333] hover:bg-[#FF3333] hover:text-white shadow-[0_0_20px_rgba(255,51,51,0.4)]'
            }`}
            title={isPlaying ? 'Pause video' : 'Play argument video'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>
        </div>

        {/* Video Scrim Bottom Content: Title & Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 flex flex-col justify-end">
          <h2 className="text-white font-bold text-base md:text-lg leading-snug line-clamp-2 drop-shadow-md">
            {post.title}
          </h2>

          {/* Playing Progress Bar */}
          <div className="w-full h-1 bg-white/20 rounded-full mt-2.5 overflow-hidden">
            <div
              style={{ width: `${playProgress}%` }}
              className={`h-full transition-all duration-100 ${
                isOriginal ? 'bg-[#00FF66]' : 'bg-[#FF3333]'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Post Thesis / Summary Text */}
      <div className="my-3.5">
        <p className="text-[#cccccc] text-sm leading-relaxed font-normal">
          {post.summary}
        </p>
      </div>

      {/* Stance Counter Icons: "+ [Pro Count]" in Green & "- [Con Count]" in Red */}
      <div className="pt-1 pb-3">
        <StanceCounters
          proCount={post.proCount}
          conCount={post.conCount}
          userStance={post.userStance}
          onProClick={() => onVote(post.id, 'PRO')}
          onConClick={() => onVote(post.id, 'CON')}
        />
      </div>

      {/* Card Footer: Audience Discussion Drawer Trigger & Challenge */}
      <div className="flex items-center justify-between pt-3 border-t border-[#2c2c2e] text-xs">
        <button
          onClick={() => onOpenComments(post)}
          className="flex items-center gap-2 py-1.5 px-3 rounded-lg text-[#b0b0b0] hover:text-white hover:bg-[#252528] transition-all cursor-pointer font-sans"
        >
          <MessageSquare className="w-4 h-4 text-[#8e8e93]" />
          <span className="font-medium">
            {post.comments.length} {isRtl ? 'رد رياضي' : 'Audience Replies'}
          </span>
        </button>

        <div className="flex items-center gap-2">
          {onChallengeRebuttal && (
            <button
              onClick={() => onChallengeRebuttal(post)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#252528] text-white hover:bg-[#333338] border border-[#3e3e44] transition-all cursor-pointer font-bold text-[11px] font-mono tracking-wider text-[#FF3333]"
            >
              <Flame className="w-3.5 h-3.5 text-[#FF3333]" />
              <span>{isRtl ? 'رد فيتو' : 'REBUT VETO'}</span>
            </button>
          )}

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `VETO: ${post.title}`,
                  text: post.summary,
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="p-1.5 rounded-lg text-[#8e8e93] hover:text-white hover:bg-[#252528] transition-colors"
            title="Share debate post"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
