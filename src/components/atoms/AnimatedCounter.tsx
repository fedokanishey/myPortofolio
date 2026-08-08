"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter = ({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
  className = "",
}: AnimatedCounterProps) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = countRef.current;
      if (!el || typeof window === "undefined") return;

      const obj = { val: 0 };

      gsap.to(obj, {
        val: end,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          if (el) {
            el.innerText = `${prefix}${obj.val.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}${suffix}`;
          }
        },
      });
    },
    { scope: countRef }
  );

  return (
    <span
      ref={countRef}
      className={`font-mono tabular-nums font-bold tracking-tight ${className}`}
    >
      {prefix}0{suffix}
    </span>
  );
};
