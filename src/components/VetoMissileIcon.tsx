import React from 'react';

interface VetoMissileIconProps {
  className?: string;
  size?: number;
}

/**
 * Custom Vector Canvas Icon:
 * Sleek, high-tech Interceptor Missile (representing VETO / Objection)
 * - Angled upwards (~45 degrees)
 * - "VETO" text stenciled along the side of the missile body in bold high-contrast text
 * - Blazing glowing flame / jet propulsion trail out of tail in Glowing Red (#FF3333) with amber/white core
 * - Subtle Neon Green (#00FF66) aura / outline glow behind missile body for high contrast on #121212
 */
export const VetoMissileIcon: React.FC<VetoMissileIconProps> = ({
  className = '',
  size = 40,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-visible ${className}`}
    >
      <defs>
        {/* Neon Green Aura Filter */}
        <filter id="vetoNeonAura" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Blazing Red Jet Thruster Flame Glow Filter */}
        <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="glow" />
          <feColorMatrix
            in="glow"
            type="matrix"
            values="0 0 0 0 1   0 0 0 0 0.2   0 0 0 0 0.2  0 0 0 1 0"
            result="coloredGlow"
          />
          <feMerge>
            <feMergeNode in="coloredGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Linear Gradients for Missile Body */}
        <linearGradient id="missileHull" x1="20" y1="80" x2="80" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1E22" />
          <stop offset="35%" stopColor="#2A2A30" />
          <stop offset="70%" stopColor="#3F3F48" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>

        <linearGradient id="warheadTip" x1="68" y1="32" x2="88" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#26262B" />
          <stop offset="60%" stopColor="#FF3333" />
          <stop offset="100%" stopColor="#FF6666" />
        </linearGradient>

        <linearGradient id="finShade" x1="25" y1="75" x2="35" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F0F12" />
          <stop offset="100%" stopColor="#2C2C34" />
        </linearGradient>

        {/* Thruster Jet Flame Gradients */}
        <linearGradient id="primaryJetFlame" x1="32" y1="68" x2="4" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FFDD00" />
          <stop offset="55%" stopColor="#FF3333" />
          <stop offset="100%" stopColor="rgba(255, 51, 51, 0)" />
        </linearGradient>

        <linearGradient id="sideJetFlame" x1="30" y1="70" x2="10" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF9900" />
          <stop offset="60%" stopColor="#FF3333" />
          <stop offset="100%" stopColor="rgba(255, 51, 51, 0)" />
        </linearGradient>

        {/* Radar Ring Glow Gradient */}
        <radialGradient id="neonHalo" cx="50" cy="50" r="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0, 255, 102, 0.08)" />
          <stop offset="65%" stopColor="rgba(0, 255, 102, 0.22)" />
          <stop offset="100%" stopColor="rgba(0, 255, 102, 0)" />
        </radialGradient>
      </defs>

      {/* 1. Subtle Neon Green Aura / Outline Ring behind missile */}
      <circle cx="50" cy="50" r="46" fill="url(#neonHalo)" />
      
      {/* Dynamic green targeting grid marks / radar ticks */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="#00FF66"
        strokeWidth="1.2"
        strokeDasharray="4 12"
        strokeOpacity="0.45"
      />

      {/* 2. Blazing Glowing Flame / Jet Propulsion Trail (#FF3333) */}
      <g filter="url(#flameGlow)">
        {/* Outer wide exhaust plume */}
        <path
          d="M32 64 C25 67 15 76 6 94 C12 86 16 80 22 76 C20 83 14 91 10 98 C18 90 24 82 28 78 C25 86 21 95 16 102 C26 92 31 82 34 74 Z"
          fill="#FF3333"
          opacity="0.85"
        />

        {/* Primary central high-energy flame thrust */}
        <path
          d="M33 63 L14 90 C18 84 21 80 25 77 L17 97 C24 87 29 80 32 75 L22 101 C30 89 36 78 37 67 Z"
          fill="url(#primaryJetFlame)"
        />

        {/* Secondary inner hyper-core flame needle */}
        <path
          d="M34 65 L22 84 C25 79 28 76 30 73 L26 90 C31 81 35 74 36 68 Z"
          fill="#FFFFFF"
          opacity="0.95"
        />

        {/* Burning micro sparks / particle pulses */}
        <circle cx="16" cy="94" r="1.5" fill="#FFDD00" />
        <circle cx="9" cy="85" r="1.2" fill="#FF3333" />
        <circle cx="21" cy="100" r="1" fill="#FFFFFF" />
      </g>

      {/* 3. Missile Neon Green Silhouette Aura Glow */}
      <g filter="url(#vetoNeonAura)" opacity="0.9">
        <path
          d="M30 68 L24 74 L25 81 L33 76 L40 70 L72 38 C79 31 86 20 88 12 C80 14 69 21 62 28 L30 60 L24 68 Z"
          stroke="#00FF66"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 4. Missile Structure & Hull */}
      {/* Rear Lower Guidance Fin */}
      <path
        d="M27 67 L16 76 L22 84 L31 75 Z"
        fill="url(#finShade)"
        stroke="#00FF66"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      {/* Rear Upper Guidance Fin */}
      <path
        d="M33 61 L24 50 L32 44 L41 53 Z"
        fill="url(#finShade)"
        stroke="#00FF66"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />

      {/* Thruster Nozzle Exhaust Bell */}
      <path
        d="M30 70 L25 65 L28 62 L33 67 Z"
        fill="#111114"
        stroke="#FF3333"
        strokeWidth="1.5"
      />

      {/* Main Fuselage Body (Angled 45 degrees towards top-right) */}
      <path
        d="M30 66 L64 32 L73 23 C79 17 84 13 88 12 C87 16 83 21 77 27 L68 36 L34 70 Z"
        fill="url(#missileHull)"
        stroke="#00FF66"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Warhead Tip in High-Contrast Glowing Crimson */}
      <path
        d="M73 23 C79 17 84 13 88 12 C87 16 83 21 77 27 Z"
        fill="url(#warheadTip)"
        stroke="#FF3333"
        strokeWidth="1"
      />
      {/* Warhead needle tip highlight */}
      <line x1="88" y1="12" x2="84" y2="16" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

      {/* Fuselage Spine Highlight Line */}
      <line
        x1="34"
        y1="64"
        x2="70"
        y2="28"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeOpacity="0.65"
      />

      {/* 5. "VETO" Text Clearly Stenciled Along the Fuselage Side */}
      {/* Rotate text exactly along the missile trajectory (angle -45deg at fuselage center) */}
      <g transform="translate(50, 50) rotate(-45)">
        {/* High-contrast drop shadow backing for readability */}
        <text
          x="0"
          y="2.5"
          textAnchor="middle"
          fill="#000000"
          fontSize="12.5"
          fontWeight="900"
          fontFamily="monospace, system-ui, sans-serif"
          letterSpacing="2.5"
        >
          VETO
        </text>
        {/* Bold crisp white stencil text */}
        <text
          x="0"
          y="1.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="900"
          fontFamily="monospace, system-ui, sans-serif"
          letterSpacing="2.5"
        >
          VETO
        </text>
      </g>

      {/* Mid-fuselage forward canard wings for aerodynamic interceptor look */}
      <path
        d="M52 48 L46 40 L50 38 L57 43 Z"
        fill="#2A2A32"
        stroke="#00FF66"
        strokeWidth="0.8"
      />
      <path
        d="M48 52 L40 58 L38 54 L43 47 Z"
        fill="#1E1E24"
        stroke="#00FF66"
        strokeWidth="0.8"
      />

      {/* Thruster burn ring highlight */}
      <ellipse
        cx="31"
        cy="69"
        rx="2.5"
        ry="4"
        transform="rotate(-45 31 69)"
        fill="#FF3333"
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />
    </svg>
  );
};
