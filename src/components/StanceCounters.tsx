import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Stance } from '../types';

interface StanceCountersProps {
  proCount: number;
  conCount: number;
  userStance: Stance | null;
  onProClick: () => void;
  onConClick: () => void;
}

export const StanceCounters: React.FC<StanceCountersProps> = ({
  proCount,
  conCount,
  userStance,
  onProClick,
  onConClick,
}) => {
  const total = Math.max(1, proCount + conCount);
  const proRatio = (proCount / total) * 100;
  const conRatio = (conCount / total) * 100;

  const isProActive = userStance === 'PRO';
  const isConActive = userStance === 'CON';

  return (
    <div className="w-full space-y-2.5">
      {/* Action Buttons Row */}
      <div className="flex items-center justify-between gap-3">
        {/* PRO Button (+) */}
        <button
          type="button"
          onClick={onProClick}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition-all duration-200 cursor-pointer border ${
            isProActive
              ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66] shadow-[0_0_16px_rgba(0,255,102,0.45)] ring-1 ring-[#00FF66]'
              : 'bg-[#1b1b1b] border-[#2c2c2e] text-[#00FF66] hover:bg-[#00FF66]/10 hover:border-[#00FF66]/50'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              isProActive ? 'bg-[#00FF66] text-[#121212]' : 'bg-[#00FF66]/20 text-[#00FF66]'
            }`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-mono font-bold text-sm tracking-tight text-[#00FF66]">
            +{proCount.toLocaleString()}
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#b0b0b0]">
            REBUTTAL
          </span>
        </button>

        {/* Center ratio percentage */}
        <div className="shrink-0 text-center font-mono text-[11px] text-[#8e8e93] px-1">
          <span className="text-[#00FF66] font-bold">{Math.round(proRatio)}%</span>
          <span className="mx-1 text-[#48484a]">/</span>
          <span className="text-[#FF3333] font-bold">{Math.round(conRatio)}%</span>
        </div>

        {/* CON Button (-) */}
        <button
          type="button"
          onClick={onConClick}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl transition-all duration-200 cursor-pointer border ${
            isConActive
              ? 'bg-[#FF3333]/20 border-[#FF3333] text-[#FF3333] shadow-[0_0_16px_rgba(255,51,51,0.45)] ring-1 ring-[#FF3333]'
              : 'bg-[#1b1b1b] border-[#2c2c2e] text-[#FF3333] hover:bg-[#FF3333]/10 hover:border-[#FF3333]/50'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              isConActive ? 'bg-[#FF3333] text-white' : 'bg-[#FF3333]/20 text-[#FF3333]'
            }`}
          >
            <Minus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="font-mono font-bold text-sm tracking-tight text-[#FF3333]">
            -{conCount.toLocaleString()}
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#b0b0b0]">
            VETO
          </span>
        </button>
      </div>

      {/* Tug-of-war Stance Ratio Bar */}
      <div className="w-full h-1.5 bg-[#202022] rounded-full overflow-hidden flex">
        <div
          style={{ width: `${proRatio}%` }}
          className="h-full bg-[#00FF66] transition-all duration-300 shadow-[0_0_8px_rgba(0,255,102,0.8)]"
        />
        <div
          style={{ width: `${conRatio}%` }}
          className="h-full bg-[#FF3333] transition-all duration-300 shadow-[0_0_8px_rgba(255,51,51,0.8)]"
        />
      </div>
    </div>
  );
};
