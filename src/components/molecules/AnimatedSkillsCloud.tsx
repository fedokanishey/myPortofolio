"use client";

import React, { useState } from "react";
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

  // Duplicate for seamless 50% translation infinite loop
  const duplicatedSkills = React.useMemo(() => {
    if (!skills || skills.length === 0) return [];
    return [...skills, ...skills];
  }, [skills]);

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
        /* CSS GPU-Accelerated Hardware Marquee Track */
        <div
          className="relative w-full mask-marquee overflow-hidden py-2 select-none"
        >
          <div className="flex w-max items-center gap-3 animate-marquee-track">
            {duplicatedSkills.map((skill, index) => (
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

