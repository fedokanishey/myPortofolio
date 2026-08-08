"use client";

import React, { useMemo } from "react";

interface FloatingParticlesProps {
  count?: number;
  primaryColor?: string;
}

export function FloatingParticles({
  count = 28,
  primaryColor = "#6366F1",
}: FloatingParticlesProps) {
  // Deterministic particle positions for SSR consistency
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 17) % 94 + 3}%`,
      top: `${(i * 23) % 92 + 4}%`,
      size: (i % 3) + 2.5,
      duration: 14 + (i % 10) * 2,
      delay: (i % 8) * -2,
      opacity: 0.45 + (i % 4) * 0.15,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: primaryColor,
            boxShadow: `0 0 ${p.size * 4}px ${primaryColor}`,
            opacity: p.opacity,
            animation: `particle-rise ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
