import React from 'react';

interface VetoHeadOnCollisionLogoProps {
  size?: number;
  className?: string;
}

/**
 * VetoHeadOnCollisionLogo:
 * Direct kinetic interception scene:
 * 1. Top Missile (Attacker): Coming straight down from TOP with an intense Glowing Neon Green (#00FF66) flame trail.
 * 2. Bottom Interceptor (VETO0): Launching straight up from BOTTOM directly towards top missile.
 *    - Interceptor body has "VETO0" clearly printed along its side.
 *    - Powerful, blazing Glowing Red (#FF3333) fiery thruster trail.
 * 3. Impact Point: The nose cones of both missiles meet head-on in the center (y=50) at a zero-point collision
 *    with sharp, high-contrast neon sparks and kinetic shockwaves.
 * 4. Crisp minimalist vector rendering against dark #121212 background.
 */
export const VetoHeadOnCollisionLogo: React.FC<VetoHeadOnCollisionLogoProps> = ({
  size = 46,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#121212] border border-[#2a2a30] shadow-[0_0_18px_rgba(255,51,51,0.25)] flex items-center justify-center shrink-0 select-none group transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Intense Neon Green Glow Filter */}
          <filter id="greenImpactGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense Glowing Red Thruster Filter */}
          <filter id="redImpactGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Top Threat Green Thruster Gradient (comes from top y=0 to y=25) */}
          <linearGradient id="topGreenThruster" x1="50" y1="0" x2="50" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(0, 255, 102, 0)" />
            <stop offset="40%" stopColor="#00FF66" />
            <stop offset="85%" stopColor="#70FFAC" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Bottom VETO0 Red Thruster Gradient (comes from bottom y=100 to y=70) */}
          <linearGradient id="bottomRedThruster" x1="50" y1="100" x2="50" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255, 51, 51, 0)" />
            <stop offset="35%" stopColor="#FF3333" />
            <stop offset="75%" stopColor="#FF9933" />
            <stop offset="90%" stopColor="#FFEE55" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Metallic Missile Body Gradients */}
          <linearGradient id="veto0Hull" x1="43" y1="50" x2="57" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E1E24" />
            <stop offset="50%" stopColor="#3A3A46" />
            <stop offset="85%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#1A1A20" />
          </linearGradient>

          <linearGradient id="attackerHull" x1="43" y1="50" x2="57" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#16221A" />
            <stop offset="50%" stopColor="#2A3D30" />
            <stop offset="85%" stopColor="#D4FCE0" />
            <stop offset="100%" stopColor="#16221A" />
          </linearGradient>
        </defs>

        {/* Pitch-black high-contrast background #121212 */}
        <rect width="100" height="100" fill="#121212" />

        {/* Ambient Targeting Radar Grid lines */}
        <line x1="15" y1="50" x2="85" y2="50" stroke="#33333A" strokeWidth="0.8" strokeDasharray="2 3" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#33333A" strokeWidth="0.8" strokeDasharray="2 3" />
        <circle cx="50" cy="50" r="32" stroke="#222228" strokeWidth="0.8" strokeDasharray="3 4" />

        {/* ========================================================================= */}
        {/* 1. TOP MISSILE (Attacker): Coming Straight Down from the TOP              */}
        {/* ========================================================================= */}
        {/* Top Flame Trail (#00FF66 Neon Green) */}
        <g filter="url(#greenImpactGlow)">
          {/* Broad outer exhaust plume */}
          <path
            d="M45 22 C43 14 38 7 35 0 L65 0 C62 7 57 14 55 22 Z"
            fill="url(#topGreenThruster)"
            opacity="0.85"
          />
          {/* Intense concentrated thrust core */}
          <path
            d="M47 24 L44 4 L56 4 L53 24 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          {/* Green sparks trailing down */}
          <circle cx="43" cy="12" r="1.2" fill="#00FF66" />
          <circle cx="58" cy="8" r="1.4" fill="#00FF66" />
          <circle cx="50" cy="18" r="1" fill="#FFFFFF" />
        </g>

        {/* Top Attacker Missile Body (Heading Straight Down: tail at y=23, nose at y=48) */}
        <g>
          {/* Upper Stabilizer Fins */}
          <path d="M44 24 L35 18 L36 26 L44 28 Z" fill="#1F2E23" stroke="#00FF66" strokeWidth="0.8" />
          <path d="M56 24 L65 18 L64 26 L56 28 Z" fill="#1F2E23" stroke="#00FF66" strokeWidth="0.8" />

          {/* Main Shaft */}
          <path
            d="M45 24 L55 24 L55 42 L45 42 Z"
            fill="url(#attackerHull)"
            stroke="#00FF66"
            strokeWidth="1.2"
          />

          {/* Downward Nose Cone Meeting at y=48 */}
          <path
            d="M45 42 L50 48 L55 42 Z"
            fill="#00FF66"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />

          {/* Attacker Tech Ring Lines */}
          <line x1="45" y1="28" x2="55" y2="28" stroke="#00FF66" strokeWidth="0.9" />
          <line x1="45" y1="36" x2="55" y2="36" stroke="#00FF66" strokeWidth="0.9" />
        </g>

        {/* ========================================================================= */}
        {/* 2. BOTTOM INTERCEPTOR (VETO0): Launching Straight Up from the BOTTOM      */}
        {/* ========================================================================= */}
        {/* Bottom Flame Trail (#FF3333 Glowing Red) */}
        <g filter="url(#redImpactGlow)">
          {/* Broad outer fiery plume */}
          <path
            d="M44 76 C42 86 36 93 32 100 L68 100 C64 93 58 86 56 76 Z"
            fill="url(#bottomRedThruster)"
            opacity="0.9"
          />
          {/* Intense hot core flame needle */}
          <path
            d="M47 75 L42 96 L58 96 L53 75 Z"
            fill="#FFDD33"
          />
          <path
            d="M48 75 L45 92 L55 92 L52 75 Z"
            fill="#FFFFFF"
          />
          {/* Fiery sparks trailing upward */}
          <circle cx="41" cy="88" r="1.4" fill="#FF3333" />
          <circle cx="59" cy="92" r="1.3" fill="#FF5500" />
          <circle cx="50" cy="82" r="1.2" fill="#FFFFFF" />
        </g>

        {/* Bottom VETO0 Missile Body (Heading Straight Up: tail at y=76, nose at y=52) */}
        <g>
          {/* Guidance Fins */}
          <path d="M44 75 L34 82 L35 74 L44 71 Z" fill="#201C22" stroke="#FF3333" strokeWidth="0.8" />
          <path d="M56 75 L66 82 L65 74 L56 71 Z" fill="#201C22" stroke="#FF3333" strokeWidth="0.8" />

          {/* Main Shaft with high-contrast metallic finish */}
          <path
            d="M44 58 L56 58 L56 76 L44 76 Z"
            fill="url(#veto0Hull)"
            stroke="#FF3333"
            strokeWidth="1.2"
          />

          {/* Upward Nose Cone Meeting at y=52 */}
          <path
            d="M44 58 L50 52 L56 58 Z"
            fill="#FF3333"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />

          {/* VETO0 Printed Vertically on the Shaft (Bold high-contrast stencil) */}
          {/* Rotate 90deg to run cleanly along the vertical missile body */}
          <g transform="translate(50, 67) rotate(-90)">
            {/* Background shadow for maximum legibility */}
            <text
              x="0"
              y="1.8"
              textAnchor="middle"
              fill="#000000"
              fontSize="6.8"
              fontWeight="900"
              fontFamily="monospace, system-ui, sans-serif"
              letterSpacing="0.8"
            >
              VETO0
            </text>
            {/* Crisp white text */}
            <text
              x="0"
              y="1.2"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="6.5"
              fontWeight="900"
              fontFamily="monospace, system-ui, sans-serif"
              letterSpacing="0.8"
            >
              VETO0
            </text>
          </g>
        </g>

        {/* ========================================================================= */}
        {/* 3. IMPACT POINT: Nose cones meet head-on in the center (y=48 to 52)       */}
        {/* ========================================================================= */}
        {/* Shockwave Rings */}
        <circle cx="50" cy="50" r="14" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.6" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="8" stroke="#00FF66" strokeWidth="1.2" opacity="0.85" />
        <circle cx="50" cy="50" r="5" stroke="#FF3333" strokeWidth="1.5" />

        {/* Radiant Zero-Point Kinetic Spark Rays */}
        {/* Horizontal & Diagonal Kinetic Bursts */}
        <line x1="50" y1="50" x2="28" y2="50" stroke="#00FF66" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="50" x2="72" y2="50" stroke="#FF3333" strokeWidth="2" strokeLinecap="round" />

        <line x1="50" y1="50" x2="35" y2="42" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="50" x2="65" y2="58" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

        <line x1="50" y1="50" x2="34" y2="58" stroke="#FF3333" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="50" x2="66" y2="42" stroke="#00FF66" strokeWidth="1.5" strokeLinecap="round" />

        {/* Sharp High-Energy Kinetic Spark Particles */}
        <polygon points="50,45 52,49 57,50 52,51 50,55 48,51 43,50 48,49" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="3" fill="#FFFFFF" filter="url(#greenImpactGlow)" />
        <circle cx="50" cy="50" r="1.5" fill="#FFEE00" />
      </svg>

      {/* Subtle outer neon ring */}
      <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-white/10 group-hover:ring-[#FF3333]/50 transition-colors" />
    </div>
  );
};
