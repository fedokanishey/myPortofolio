"use client";

import React from "react";

interface PersistentGridSystemProps {
  primaryColor?: string;
}

export function PersistentGridSystem({ primaryColor = "#6366F1" }: PersistentGridSystemProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-60 dark:opacity-40"
      style={{ contain: "strict" }}
    >
      {/* Panning Engineering Dot & Line Matrix */}
      <div
        className="absolute -inset-20 w-[140%] h-[140%] animate-grid-drift"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.14) 1.2px, transparent 0),
            linear-gradient(to right, hsl(var(--foreground) / 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 64px 64px, 64px 64px",
        }}
      />

      {/* Radial Vignette Mask */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/70"
        style={{
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black 20%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black 20%, transparent 95%)",
        }}
      />
    </div>
  );
}
