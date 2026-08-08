"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const brands = [
  "NEXT.JS",
  "REACT 19",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "GSAP MOTION",
  "VERCEL EDGE",
  "TURBOPACK",
  "PRISMA",
];

export const SocialProof = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = marqueeRef.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = el.querySelector(".marquee-track");
      if (!items) return;

      gsap.to(items, {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
      });
    },
    { scope: marqueeRef }
  );

  return (
    <section className="relative py-12 border-y border-border/70 dark:border-white/[0.06] bg-muted/30 dark:bg-[#070a10] overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest font-mono text-muted-foreground font-semibold">
          Powering portfolios for creators & engineers across modern stacks
        </p>
      </div>

      <div ref={marqueeRef} className="relative w-full mask-marquee overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-12 sm:gap-20 will-change-transform">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/50" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider opacity-70 hover:opacity-100 transition-opacity">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
