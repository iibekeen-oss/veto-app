import React from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Maximize2, Code2 } from 'lucide-react';
import { VetoStopHandCardLogo } from './VetoStopHandCardLogo';

interface AndroidPhoneFrameProps {
  children: React.ReactNode;
  isPhoneView: boolean;
  onToggleView: () => void;
  onOpenCodeInspector: () => void;
}

export const AndroidPhoneFrame: React.FC<AndroidPhoneFrameProps> = ({
  children,
  isPhoneView,
  onToggleView,
  onOpenCodeInspector,
}) => {
  // Format current local time (e.g., 9:41)
  const currentTime = '09:41';

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-start py-4 px-2 sm:px-4">
      {/* Top Prototype Controls Toolbar */}
      <header className="w-full max-w-4xl mb-4 bg-[#141416] border border-[#26262a] rounded-xl px-4 py-2.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <VetoStopHandCardLogo size={32} />
          <span className="font-mono font-bold text-sm tracking-wide text-white">
            VETO <span className="text-[#888888] font-normal text-xs">// GLOWING RED STOP HAND / VETO CARD</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Phone Frame vs Wide Layout */}
          <button
            onClick={onToggleView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f1f23] hover:bg-[#2a2a30] text-[#b0b0b0] hover:text-white text-xs font-mono transition-colors border border-[#333338]"
            title={isPhoneView ? 'Switch to Wide Feed' : 'Switch to Android Frame'}
          >
            {isPhoneView ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#00FF66]" />
                <span className="hidden sm:inline">Wide Mode</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#00FF66]" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>

          {/* Jetpack Compose Kotlin Code Inspector Trigger */}
          <button
            onClick={onOpenCodeInspector}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF66]/15 hover:bg-[#00FF66]/25 text-[#00FF66] border border-[#00FF66]/50 text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(0,255,102,0.25)]"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Jetpack Compose Code</span>
          </button>
        </div>
      </header>

      {/* Main Container: Either Phone Frame or Fluid Container */}
      {isPhoneView ? (
        <div className="relative w-full max-w-[430px] rounded-[48px] p-3 bg-gradient-to-b from-[#2b2b2e] via-[#1a1a1c] to-[#121214] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,255,102,0.1)] border-[4px] border-[#38383e]">
          {/* Inner Phone Chassis */}
          <div className="relative w-full h-[844px] bg-[#121212] rounded-[40px] overflow-hidden flex flex-col border border-black shadow-inner">
            {/* Android Status Bar */}
            <div className="w-full bg-[#121212] px-6 pt-3 pb-2 flex items-center justify-between text-xs text-[#b0b0b0] select-none z-30 shrink-0">
              <span className="font-mono font-bold text-[13px] text-white">
                {currentTime}
              </span>

              {/* Center Camera Punch-Hole */}
              <div className="w-4 h-4 rounded-full bg-black border border-[#222222] shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0d1b2a]" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-2">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <BatteryMedium className="w-4 h-4 text-[#00FF66]" />
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
              {children}
            </div>

            {/* Android Gesture Bar */}
            <div className="w-full h-5 bg-[#121212] flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-[#555555] rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-[#121212] rounded-2xl border border-[#222226] p-4 sm:p-6 shadow-2xl">
          {children}
        </div>
      )}
    </div>
  );
};
