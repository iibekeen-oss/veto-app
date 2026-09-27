import React, { useState } from 'react';
import { cadBlueprintImg } from '../assets/images';

interface VetoCadBlueprintLogoProps {
  size?: number;
  className?: string;
  showHudMeta?: boolean;
}

/**
 * VetoCadBlueprintLogo:
 * Professional military CAD blueprint vector design of tactical missile interception:
 * 1. Technical Layout: Subtle gray HUD grid lines, coordinate crosshairs, and radar trajectory arcs.
 * 2. Attacker Missile: Descending along parabolic arc with dense exhaust smoke glowing Neon Green (#00FF66).
 * 3. VETO-0 Interceptor: Sharp upward angle PAC-3 interceptor airframe, "VETO-0" stenciled in sharp white military font,
 *    volumetric exhaust smoke plume glowing vibrant Red (#FF3333).
 * 4. Kinetic Impact Zone: Direct nose-to-nose Hit-to-Kill impact in center with thermal flash & shrapnel debris.
 * 5. Set against pitch-black #121212 background with clean CAD vector telemetry.
 */
export const VetoCadBlueprintLogo: React.FC<VetoCadBlueprintLogoProps> = ({
  size = 50,
  className = '',
  showHudMeta = false,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#121212] border border-[#2e2e38] shadow-[0_0_24px_rgba(255,51,51,0.3)] shrink-0 flex items-center justify-center select-none group transition-all duration-300 hover:scale-105 hover:border-[#FF3333]/60 ${className}`}
      style={{ width: size, height: size }}
    >
      {!imageFailed ? (
        <img
          src={cadBlueprintImg}
          alt="VETO-0 Military CAD Blueprint Interception"
          className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-108 brightness-105"
          onError={() => setImageFailed(true)}
        />
      ) : (
        /* Pristine Vector CAD Blueprint Fallback */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="cadGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="cadGreenTrail" x1="88" y1="12" x2="50" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="#00FF66" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <linearGradient id="cadRedTrail" x1="12" y1="88" x2="50" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="45%" stopColor="#FF3333" />
              <stop offset="90%" stopColor="#FFAA33" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          {/* CAD Technical HUD Grid */}
          <rect width="100" height="100" fill="#121212" />
          <path d="M10 20 H90 M10 40 H90 M10 60 H90 M10 80 H90" stroke="#1f242d" strokeWidth="0.5" strokeDasharray="1 3" />
          <path d="M20 10 V90 M40 10 V90 M60 10 V90 M80 10 V90" stroke="#1f242d" strokeWidth="0.5" strokeDasharray="1 3" />
          
          {/* Radar Trajectory Arcs */}
          <circle cx="50" cy="50" r="38" stroke="#252d3a" strokeWidth="0.7" strokeDasharray="3 4" />
          <circle cx="50" cy="50" r="22" stroke="#2a3545" strokeWidth="0.8" />
          <line x1="50" y1="6" x2="50" y2="94" stroke="#00FF66" strokeWidth="0.6" strokeDasharray="2 4" strokeOpacity="0.4" />
          <line x1="6" y1="50" x2="94" y2="50" stroke="#FF3333" strokeWidth="0.6" strokeDasharray="2 4" strokeOpacity="0.4" />

          {/* Attacker Parabolic Arc (Neon Green) */}
          <path d="M88 12 Q72 26 50 50" stroke="url(#cadGreenTrail)" strokeWidth="3" strokeLinecap="round" filter="url(#cadGlow)" />
          
          {/* VETO-0 Interceptor Trajectory (Vibrant Red) */}
          <path d="M12 88 Q28 72 50 50" stroke="url(#cadRedTrail)" strokeWidth="4.5" strokeLinecap="round" filter="url(#cadGlow)" />

          {/* PAC-3 Interceptor Missile Airframe */}
          <g transform="translate(36, 64) rotate(-45)">
            <rect x="-3" y="-12" width="6" height="20" rx="1" fill="#E2E8F0" stroke="#FF3333" strokeWidth="0.8" />
            <path d="M-6 4 L-3 0 L-3 6 Z" fill="#33333E" />
            <path d="M6 4 L3 0 L3 6 Z" fill="#33333E" />
            <path d="M-3 -12 L0 -17 L3 -12 Z" fill="#FF3333" />
            <text x="0" y="-1" textAnchor="middle" fill="#000000" fontSize="3.8" fontWeight="900" fontFamily="monospace">
              VETO-0
            </text>
          </g>

          {/* Kinetic Hit-to-Kill Impact Zone */}
          <circle cx="50" cy="50" r="8" fill="#FFFFFF" filter="url(#cadGlow)" />
          <circle cx="50" cy="50" r="14" stroke="#00FF66" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="20" stroke="#FF3333" strokeWidth="1.2" strokeDasharray="3 3" />
          {/* Shrapnel debris rays */}
          <line x1="50" y1="50" x2="64" y2="38" stroke="#FFEE00" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="36" y2="62" stroke="#FF3333" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="62" y2="60" stroke="#00FF66" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="38" y2="38" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}

      {/* CAD Technical Target Corner Reticles */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#00FF66]/80 pointer-events-none" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#00FF66]/80 pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#FF3333]/80 pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#FF3333]/80 pointer-events-none" />

      {showHudMeta && (
        <span className="absolute bottom-0.5 right-1 font-mono text-[7px] font-black px-1 rounded bg-[#121212]/90 text-[#00FF66] border border-[#00FF66]/40 backdrop-blur-sm">
          CAD·PAC3
        </span>
      )}
    </div>
  );
};
