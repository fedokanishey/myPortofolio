"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SkillIcon } from "@/components/molecules/SkillSearchInput";

interface AnimatedSkillsCloudProps {
  skills: string[];
  primaryColor?: string;
  secondaryColor?: string;
}

export function AnimatedSkillsCloud({
  skills,
  primaryColor = "#6366F1",
}: AnimatedSkillsCloudProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isHoveredRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  // Repeat skills 4x to ensure smooth continuous scrolling for any screen width
  const infiniteSkills = React.useMemo(() => {
    if (!skills || skills.length === 0) return [];
    return [...skills, ...skills, ...skills, ...skills];
  }, [skills]);

  // RequestAnimationFrame continuous smooth marquee loop
  const stepMarquee = useCallback(() => {
    const el = scrollRef.current;
    if (el && !isHoveredRef.current && !isDraggingRef.current && !isExpanded) {
      // Advance scroll position smoothly
      el.scrollLeft += 0.75;

      // Loop back seamlessly when halfway through
      const maxScroll = el.scrollWidth / 2;
      if (el.scrollLeft >= maxScroll) {
        el.scrollLeft = 0;
      }
    }
    animFrameIdRef.current = requestAnimationFrame(stepMarquee);
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    animFrameIdRef.current = requestAnimationFrame(stepMarquee);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [stepMarquee, isExpanded]);

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  if (!skills || skills.length === 0) return null;

  return (
    <div className="space-y-3 w-full overflow-hidden">
      {/* Header Row: Title & See All Toggle */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-muted-foreground dark:text-zinc-400 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Core Technologies &amp; Stack</span>
        </div>

        {/* See All / See Less Toggle Button */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all shadow-xs cursor-pointer select-none"
        >
          {isExpanded ? (
            <>
              <span>See Less</span>
              <ChevronUp className="h-3.5 w-3.5 text-primary" />
            </>
          ) : (
            <>
              <span>See All ({skills.length})</span>
              <ChevronDown className="h-3.5 w-3.5 text-primary" />
            </>
          )}
        </button>
      </div>

      {/* Expanded Static View */}
      {isExpanded ? (
        <div className="flex flex-wrap items-center gap-2.5 py-2 w-full animate-in fade-in duration-300">
          {skills.map((skill) => (
            <div
              key={skill}
              className="relative group cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/80 dark:border-white/[0.1] bg-card/90 dark:bg-[#0c1017]/90 shadow-xs transition-all duration-200 hover:border-primary/50 hover:shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:-translate-y-[2px]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 dark:via-white/20 to-transparent" />
              <div className="h-5 w-5 rounded-md bg-muted dark:bg-white/[0.08] flex items-center justify-center">
                <SkillIcon name={skill} size={13} color="currentColor" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-foreground dark:text-zinc-100 group-hover:text-primary transition-colors">
                {skill}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ background: primaryColor }}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Draggable & Infinite Scrolling Marquee Track */
        <div
          ref={scrollRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            handleMouseUpOrLeave();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className="relative w-full mask-marquee overflow-x-auto scrollbar-none py-2 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-max items-center gap-3">
            {infiniteSkills.map((skill, index) => (
              <div
                key={`${skill}-${index}`}
                className="relative group cursor-pointer flex-none pointer-events-auto"
              >
                <div className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-border/80 dark:border-white/[0.1] bg-card/90 dark:bg-[#0c1017]/90 shadow-xs transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-[0_4px_20px_rgba(99,102,241,0.2)] group-hover:-translate-y-[2px] group-hover:scale-[1.03]">
                  {/* Top highlight */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 dark:via-white/20 to-transparent" />

                  {/* Skill Icon */}
                  <div className="h-5 w-5 rounded-md bg-muted dark:bg-white/[0.08] flex items-center justify-center transition-transform group-hover:scale-110">
                    <SkillIcon name={skill} size={13} color="currentColor" />
                  </div>

                  {/* Skill Name */}
                  <span className="text-xs sm:text-sm font-semibold text-foreground dark:text-zinc-100 group-hover:text-primary transition-colors whitespace-nowrap">
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
      )}
    </div>
  );
}

