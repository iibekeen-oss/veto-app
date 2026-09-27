import React, { useState } from 'react';

interface VetoInterceptGraphicProps {
  className?: string;
  size?: number;
  showKineticFx?: boolean;
}

/**
 * VetoInterceptGraphic:
 * High-contrast anti-air missile interception system app logo/graphic:
 * 1. Realistic interceptor missile (Patriot / Iron Dome inspired) launching vertically/diagonally
 * 2. Sharp metallic aerodynamic body with bold white "VETO" clearly printed along its shaft
 * 3. Intense Glowing Red (#FF3333) fiery jet engine trail representing opposition/VETO
 * 4. Incoming threat projectile leaving a distinct vivid Neon Green (#00FF66) energy trail
 * 5. High-energy kinetic collision intersection point with bright neon sparks & shockwave rings
 * 6. Pitch-black dark gym aesthetic (#121212) with high-contrast vector fidelity
 */
export const VetoInterceptGraphic: React.FC<VetoInterceptGraphicProps> = ({
  className = '',
  size = 48,
  showKineticFx = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // If using the dedicated 8k AI-rendered interception artwork:
  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#121212] border border-[#2a2a2e] shadow-[0_0_16px_rgba(255,51,51,0.3)] shrink-0 flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {!imageError ? (
        <img
          src="/src/assets/images/veto_missile_intercept_1790352543364.jpg"
          alt="VETO Interceptor Missile System"
          className="w-full h-full object-cover rounded-xl"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Pristine Vector Fallback if image asset is unavailable */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="vectorGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="redTrail" x1="50" y1="50" x2="20" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FF9900" />
              <stop offset="60%" stopColor="#FF3333" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="greenTrail" x1="50" y1="50" x2="85" y2="15" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#00FF66" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Deep pitch black background */}
          <rect width="100" height="100" fill="#121212" />

          {/* Incoming Green Threat Projectile Path */}
          <path
            d="M92 12 Q70 30 50 50"
            stroke="url(#greenTrail)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#vectorGlow)"
          />

          {/* VETO Interceptor Red Thruster Trail */}
          <path
            d="M18 90 Q30 70 50 50"
            stroke="url(#redTrail)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#vectorGlow)"
          />

          {/* Intercept Collision Flash Point */}
          <circle cx="50" cy="50" r="7" fill="#FFFFFF" filter="url(#vectorGlow)" />
          <circle cx="50" cy="50" r="14" stroke="#00FF66" strokeWidth="1.2" opacity="0.8" />
          <circle cx="50" cy="50" r="22" stroke="#FF3333" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

          {/* Kinetic Sparks */}
          <line x1="50" y1="50" x2="62" y2="40" stroke="#00FF66" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="38" y2="58" stroke="#FF3333" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="58" y2="60" stroke="#FFDD00" strokeWidth="1.5" />
          <line x1="50" y1="50" x2="42" y2="38" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Realistic VETO Interceptor Missile */}
          <g transform="translate(42, 58) rotate(-45)">
            {/* Missile body */}
            <rect x="-4" y="-18" width="8" height="24" rx="2" fill="#E2E8F0" stroke="#FF3333" strokeWidth="1" />
            {/* Fins */}
            <path d="M-8 4 L-4 0 L-4 6 Z" fill="#2C2C34" />
            <path d="M8 4 L4 0 L4 6 Z" fill="#2C2C34" />
            {/* Warhead cone */}
            <path d="M-4 -18 Q0 -25 4 -18 Z" fill="#FF3333" />
            {/* VETO Stencil */}
            <text
              x="0"
              y="-2"
              textAnchor="middle"
              fill="#121212"
              fontSize="5.5"
              fontWeight="900"
              fontFamily="monospace"
              letterSpacing="0.8"
            >
              VETO
            </text>
          </g>
        </svg>
      )}

      {/* Subtle outer neon rim glow */}
      <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-white/10" />
    </div>
  );
};
