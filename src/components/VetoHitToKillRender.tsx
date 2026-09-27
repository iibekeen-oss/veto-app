import React, { useState } from 'react';

interface VetoHitToKillRenderProps {
  size?: number;
  className?: string;
  showBadge?: boolean;
}

/**
 * VetoHitToKillRender:
 * Photorealistic 3D tactical military missile interception render (Hit-to-Kill):
 * 1. Attacker Missile: Coming down diagonally from upper right with subtle green neon thruster (#00FF66) inside dense smoke trail.
 * 2. VETO Interceptor: Launching diagonally from bottom left with "VETO-0" stenciled in sharp white bold typography,
 *    blazing Glowing Red (#FF3333) fiery flame plume and volumetric exhaust stream.
 * 3. Impact Point: The precise moment of kinetic Hit-to-Kill impact with sharp thermal explosion flash and metallic shrapnel debris sparks.
 * 4. Unreal Engine 5 render style on pitch-black #121212 dark gym background.
 */
export const VetoHitToKillRender: React.FC<VetoHitToKillRenderProps> = ({
  size = 52,
  className = '',
  showBadge = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative rounded-xl overflow-hidden bg-[#121212] border border-[#2e2e34] shadow-[0_0_20px_rgba(255,51,51,0.35)] shrink-0 flex items-center justify-center select-none group transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      {!imageError ? (
        <img
          src="/src/assets/images/veto_hit_to_kill_1790354505467.jpg"
          alt="VETO-0 Hit-to-Kill Tactical Interception"
          className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-110 brightness-105"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Fallback high-contrast vector composition */
        <div className="w-full h-full bg-[#121212] flex items-center justify-center font-mono text-[10px] text-[#FF3333] font-bold">
          VETO-0 HIT
        </div>
      )}

      {/* Subtle outer neon green/red hybrid specular rim */}
      <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-white/15 group-hover:ring-[#FF3333]/60 transition-colors" />

      {showBadge && (
        <span className="absolute bottom-1 right-1 font-mono text-[8px] font-black px-1 rounded bg-black/80 text-[#00FF66] border border-[#00FF66]/40 backdrop-blur-sm">
          HTK
        </span>
      )}
    </div>
  );
};
