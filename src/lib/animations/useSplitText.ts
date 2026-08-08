"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextOptions {
  type?: "chars" | "words" | "lines";
  triggerOnScroll?: boolean;
  delay?: number;
  duration?: number;
}

export function useSplitText<T extends HTMLElement = HTMLElement>(options: SplitTextOptions = {}) {
  const textRef = useRef<T | null>(null);

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el || typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitType(el, {
        types: options.type || "words,chars",
        tagName: "span",
      });

      const targetElements =
        options.type === "chars"
          ? split.chars
          : options.type === "lines"
          ? split.lines
          : split.words;

      if (targetElements && targetElements.length > 0) {
        gsap.fromTo(
          targetElements,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: options.duration || 0.85,
            stagger: options.type === "chars" ? 0.015 : 0.04,
            ease: "power4.out",
            delay: options.delay || 0,
            scrollTrigger: options.triggerOnScroll
              ? {
                  trigger: el,
                  start: "top 85%",
                  once: true,
                }
              : undefined,
          }
        );
      }

      return () => {
        split.revert();
      };
    },
    { scope: textRef }
  );

  return textRef;
}
