"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Layout,
  Server,
  Database,
  Cloud,
  Smartphone,
  Code2,
  Wrench,
  Sparkles,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillIcon, getSkillCategory } from "@/components/molecules/SkillSearchInput";
import { cn } from "@/lib/utils";

interface AnimatedSkillsCloudProps {
  skills: string[];
  primaryColor?: string;
  secondaryColor?: string;
}

// Category meta config with icons
const CATEGORY_META: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  Languages: { label: "Languages", icon: Code2 },
  Frontend: { label: "Frontend & UI", icon: Layout },
  Backend: { label: "Backend & APIs", icon: Server },
  Database: { label: "Database & Storage", icon: Database },
  "Cloud & DevOps": { label: "Cloud & DevOps", icon: Cloud },
  Mobile: { label: "Mobile Apps", icon: Smartphone },
  Tools: { label: "Tools & Utilities", icon: Wrench },
  Design: { label: "Design & UX", icon: Sparkles },
  Testing: { label: "Testing & QA", icon: Wrench },
  "Other & Core": { label: "Core & Other", icon: Layers },
};

export function AnimatedSkillsCloud({
  skills,
  primaryColor = "#6366F1",
  secondaryColor = "#EC4899",
}: AnimatedSkillsCloudProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Duplicate for seamless 50% translation infinite marquee loop
  const duplicatedSkills = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    return [...skills, ...skills];
  }, [skills]);

  // Group user skills by Core Category
  const groupedSkills = useMemo(() => {
    if (!skills || skills.length === 0) return {};
    const groups: Record<string, string[]> = {};

    skills.forEach((skill) => {
      const cat = getSkillCategory(skill);
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(skill);
    });

    return groups;
  }, [skills]);

  // Available categories list based on user's actual skills
  const availableCategories = useMemo(() => {
    const keys = Object.keys(groupedSkills);
    // Custom priority ordering
    const priority = [
      "Frontend",
      "Backend",
      "Languages",
      "Database",
      "Cloud & DevOps",
      "Mobile",
      "Tools",
      "Design",
      "Testing",
      "Other & Core",
    ];
    return keys.sort((a, b) => {
      const idxA = priority.indexOf(a);
      const idxB = priority.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [groupedSkills]);

  if (!skills || skills.length === 0) return null;

  return (
    <div className="space-y-3.5 w-full overflow-hidden">
      {/* Header Row: Title & See All Toggle */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-muted-foreground dark:text-zinc-400 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Core Technologies &amp; Stack</span>
        </div>

        {/* See All / See Less Toggle Button */}
        <button
          type="button"
          onClick={() => {
            setIsExpanded((prev) => !prev);
            if (isExpanded) setSelectedCategory("All");
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all shadow-xs cursor-pointer select-none"
        >
          {isExpanded ? (
            <>
              <span>Collapse View</span>
              <ChevronUp className="h-3.5 w-3.5 text-primary" />
            </>
          ) : (
            <>
              <span>See All by Core ({skills.length})</span>
              <ChevronDown className="h-3.5 w-3.5 text-primary" />
            </>
          )}
        </button>
      </div>

      {/* Expanded Categorized View */}
      {isExpanded ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-4 pt-1 w-full"
        >
          {/* Category Filter Pills */}
          {availableCategories.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5",
                  selectedCategory === "All"
                    ? "text-white shadow-sm font-bold"
                    : "border border-border/70 dark:border-white/10 bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                style={
                  selectedCategory === "All"
                    ? {
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }
                    : undefined
                }
              >
                <span>All Cores</span>
                <span className="text-[10px] opacity-80">({skills.length})</span>
              </button>

              {availableCategories.map((cat) => {
                const count = groupedSkills[cat]?.length || 0;
                const isSelected = selectedCategory === cat;
                const Meta = CATEGORY_META[cat] || {
                  label: cat,
                  icon: Layers,
                };
                const Icon = Meta.icon;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5",
                      isSelected
                        ? "text-white shadow-sm font-bold"
                        : "border border-border/70 dark:border-white/10 bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    style={
                      isSelected
                        ? {
                            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                          }
                        : undefined
                    }
                  >
                    <Icon className="h-3 w-3" />
                    <span>{Meta.label}</span>
                    <span className="text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Categorized Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {availableCategories
              .filter((cat) => selectedCategory === "All" || selectedCategory === cat)
              .map((cat) => {
                const catSkills = groupedSkills[cat] || [];
                const Meta = CATEGORY_META[cat] || {
                  label: cat,
                  icon: Layers,
                };
                const Icon = Meta.icon;

                return (
                  <div
                    key={cat}
                    className="p-4 rounded-2xl border border-border/80 dark:border-white/10 bg-card/70 dark:bg-white/[0.02] backdrop-blur-md shadow-xs space-y-3 transition-all hover:border-primary/40"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-border/50 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-white"
                          style={{
                            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                          }}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-foreground">
                          {Meta.label}
                        </span>
                      </div>
                      <span
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${primaryColor}15`,
                          color: primaryColor,
                        }}
                      >
                        {catSkills.length} {catSkills.length === 1 ? "Skill" : "Skills"}
                      </span>
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {catSkills.map((skill) => (
                        <div
                          key={skill}
                          className="relative group flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/80 dark:border-white/[0.08] bg-background/80 dark:bg-[#0c1017]/90 shadow-2xs transition-all duration-200 hover:border-primary/50 hover:shadow-[0_4px_16px_rgba(99,102,241,0.15)] hover:-translate-y-[1px]"
                        >
                          <div className="h-4.5 w-4.5 rounded-md bg-muted dark:bg-white/[0.08] flex items-center justify-center">
                            <SkillIcon name={skill} size={12} color="currentColor" />
                          </div>
                          <span className="text-xs font-semibold text-foreground dark:text-zinc-100 group-hover:text-primary transition-colors">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      ) : (
        /* CSS GPU-Accelerated Hardware Marquee Track */
        <div className="relative w-full mask-marquee overflow-hidden py-2 select-none">
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
