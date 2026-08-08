"use client";

import React, { useState, useRef } from "react";
import { SpotlightCard } from "@/components/atoms/SpotlightCard";
import { TextReveal } from "@/components/atoms/TextReveal";
import {
  Palette,
  Zap,
  Globe2,
  Share2,
  Sparkles,
  Layers,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const themeOptions = [
  { id: "dark", label: "Obsidian Slate", bg: "bg-[#0b0f17]", border: "border-indigo-500/40", accent: "text-indigo-400" },
  { id: "cyber", label: "Cyber Violet", bg: "bg-[#130d22]", border: "border-purple-500/40", accent: "text-purple-400" },
  { id: "emerald", label: "Matrix Emerald", bg: "bg-[#071612]", border: "border-emerald-500/40", accent: "text-emerald-400" },
];

export const BentoFeatures = () => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".bento-card-item");
      if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        cards,
        {
          y: 40,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="features" ref={containerRef} className="py-28 md:py-36 relative bg-background dark:bg-[#07090e] transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-xs font-mono">
            <Layers className="h-3.5 w-3.5" /> ARCHITECTURAL CAPABILITIES
          </div>
          <TextReveal as="h2" triggerOnScroll className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Built for creators who obsess over details.
          </TextReveal>
          <TextReveal as="p" triggerOnScroll delay={0.15} className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Everything you need to showcase high-impact work with zero design friction.
          </TextReveal>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Interactive Theme Engine (2 Cols) */}
          <div className="bento-card-item md:col-span-2">
            <SpotlightCard className="h-full flex flex-col justify-between" spotlightColor="rgba(99, 102, 241, 0.22)">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                    <Palette className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted/60 dark:bg-white/[0.04] text-muted-foreground border border-border/60 dark:border-white/[0.06]">
                    Interactive Sandbox
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Dynamic Theme Architecture</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Switch instantly between carefully calibrated palettes designed with optical contrast and typography rhythm.
                </p>

                {/* Theme Selector Controls */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {themeOptions.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTheme(idx)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 font-mono flex items-center gap-1.5 ${
                        selectedTheme === idx
                          ? `${t.border} bg-primary/10 dark:bg-white/[0.08] text-foreground font-semibold shadow-xs`
                          : "border-border/60 dark:border-white/[0.06] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${t.accent.replace("text-", "bg-")}`} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Mini Preview Box */}
              <div
                className={`p-5 rounded-xl border transition-all duration-300 ${themeOptions[selectedTheme].bg} ${themeOptions[selectedTheme].border}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-white/20" />
                    <div className="h-2.5 w-20 rounded bg-white/30" />
                  </div>
                  <span className={`text-[10px] font-mono ${themeOptions[selectedTheme].accent}`}>
                    ● LIVE PREVIEW
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded bg-white/20" />
                  <div className="h-2 w-1/2 rounded bg-white/10" />
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 2: Edge Delivery & Speed (1 Col) */}
          <div className="bento-card-item md:col-span-1">
            <SpotlightCard className="h-full flex flex-col justify-between" spotlightColor="rgba(16, 185, 129, 0.18)">
              <div>
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-4">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Sub-second Latency</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Turbopack-powered SSR compilation served at global edge nodes with instant cached TTFB.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-[#081310] border border-emerald-500/30 font-mono">
                <div className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
                  <span>Global Edge TTFB</span>
                  <span className="text-emerald-500 dark:text-emerald-400 font-bold">42ms</span>
                </div>
                <div className="w-full bg-emerald-950/20 dark:bg-emerald-950/60 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[95%] rounded-full animate-pulse" />
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 3: SEO & Meta Precision (1 Col) */}
          <div className="bento-card-item md:col-span-1">
            <SpotlightCard className="h-full flex flex-col justify-between" spotlightColor="rgba(245, 158, 11, 0.18)">
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400 mb-4">
                  <Globe2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Automated OpenGraph</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Dynamic social cards generated automatically for Twitter, LinkedIn, and search indexers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-white/[0.02] border border-border/70 dark:border-white/[0.08] space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-foreground/80 dark:text-zinc-300 font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Rich Snippet Ready
                </div>
                <div className="flex items-center gap-1.5 text-xs text-foreground/80 dark:text-zinc-300 font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Semantic JSON-LD
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Card 4: Instant 1-Click Publishing & PWA (2 Cols) */}
          <div className="bento-card-item md:col-span-2">
            <SpotlightCard className="h-full flex flex-col justify-between" spotlightColor="rgba(168, 85, 247, 0.2)">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    PWA Offline Sync
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Zero-Friction Sharing & Native App Mode</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Every portfolio comes equipped with Progressive Web App capabilities so recruiters can install your portfolio directly to their desktop or home screen.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-muted/40 dark:bg-white/[0.03] border border-border/70 dark:border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-mono text-foreground/80 dark:text-zinc-300">
                    portfoliobuilder.dev/<span className="text-indigo-500 dark:text-indigo-400 font-semibold">yourname</span>
                  </span>
                </div>
                <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
                  Instant Custom Link <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
