"use client";

import React from "react";
import { NoiseOverlay } from "./NoiseOverlay";
import { PersistentGridSystem } from "./PersistentGridSystem";
import { PersistentOrbs } from "./PersistentOrbs";
import { FloatingParticles } from "./FloatingParticles";

interface PersistentBackgroundSystemProps {
  primaryColor?: string;
  secondaryColor?: string;
  showGrid?: boolean;
  showParticles?: boolean;
  showOrbs?: boolean;
  showNoise?: boolean;
}

export function PersistentBackgroundSystem({
  primaryColor = "#6366F1",
  secondaryColor = "#8B5CF6",
  showGrid = true,
  showParticles = true,
  showOrbs = true,
  showNoise = true,
}: PersistentBackgroundSystemProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
    >
      {/* Layer 2: Deep Ambient Floating Gradient Orbs (Slow 36s-42s Drift) */}
      {showOrbs && (
        <PersistentOrbs
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      )}

      {/* Layer 4: Technical Blueprint Panning Dot Matrix Grid */}
      {showGrid && (
        <PersistentGridSystem primaryColor={primaryColor} />
      )}

      {/* Layer 3: Subtle Rising & Twinkling Stardust Particles */}
      {showParticles && (
        <FloatingParticles
          count={24}
          primaryColor={primaryColor}
        />
      )}

      {/* Layer 5: Ultra-Subtle Film Grain Noise Texture */}
      {showNoise && <NoiseOverlay />}
    </div>
  );
}
