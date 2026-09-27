import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Filter } from 'lucide-react';
import { VetoPost, VetoComment, Stance } from '../types';
import { GlowCommentInput } from './GlowCommentInput';

interface CommentsDrawerProps {
  post: VetoPost;
  onClose: () => void;
  onAddComment: (postId: string, content: string, stance: Stance) => void;
  onToggleLikeComment: (postId: string, commentId: string) => void;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  post,
  onClose,
  onAddComment,
  onToggleLikeComment,
}) => {
  const [filterStance, setFilterStance] = useState<'ALL' | 'PRO' | 'CON'>('ALL');

  const filteredComments = post.comments.filter((c) => {
    if (filterStance === 'ALL') return true;
    return c.stance === filterStance;
  });

  const proCount = post.comments.filter((c) => c.stance === 'PRO').length;
  const conCount = post.comments.filter((c) => c.stance === 'CON').length;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm transition-opacity">
      <div
        className="w-full max-w-xl max-h-[85vh] bg-[#161616] rounded-t-3xl border-t border-x border-[#2c2c2e] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab">
          <div className="w-12 h-1.5 rounded-full bg-[#3a3a3c]" />
        </div>

        {/* Drawer Header */}
        <div className="px-5 py-3 border-b border-[#242426] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#202022] text-[#00FF66]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm tracking-tight">
                  AUDIENCE DEBATE ARENA
                </h3>
                <span
                  className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded border ${
                    post.round === 0
                      ? 'border-[#00FF66] text-[#00FF66] bg-[#00FF66]/10'
                      : 'border-[#FF3333] text-[#FF3333] bg-[#FF3333]/10'
                  }`}
                >
                  VETO {post.round}
                </span>
              </div>
              <p className="text-[#8e8e93] text-xs truncate max-w-[280px]">
                {post.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8e8e93] hover:text-white hover:bg-[#252528] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Segmented Control */}
        <div className="px-5 py-2.5 bg-[#1b1b1b] border-b border-[#242426] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#8e8e93]" />
            <span className="text-[#8e8e93] font-mono text-[11px]">FILTER:</span>
          </div>

          <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-lg border border-[#28282a]">
            <button
              onClick={() => setFilterStance('ALL')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                filterStance === 'ALL'
                  ? 'bg-[#2a2a2e] text-white'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              ALL ({post.comments.length})
            </button>
            <button
              onClick={() => setFilterStance('PRO')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                filterStance === 'PRO'
                  ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/50'
                  : 'text-[#888888] hover:text-[#00FF66]'
              }`}
            >
              + PRO ({proCount})
            </button>
            <button
              onClick={() => setFilterStance('CON')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                filterStance === 'CON'
                  ? 'bg-[#FF3333]/20 text-[#FF3333] border border-[#FF3333]/50'
                  : 'text-[#888888] hover:text-[#FF3333]'
              }`}
            >
              - CON ({conCount})
            </button>
          </div>
        </div>

        {/* Replies List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredComments.length === 0 ? (
            <div className="text-center py-12 text-[#757575]">
              <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#b0b0b0]" />
              <p className="text-sm font-medium">No replies for this filter yet.</p>
              <p className="text-xs text-[#555555] mt-1">
                Be the first to step into the ring!
              </p>
            </div>
          ) : (
            filteredComments.map((comment) => {
              const isCommentPro = comment.stance === 'PRO';
              return (
                <div
                  key={comment.id}
                  className={`bg-[#1c1c1e] rounded-xl p-3.5 border transition-all duration-200 ${
                    isCommentPro
                      ? 'border-l-4 border-l-[#00FF66] border-y-[#2a2a2e] border-r-[#2a2a2e] shadow-[-4px_0_12px_rgba(0,255,102,0.2)]'
                      : 'border-l-4 border-l-[#FF3333] border-y-[#2a2a2e] border-r-[#2a2a2e] shadow-[-4px_0_12px_rgba(255,51,51,0.2)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">
                        {comment.author}
                      </span>
                      <span className="text-[#8e8e93] text-[11px] font-mono">
                        {comment.handle}
                      </span>
                      <span className="text-[#555555] text-[10px]">·</span>
                      <span className="text-[#757575] text-[11px]">
                        {comment.timestamp}
                      </span>
                    </div>

                    {/* Stance Indicator Badge */}
                    <span
                      className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full border ${
                        isCommentPro
                          ? 'bg-[#00FF66]/15 border-[#00FF66]/50 text-[#00FF66]'
                          : 'bg-[#FF3333]/15 border-[#FF3333]/50 text-[#FF3333]'
                      }`}
                    >
                      {isCommentPro ? '+ PRO SUPPORT' : '- CON OBJECT'}
                    </span>
                  </div>

                  <p className="text-[#d8d8d8] text-xs sm:text-sm leading-relaxed my-2 font-normal">
                    {comment.content}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleLikeComment(post.id, comment.id)}
                        className={`flex items-center gap-1.5 text-[11px] font-mono py-1 px-2 rounded hover:bg-[#252528] transition-colors ${
                          comment.userLiked
                            ? isCommentPro
                              ? 'text-[#00FF66] font-bold'
                              : 'text-[#FF3333] font-bold'
                            : 'text-[#8e8e93]'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-[#555555]">
                      VERIFIED LIFTER
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Dynamic Glow Comment Input (Pinned Bottom Section) */}
        <GlowCommentInput
          onSend={(content, stance) => onAddComment(post.id, content, stance)}
        />
      </div>
    </div>
  );
};
