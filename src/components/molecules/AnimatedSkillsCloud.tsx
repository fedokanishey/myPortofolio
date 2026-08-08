"use client";

import React, { useRef } from "react";
import { SkillIcon } from "@/components/molecules/SkillSearchInput";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface AnimatedSkillsCloudProps {
  skills: string[];
  primaryColor?: string;
  secondaryColor?: string;
}

export function AnimatedSkillsCloud({
  skills,
  primaryColor = "#6366F1",
}: AnimatedSkillsCloudProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const container = marqueeRef.current;
      if (!container || typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const track = container.querySelector<HTMLElement>(".skills-marquee-track");
      if (!track) return;

      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: Math.max(16, skills.length * 2.8),
        ease: "none",
      });
    },
    { scope: marqueeRef, dependencies: [skills] }
  );

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });
    }
  };

  if (!skills || skills.length === 0) return null;

  // Double skills array for seamless infinite looping (was 4x — unnecessary)
  const infiniteSkills = [...skills, ...skills];

  return (
    <div className="space-y-3 w-full overflow-hidden">
      <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-muted-foreground dark:text-zinc-400 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Core Technologies &amp; Stack</span>
      </div>

      {/* Infinite Scrolling Marquee with Edge Fade Masks */}
      <div
        ref={marqueeRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full mask-marquee overflow-hidden py-2"
      >
        <div className="skills-marquee-track flex w-max items-center gap-3">
          {infiniteSkills.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="relative group cursor-pointer flex-none"
            >
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-border/80 dark:border-white/[0.1] bg-card/90 dark:bg-[#0c1017]/90 shadow-sm transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-[0_4px_20px_rgba(99,102,241,0.2)] group-hover:-translate-y-[3px] group-hover:scale-[1.05]">
                {/* Top highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 dark:via-white/20 to-transparent" />

                {/* Skill Icon */}
                <div className="h-5 w-5 rounded-md bg-muted dark:bg-white/[0.08] flex items-center justify-center transition-transform group-hover:scale-110">
                  <SkillIcon name={skill} size={13} color="currentColor" />
                </div>

                {/* Skill Name */}
                <span className="text-xs sm:text-sm font-semibold text-foreground dark:text-zinc-100 group-hover:text-primary transition-colors">
                  {skill}
                </span>

                {/* Indicator Dot */}
                <span
                  className="h-1.5 w-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ background: primaryColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

