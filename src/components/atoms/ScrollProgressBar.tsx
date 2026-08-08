"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = barRef.current;
      if (!el || typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(el, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });
    },
    { scope: barRef }
  );

  return (
    <div className="fixed top-0 inset-x-0 z-[100] h-[3px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 origin-left scale-x-0 will-change-transform shadow-[0_0_8px_rgba(99,102,241,0.6)]"
      />
    </div>
  );
}
