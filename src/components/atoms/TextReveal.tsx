"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnScroll?: boolean;
}

export const TextReveal = ({
  children,
  as: Component = "div",
  delay = 0,
  duration = 0.9,
  className = "",
  triggerOnScroll = false,
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = textRef.current;
      const triggerEl = containerRef.current;
      if (!el || !triggerEl || typeof window === "undefined") return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        el,
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power4.out",
          scrollTrigger: triggerOnScroll
            ? {
                trigger: triggerEl,
                start: "top 85%",
                once: true,
              }
            : undefined,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    // @ts-expect-error dynamic component type
    <Component ref={containerRef} className={`overflow-hidden ${className}`}>
      <span ref={textRef} className="block will-change-transform">
        {children}
      </span>
    </Component>
  );
};
