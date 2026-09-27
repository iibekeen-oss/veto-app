import React from 'react';

interface VetoInterceptorDesignCanvasProps {
  size?: number;
  className?: string;
  showDetails?: boolean;
}

/**
 * VetoInterceptorDesignCanvas:
 * Web React + SVG equivalent of the exact Jetpack Compose `VetoInterceptorDesign` canvas:
 * - Color definitions: DeepNeonGreen (0xAA00FF66), BlazingRed (0xFFFF3333), PitchBlack (#121212)
 * 1. drawRadarGrid(): CAD blueprint grid lines with gray.copy(alpha = 0.3)
 * 2. drawTargetTrajectory(): Parabolic curve from upper-right (0.9w, 0h) to intercept point (0.5w, 0.6h)
 * 3. drawInterceptorWithVetoText():
 *    - Red thruster smoke plume at (0.1w, 0.95h)
 *    - PAC-3 interceptor body circle & shaft
 *    - "VETO" text rotated at -45 degrees in bold white stencil typography
 */
export const VetoInterceptorDesignCanvas: React.FC<VetoInterceptorDesignCanvasProps> = ({
  size = 50,
  className = '',
  showDetails = false,
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#121212] border border-[#2e2e38] shadow-[0_0_22px_rgba(255,51,51,0.35)] shrink-0 flex items-center justify-center select-none group transition-all duration-300 hover:scale-105 hover:border-[#FF3333]/70 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="vetoDesignGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pitch-Black Background (0xFF121212) */}
        <rect width="100" height="100" fill="#121212" />

        {/* 1. Radar Grid (drawRadarGrid) */}
        <line x1="0" y1="20" x2="100" y2="20" stroke="gray" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="gray" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="gray" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="gray" strokeWidth="0.8" strokeOpacity="0.3" />

        <line x1="25" y1="0" x2="25" y2="100" stroke="gray" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="gray" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="75" y1="0" x2="75" y2="100" stroke="gray" strokeWidth="0.8" strokeOpacity="0.3" />

        {/* 2. Target Trajectory (drawTargetTrajectory) */}
        {/* Parabolic cubic curve from (0.9w, 0) -> (0.8w, 0.3h) -> (0.6w, 0.5h) -> (0.5w, 0.6h) */}
        <path
          d="M90 0 C80 30, 60 50, 50 60"
          stroke="rgba(0, 255, 102, 0.85)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          filter="url(#vetoDesignGlow)"
        />

        {/* 3. VETO Interceptor (drawInterceptorWithVetoText) */}
        {/* Ascent line from start (0.1w, 1.0h) to intercept (0.5w, 0.6h) */}
        <line
          x1="10"
          y1="100"
          x2="50"
          y2="60"
          stroke="#FF3333"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#vetoDesignGlow)"
        />

        {/* Flame Plume: circle at startX=10, startY-20dp ~ y=90 */}
        <circle cx="10" cy="90" r="16" fill="#FF3333" fillOpacity="0.8" filter="url(#vetoDesignGlow)" />
        <circle cx="10" cy="90" r="8" fill="#FFAA00" fillOpacity="0.9" />

        {/* Missile Body Circle: radius 8dp at center (startX, startY - interceptorHeight/2) */}
        <circle cx="26" cy="84" r="5" fill="#FF3333" />
        <polygon points="46,56 50,60 54,64 48,68" fill="#FFFFFF" />

        {/* VETO text rotated -45 deg along interceptor axis */}
        <g transform="translate(30, 80) rotate(-45)">
          {/* Shadow */}
          <text
            x="0"
            y="1"
            fill="#000000"
            fontSize="9"
            fontWeight="900"
            fontFamily="monospace, system-ui, sans-serif"
            letterSpacing="0.8"
          >
            VETO
          </text>
          {/* Main White Text */}
          <text
            x="0"
            y="0"
            fill="#FFFFFF"
            fontSize="9"
            fontWeight="900"
            fontFamily="monospace, system-ui, sans-serif"
            letterSpacing="0.8"
          >
            VETO
          </text>
        </g>

        {/* Kinetic Zero-Point Interception Flash at (50, 60) */}
        <circle cx="50" cy="60" r="4" fill="#FFFFFF" filter="url(#vetoDesignGlow)" />
        <circle cx="50" cy="60" r="1.5" fill="#FFEE00" />
        <line x1="50" y1="60" x2="42" y2="52" stroke="#00FF66" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="50" y1="60" x2="58" y2="68" stroke="#FF3333" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      {/* Subtle border ring */}
      <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-white/10 group-hover:ring-[#FF3333]/50 transition-colors" />

      {showDetails && (
        <span className="absolute bottom-1 right-1 font-mono text-[7px] font-black px-1 rounded bg-[#121212]/90 text-[#00FF66] border border-[#00FF66]/40 backdrop-blur-sm">
          COMPOSE
        </span>
      )}
    </div>
  );
};
