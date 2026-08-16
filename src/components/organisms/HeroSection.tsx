"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  ArrowRight,
  Terminal,
  Newspaper,
  LayoutGrid,
  Sparkles,
  Zap,
  Check,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  Code2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import InstallPWA from "@/components/InstallPWA";
import type { PortfolioTemplate, HeaderStyle } from "@/models/Portfolio";
import { cn } from "@/lib/utils";

const THEME_ACCENTS = [
  { id: "indigo", name: "Indigo", primary: "#6366F1", secondary: "#8B5CF6" },
  { id: "cyan", name: "Cyan", primary: "#06B6D4", secondary: "#3B82F6" },
  { id: "emerald", name: "Emerald", primary: "#10B981", secondary: "#059669" },
  { id: "rose", name: "Rose", primary: "#F43F5E", secondary: "#E11D48" },
];

export const HeroSection = () => {
  const [activeTemplate, setActiveTemplate] = useState<PortfolioTemplate>("modern");
  const [activeHeaderStyle, setActiveHeaderStyle] = useState<HeaderStyle>("pill");
  const [activeAccent, setActiveAccent] = useState(THEME_ACCENTS[0]);
  const [simulatorMode, setSimulatorMode] = useState<"dark" | "light">("dark");

  const isDark = simulatorMode === "dark";
  const p = activeAccent.primary;
  const s = activeAccent.secondary;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Subtle Hairline Structural Top Border & Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Clean Editorial Category Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-border/80 bg-muted/30 text-xs font-medium text-muted-foreground mb-6"
        >
          <span className="text-primary font-bold">✦</span>
          <span>Crafted for developers, designers &amp; engineers</span>
        </motion.div>

        {/* Clean, Authentic Headline */}
        <div className="max-w-3xl mx-auto space-y-2 mb-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
            Build a portfolio that feels{" "}
            <span className="underline decoration-primary/40 decoration-wavy underline-offset-8">
              handcrafted
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground tracking-tight">
            In minutes, with zero boilerplate
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Choose from 4 distinct design architectures — from Cyberpunk Terminal to Minimalist Editorial. Built with Next.js 16 SSG, categorized skills, and custom navbar layouts.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mx-auto mb-6">
          <SignedOut>
            <SignInButton mode="modal">
              <MagneticButton strength={15} className="w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full sm:w-auto rounded-xl px-7 py-3.5 bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90 transition-all text-sm sm:text-base cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Start Your Portfolio — Free</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </MagneticButton>
            </SignInButton>
            <InstallPWA />
          </SignedOut>

          <SignedIn>
            <MagneticButton strength={15} className="w-full sm:w-auto">
              <Button
                size="xl"
                asChild
                className="w-full sm:w-auto rounded-xl px-7 py-3.5 bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90 transition-all text-sm sm:text-base cursor-pointer"
              >
                <Link href="/dashboard" className="flex items-center justify-center gap-2">
                  <span>Open Studio Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
          </SignedIn>
        </div>

        {/* Reassuring Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground mb-12">
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            Free custom slug
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            Instant SSG Edge export
          </span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE STUDIO WORKBENCH (Human-Crafted Tool Feel)
           ───────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-4xl mx-auto text-left rounded-2xl border border-border bg-card/90 shadow-xl overflow-hidden">
          {/* Workbench Header Controls */}
          <div className="px-4 py-3 bg-muted/40 border-b border-border flex flex-wrap items-center justify-between gap-3">
            {/* Template Selector */}
            <div className="flex items-center gap-1 bg-background/80 p-1 rounded-lg border border-border/80">
              {[
                { id: "modern" as const, label: "Modern Aurora", icon: Sparkles },
                { id: "cyber" as const, label: "Cyberpunk", icon: Terminal },
                { id: "editorial" as const, label: "Editorial", icon: Newspaper },
                { id: "bento" as const, label: "Bento Grid", icon: LayoutGrid },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeTemplate === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTemplate(item.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Customization Options (Nav style + Accent + Mode) */}
            <div className="flex items-center gap-2.5 ml-auto">
              {/* Navbar Style */}
              <div className="hidden md:flex items-center gap-1 bg-background/80 p-0.5 rounded-lg border border-border/80 text-[11px]">
                {(["pill", "dock", "banner", "rail"] as HeaderStyle[]).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setActiveHeaderStyle(style)}
                    className={cn(
                      "px-2 py-0.5 rounded capitalize font-medium transition-all cursor-pointer",
                      activeHeaderStyle === style
                        ? "bg-muted text-foreground font-bold shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {style}
                  </button>
                ))}
              </div>

              {/* Theme Accent Color */}
              <div className="flex items-center gap-1.5">
                {THEME_ACCENTS.map((accent) => (
                  <button
                    key={accent.id}
                    type="button"
                    onClick={() => setActiveAccent(accent)}
                    className={cn(
                      "w-4 h-4 rounded-full transition-transform hover:scale-110 cursor-pointer",
                      activeAccent.id === accent.id && "ring-2 ring-offset-2 ring-primary scale-110"
                    )}
                    style={{ background: accent.primary }}
                    title={accent.name}
                  />
                ))}
              </div>

              {/* Dark/Light Mode Toggle */}
              <button
                type="button"
                onClick={() => setSimulatorMode((prev) => (prev === "dark" ? "light" : "dark"))}
                className="p-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                title="Toggle Mode"
              >
                {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Workbench Canvas Screen */}
          <div
            className={cn(
              "p-6 sm:p-8 transition-colors duration-300 min-h-[320px] flex flex-col justify-between relative",
              isDark ? "bg-[#0c1017] text-zinc-100" : "bg-zinc-50 text-zinc-900"
            )}
          >
            {/* Header Simulator representation */}
            {activeHeaderStyle === "pill" && (
              <div className="flex justify-center mb-6">
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-medium shadow-xs",
                    isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
                  )}
                >
                  <span className="px-2 py-0.5 rounded-full text-white font-bold" style={{ background: p }}>
                    About
                  </span>
                  <span className="text-muted-foreground">Skills</span>
                  <span className="text-muted-foreground">Projects</span>
                  <span className="text-muted-foreground">Contact</span>
                </div>
              </div>
            )}

            {activeHeaderStyle === "dock" && (
              <div className="flex justify-center mb-6">
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] shadow-sm",
                    isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
                  )}
                >
                  <span className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px]" style={{ background: p }}>
                    ★
                  </span>
                  <span className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-[10px]">💻</span>
                  <span className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-[10px]">📁</span>
                  <span className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-[10px]">✉️</span>
                </div>
              </div>
            )}

            {activeHeaderStyle === "banner" && (
              <div
                className={cn(
                  "p-2.5 rounded-lg border flex items-center justify-between mb-6 text-xs font-semibold",
                  isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
                )}
              >
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: p }} />
                  fedaa.dev
                </span>
                <div className="flex gap-2 text-[11px] text-muted-foreground">
                  <span className="text-foreground">About</span>
                  <span>Skills</span>
                  <span>Projects</span>
                  <span>Contact</span>
                </div>
              </div>
            )}

            {/* Template Dynamic Content */}
            <AnimatePresence mode="wait">
              {activeTemplate === "modern" && (
                <motion.div
                  key="modern"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-md shrink-0"
                      style={{ background: `linear-gradient(135deg, ${p}, ${s})` }}
                    >
                      FK
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">Fedaa K.</h3>
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${p}20`, color: p }}
                        >
                          Full-Stack Engineer
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Specializing in React 19, Next.js 16, TypeScript, and modern web architectures.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Tailwind CSS"].map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-card shadow-2xs"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTemplate === "cyber" && (
                <motion.div
                  key="cyber"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "p-4 rounded-xl border font-mono text-xs space-y-3",
                    isDark ? "bg-[#080c14] border-zinc-800 text-zinc-300" : "bg-zinc-100 border-zinc-300 text-zinc-800"
                  )}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-border/50 text-[10px]">
                    <span>&gt; sys_kernel://session_01</span>
                    <span className="font-bold" style={{ color: p }}>
                      [STATUS: ONLINE]
                    </span>
                  </div>
                  <div>
                    <p className="opacity-60 text-[11px]">&gt; whoami</p>
                    <p className="font-bold text-sm" style={{ color: p }}>
                      Fedaa K. &mdash; Senior Systems &amp; Web Architect
                    </p>
                    <p className="text-xs opacity-75 mt-1">
                      Distributed Systems • Next.js 16 SSG • React 19 • Cloud Engineering
                    </p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    {["[TYPESCRIPT]", "[NEXT_16]", "[POSTGRES]", "[DOCKER]"].map((item) => (
                      <span
                        key={item}
                        className="text-[10px] px-2 py-0.5 rounded border font-semibold"
                        style={{ borderColor: `${p}40`, background: `${p}10`, color: p }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTemplate === "editorial" && (
                <motion.div
                  key="editorial"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="border-b border-border pb-2 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                    <span>SELECTED WORKS</span>
                    <span style={{ color: p }}>2026 ARCHIVE</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-serif font-normal">Fedaa K.</h3>
                    <p className="text-xs sm:text-sm font-serif italic text-muted-foreground">
                      Software engineer focused on clarity, performance, and typography.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-2 text-xs border-t border-border">
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground block">ENGINEERING</span>
                      <span className="font-serif font-semibold">Full Stack</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground block">EXPERIENCE</span>
                      <span className="font-serif font-semibold">5+ Years</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground block">SPECIALTY</span>
                      <span className="font-serif font-semibold" style={{ color: p }}>
                        Design Systems
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTemplate === "bento" && (
                <motion.div
                  key="bento"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  <div
                    className={cn(
                      "sm:col-span-2 p-4 rounded-xl border space-y-1.5",
                      isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Fedaa K.</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold">
                        ● Available
                      </span>
                    </div>
                    <h4 className="text-sm font-bold">Full Stack Engineer</h4>
                    <p className="text-xs text-muted-foreground">
                      Building modern web apps with clean architecture and extreme attention to detail.
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-4 rounded-xl border flex flex-col justify-center text-center",
                      isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"
                    )}
                  >
                    <span className="text-2xl font-bold font-mono" style={{ color: p }}>
                      100%
                    </span>
                    <span className="text-[11px] text-muted-foreground">Fast Edge Speed</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
