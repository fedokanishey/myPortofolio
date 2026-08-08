"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || typeof window === "undefined") return;
    if (
      window.matchMedia("(max-width: 1024px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0, x: -500, y: -500 });

    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);

      const target = e.target as HTMLElement | null;
      const isCard = target?.closest("[data-cursor='explore']");

      if (isCard) {
        if (!isVisible) {
          isVisible = true;
          gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
        }
      } else {
        if (isVisible) {
          isVisible = false;
          gsap.to(cursor, { opacity: 0, scale: 0.4, duration: 0.2, ease: "power2.in" });
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="global-cursor-follower"
      className="pointer-events-none fixed top-0 left-0 z-[999] hidden lg:flex items-center justify-center rounded-full bg-white text-zinc-950 text-[10px] font-bold font-mono px-3 py-1 shadow-[0_0_25px_rgba(255,255,255,0.6)] opacity-0 scale-0 will-change-transform"
    >
      EXPLORE ↗
    </div>
  );
}
