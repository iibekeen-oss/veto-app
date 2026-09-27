import React, { useState } from 'react';
import { Send, Plus, Minus } from 'lucide-react';
import { Stance } from '../types';

interface GlowCommentInputProps {
  onSend: (content: string, stance: Stance) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const GlowCommentInput: React.FC<GlowCommentInputProps> = ({
  onSend,
  placeholder,
  autoFocus = false,
}) => {
  const [content, setContent] = useState('');
  const [stance, setStance] = useState<Stance>('PRO');

  const isPro = stance === 'PRO';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSend(content.trim(), stance);
    setContent('');
  };

  return (
    <div className="w-full bg-[#1b1b1b] border-t border-[#262626] p-4 transition-all duration-200">
      {/* Stance Binary Toggle Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#a0a0a0] uppercase font-mono">
          <span>Stance:</span>
          <span className={isPro ? 'text-[#00FF66]' : 'text-[#FF3333]'}>
            {isPro ? '+ PRO (SUPPORT)' : '- CON (OBJECT)'}
          </span>
        </div>

        {/* Binary Toggle Selector */}
        <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-lg border border-[#2c2c2e]">
          {/* PRO Toggle (+) */}
          <button
            type="button"
            onClick={() => setStance('PRO')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
              isPro
                ? 'bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.4)]'
                : 'text-[#888888] hover:text-[#00FF66] hover:bg-[#00FF66]/5 border border-transparent'
            }`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>PRO</span>
          </button>

          {/* CON Toggle (-) */}
          <button
            type="button"
            onClick={() => setStance('CON')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
              !isPro
                ? 'bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333] shadow-[0_0_12px_rgba(255,51,51,0.4)]'
                : 'text-[#888888] hover:text-[#FF3333] hover:bg-[#FF3333]/5 border border-transparent'
            }`}
          >
            <Minus className="w-3.5 h-3.5 stroke-[3]" />
            <span>CON</span>
          </button>
        </div>
      </div>

      {/* Dynamic Glow Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center bg-[#121212] rounded-xl px-3.5 py-2.5 transition-all duration-300 border-2 ${
            isPro
              ? 'border-[#00FF66] shadow-[0_0_16px_rgba(0,255,102,0.35)] ring-1 ring-[#00FF66]/50'
              : 'border-[#FF3333] shadow-[0_0_16px_rgba(255,51,51,0.35)] ring-1 ring-[#FF3333]/50'
          }`}
        >
          {/* Stance indicator prefix badge */}
          <span
            className={`shrink-0 mr-2.5 text-xs font-black font-mono px-1.5 py-0.5 rounded ${
              isPro
                ? 'bg-[#00FF66]/20 text-[#00FF66]'
                : 'bg-[#FF3333]/20 text-[#FF3333]'
            }`}
          >
            {isPro ? '+' : '-'}
          </span>

          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus={autoFocus}
            placeholder={
              placeholder ||
              (isPro
                ? 'State your argument in support (+)...'
                : 'State your counter-objection (-)...')
            }
            className="w-full bg-transparent text-white placeholder-[#757575] text-sm focus:outline-none"
          />

          <button
            type="submit"
            disabled={!content.trim()}
            className={`shrink-0 ml-2 p-1.5 rounded-lg transition-all duration-200 ${
              content.trim()
                ? isPro
                  ? 'bg-[#00FF66] text-[#121212] hover:bg-[#00FF66]/90 shadow-[0_0_10px_rgba(0,255,102,0.6)] cursor-pointer'
                  : 'bg-[#FF3333] text-white hover:bg-[#FF3333]/90 shadow-[0_0_10px_rgba(255,51,51,0.6)] cursor-pointer'
                : 'text-[#444444] cursor-not-allowed'
            }`}
            title="Post comment"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
      <div className="flex items-center justify-between mt-2 text-[10px] text-[#666666] font-mono px-1">
        <span>Press Enter to submit</span>
        <span>
          Glow: {isPro ? 'Neon Green (#00FF66)' : 'Glowing Red (#FF3333)'}
        </span>
      </div>
    </div>
  );
};
