import React from 'react';

interface VetoStopHandCardLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

/**
 * VetoStopHandCardLogo:
 * Glowing Red "Stop Hand / Veto Card" vector icon:
 * 1. Angled Red Referee / Veto Card with glowing crimson gradient (#FF3333).
 * 2. Raised tactical Stop Hand (palm facing forward, 4 fingers + thumb) with clean vector geometry.
 * 3. Intense radial halo & kinetic shockwave ring.
 * 4. Stenciled "VETO" text badge across the card.
 */
export const VetoStopHandCardLogo: React.FC<VetoStopHandCardLogoProps> = ({
  size = 46,
  className = '',
  showText = false,
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#121212] border border-[#FF3333]/50 shadow-[0_0_24px_rgba(255,51,51,0.45)] shrink-0 flex items-center justify-center select-none group transition-all duration-300 hover:scale-105 hover:border-[#FF3333] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Intense Crimson Red Radial Halo */}
          <radialGradient id="stopHandHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF3333" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#FF1111" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#121212" stopOpacity="0" />
          </radialGradient>

          {/* Glowing Red Card Gradient */}
          <linearGradient id="vetoCardGrad" x1="28%" y1="14%" x2="76%" y2="84%">
            <stop offset="0%" stopColor="#FF5555" />
            <stop offset="45%" stopColor="#FF2222" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>

          {/* Neon Glow Filter */}
          <filter id="handRedGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pitch-Black Background */}
        <rect width="100" height="100" fill="#121212" />

        {/* 1. Glowing Radial Halo */}
        <circle cx="50" cy="50" r="48" fill="url(#stopHandHalo)" />

        {/* Kinetic shockwave ring */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="#FF3333"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeDasharray="3 3"
        />

        {/* 2. The Angled "Veto Card" in Background (Ref / Absolute Veto Penalty Card) */}
        <g transform="rotate(14 52 50)">
          <rect
            x="28"
            y="14"
            width="46"
            height="66"
            rx="8"
            fill="url(#vetoCardGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            filter="url(#handRedGlow)"
          />
          {/* Internal card border highlight */}
          <rect
            x="32"
            y="18"
            width="38"
            height="58"
            rx="5"
            stroke="#FFAAAA"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            fill="none"
          />
          {/* Stenciled VETO text at top of card */}
          <text
            x="51"
            y="32"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="9"
            fontWeight="900"
            fontFamily="monospace, sans-serif"
            letterSpacing="1.5"
          >
            VETO
          </text>
        </g>

        {/* 3. The Raised Tactical "Stop Hand" in Foreground */}
        <g filter="url(#handRedGlow)">
          {/* Palm Base */}
          <rect x="34" y="48" width="28" height="26" rx="6" fill="#FFFFFF" />

          {/* 4 Raised Fingers */}
          {/* Index Finger */}
          <rect x="35" y="28" width="5.5" height="24" rx="2.75" fill="#FFFFFF" />
          {/* Middle Finger (tallest) */}
          <rect x="42" y="24" width="5.5" height="28" rx="2.75" fill="#FFFFFF" />
          {/* Ring Finger */}
          <rect x="49" y="26" width="5.5" height="26" rx="2.75" fill="#FFFFFF" />
          {/* Pinky Finger */}
          <rect x="56" y="34" width="5.5" height="18" rx="2.75" fill="#FFFFFF" />

          {/* Thumb angled leftwards */}
          <path
            d="M35 54 C22 48, 24 40, 28 38 C32 40, 35 46, 35 54 Z"
            fill="#FFFFFF"
          />

          {/* Palm Center Glowing Veto Sensor Dot */}
          <circle cx="48" cy="61" r="4.5" fill="#FF2222" />
          <circle cx="48" cy="61" r="2" fill="#FFFFFF" />
        </g>
      </svg>

      {/* Subtle Specular Rim */}
      <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-[#FF3333]/50 group-hover:ring-[#FF3333] transition-colors" />

      {showText && (
        <span className="absolute bottom-1 right-1 font-mono text-[7px] font-black px-1 rounded bg-[#121212]/90 text-[#FF3333] border border-[#FF3333]/50 backdrop-blur-sm">
          VETO
        </span>
      )}
    </div>
  );
};
