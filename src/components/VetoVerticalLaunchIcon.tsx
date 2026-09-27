import React, { useState } from 'react';
import { verticalLaunchImg } from '../assets/images';

interface VetoVerticalLaunchIconProps {
  size?: number;
  className?: string;
  showBadge?: boolean;
}

/**
 * VetoVerticalLaunchIcon:
 * Photorealistic 3D vector app icon inspired by a real tactical ballistic missile vertical launch:
 * 1. Main Subject: Sleek dark military interceptor missile launching vertically upwards from a heavy mobile launcher base.
 * 2. Typography: The text "VETO" stenciled in sharp white high-contrast military lettering along the dark fuselage.
 * 3. Thruster & Explosion: Bottom rocket thruster emits massive dramatic volumetric fire & smoke cloud
 *    glowing intense Red (#FF3333) on pitch-black background (#121212).
 * 4. Interception Geometry: Near the missile tip, a descending target trajectory arc with a subtle Glowing Green (#00FF66)
 *    intersects the missile nosecone at an exact zero-point collision with bright thermal sparks.
 * 5. Aesthetic: High contrast, dark mode UI logo, intense cinematic rim lighting, ultra-realistic military detail, clean and authoritative.
 */
export const VetoVerticalLaunchIcon: React.FC<VetoVerticalLaunchIconProps> = ({
  size = 50,
  className = '',
  showBadge = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#121212] border border-[#2e2e38] shadow-[0_0_24px_rgba(255,51,51,0.35)] shrink-0 flex items-center justify-center select-none group transition-all duration-300 hover:scale-105 hover:border-[#FF3333]/70 ${className}`}
      style={{ width: size, height: size }}
    >
      {!imageError ? (
        <img
          src={verticalLaunchImg}
          alt="VETO Photorealistic 3D Vertical Launch Interceptor Icon"
          className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-110 brightness-105"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Pristine High-Precision Vector Fallback */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="redVolumetricSmoke" cx="50" cy="85" r="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FFAA22" />
              <stop offset="55%" stopColor="#FF3333" />
              <stop offset="85%" stopColor="#4A1818" />
              <stop offset="100%" stopColor="#121212" />
            </radialGradient>
            <linearGradient id="missileShaft" x1="44" y1="40" x2="56" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E2026" />
              <stop offset="50%" stopColor="#3C404E" />
              <stop offset="80%" stopColor="#DCE2ED" />
              <stop offset="100%" stopColor="#1A1C22" />
            </linearGradient>
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background #121212 */}
          <rect width="100" height="100" fill="#121212" />

          {/* Heavy Mobile Launcher Base TEL */}
          <rect x="22" y="86" width="56" height="11" rx="2" fill="#1B1D22" stroke="#383E4B" strokeWidth="1" />
          <line x1="30" y1="92" x2="70" y2="92" stroke="#FF3333" strokeWidth="1" strokeOpacity="0.8" />
          <rect x="25" y="93" width="8" height="4" fill="#0D0E11" />
          <rect x="67" y="93" width="8" height="4" fill="#0D0E11" />

          {/* Massive Volumetric Fire & Exhaust Smoke Cloud Glowing Red #FF3333 */}
          <circle cx="50" cy="83" r="28" fill="url(#redVolumetricSmoke)" opacity="0.95" />
          <ellipse cx="36" cy="81" rx="15" ry="11" fill="#FF3333" opacity="0.65" />
          <ellipse cx="64" cy="81" rx="15" ry="11" fill="#FF3333" opacity="0.65" />

          {/* Rocket Core Thruster Plume */}
          <polygon points="46,72 54,72 58,86 42,86" fill="#FFFFFF" filter="url(#neonGlow)" />
          <polygon points="48,72 52,72 55,84 45,84" fill="#FFEE55" />

          {/* Sleek Vertical Dark Military Missile Body */}
          <rect x="45" y="26" width="10" height="46" rx="2" fill="url(#missileShaft)" stroke="#FF3333" strokeWidth="0.9" />
          
          {/* Aerodynamic Nosecone */}
          <polygon points="45,26 50,12 55,26" fill="#E2E8F0" stroke="#FF3333" strokeWidth="0.8" />
          <polygon points="47,22 50,12 53,22" fill="#FF3333" />

          {/* Tactical Stabilizer / Guidance Fins */}
          <polygon points="45,66 34,74 45,72" fill="#22252C" stroke="#FF3333" strokeWidth="0.8" />
          <polygon points="55,66 66,74 55,72" fill="#22252C" stroke="#FF3333" strokeWidth="0.8" />

          {/* VETO Text Stenciled Vertically in White */}
          <g transform="translate(50, 50) rotate(-90)">
            <text
              x="0"
              y="1.5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="7.5"
              fontWeight="900"
              fontFamily="monospace, sans-serif"
              letterSpacing="1.2"
            >
              VETO
            </text>
          </g>

          {/* Descending Target Trajectory Arc (Subtle Glowing Green #00FF66) */}
          <path
            d="M88 4 Q68 8 50 12"
            stroke="#00FF66"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />
          <line x1="88" y1="4" x2="50" y2="12" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.7" />

          {/* Zero-Point Collision Thermal Sparks at Nosecone Tip (x=50, y=12) */}
          <circle cx="50" cy="12" r="5" fill="#FFFFFF" filter="url(#neonGlow)" />
          <circle cx="50" cy="12" r="2" fill="#00FF66" />
          <line x1="50" y1="12" x2="64" y2="6" stroke="#00FF66" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="12" x2="36" y2="8" stroke="#FF3333" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="12" x2="56" y2="18" stroke="#FFDD00" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )}

      {/* High-tech specular rim & reticle accents */}
      <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-white/15 group-hover:ring-[#FF3333]/60 transition-colors" />

      {showBadge && (
        <span className="absolute bottom-1 right-1 font-mono text-[7px] font-black px-1 rounded bg-[#121212]/90 text-[#FF3333] border border-[#FF3333]/50 backdrop-blur-sm">
          3D·VETO
        </span>
      )}
    </div>
  );
};
