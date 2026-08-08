"use client";

import React from "react";

interface PersistentOrbsProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export function PersistentOrbs({
  primaryColor = "#6366F1",
  secondaryColor = "#8B5CF6",
}: PersistentOrbsProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none will-change-transform"
      style={{ contain: "strict" }}
    >
      {/* Primary Ambient Drifting Orb (Top-Left) - Baked Radial Gradient (Zero CPU/GPU Blur overhead) */}
      <div
        className="absolute -top-20 -left-20 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full animate-orb-primary will-change-transform"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}40 0%, ${primaryColor}22 30%, ${primaryColor}08 55%, transparent 72%)`,
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Secondary Ambient Drifting Orb (Center-Right) */}
      <div
        className="absolute top-[30%] -right-28 w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full animate-orb-secondary will-change-transform"
        style={{
          background: `radial-gradient(circle at center, ${secondaryColor}38 0%, ${secondaryColor}18 35%, ${secondaryColor}06 60%, transparent 72%)`,
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Tertiary Soft Center Stage Light */}
      <div
        className="absolute top-[65%] left-[15%] w-[450px] h-[450px] rounded-full animate-orb-primary will-change-transform"
        style={{
          background: `radial-gradient(circle at center, ${primaryColor}30 0%, ${primaryColor}12 40%, transparent 70%)`,
          transform: "translate3d(0,0,0)",
          animationDelay: "-18s",
        }}
      />

      {/* Quaternary Bottom Orb */}
      <div
        className="absolute bottom-[-80px] right-[10%] w-[450px] h-[450px] rounded-full animate-orb-secondary will-change-transform"
        style={{
          background: `radial-gradient(circle at center, ${secondaryColor}30 0%, ${secondaryColor}10 40%, transparent 70%)`,
          transform: "translate3d(0,0,0)",
          animationDelay: "-10s",
        }}
      />
    </div>
  );
}
