"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  asChild?: boolean;
}

export const MagneticButton = ({
  children,
  strength = 24,
  className = "",
  ...props
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const el = buttonRef.current;
      if (!el || typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const handleMouseMove = (e: MouseEvent) => {
        const bounds = el.getBoundingClientRect();
        const x = e.clientX - (bounds.left + bounds.width / 2);
        const y = e.clientY - (bounds.top + bounds.height / 2);

        gsap.to(el, {
          x: x * (strength / 100),
          y: y * (strength / 100),
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1.1, 0.4)",
        });
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: buttonRef }
  );

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center transition-transform will-change-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
