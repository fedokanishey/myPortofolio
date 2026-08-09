"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, Sparkles, Code2, Globe2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { TextReveal } from "@/components/atoms/TextReveal";
import InstallPWA from "@/components/InstallPWA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef1 = useRef<HTMLDivElement>(null);
  const floatingBadgeRef2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced || isMobile) return;

      // 3D Tilt and scale reveal for product preview canvas
      if (previewRef.current) {
        gsap.fromTo(
          previewRef.current,
          {
            rotateX: isMobile ? 0 : 16,
            y: 60,
            scale: 0.92,
            opacity: 0,
          },
          {
            rotateX: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: isMobile ? false : 0.6,
            },
          }
        );
      }

      // Parallax floating badges
      if (!isMobile && floatingBadgeRef1.current && floatingBadgeRef2.current) {
        gsap.to(floatingBadgeRef1.current, {
          y: -25,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(floatingBadgeRef2.current, {
          y: 20,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden"
    >
      {/* Background Dot Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 -z-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[200px] sm:w-[650px] sm:h-[320px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent blur-2xl sm:blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[220px] h-[150px] sm:w-[400px] sm:h-[250px] bg-primary/10 blur-2xl sm:blur-[100px] -z-10 rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        {/* Release / Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border/80 dark:border-white/[0.1] bg-card/80 dark:bg-[#0f141c]/80 backdrop-blur-md mb-8 shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-foreground/80 dark:text-zinc-300 font-mono tracking-wide">
            PORTFOLIO ENGINE V2.0 LIVE
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Zero config
          </span>
        </div>

        {/* Masked Line Reveal Headline */}
        <div className="max-w-4xl mx-auto space-y-2 mb-6">
          <TextReveal as="h1" delay={0.1} duration={1} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
            Your work deserves better
          </TextReveal>
          <TextReveal as="h1" delay={0.2} duration={1} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
            <span className="text-gradient">Your portfolio should be too</span>
          </TextReveal>
        </div>

        {/* Subtitle */}
        <TextReveal as="p" delay={0.35} duration={0.9} className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Craft a bespoke, high-performance portfolio with live themes, project analytics, and custom domain publishing in seconds
        </TextReveal>

        {/* Primary Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-16">
          <SignedOut>
            <SignInButton mode="modal">
              <MagneticButton strength={25} className="w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full sm:w-auto relative group overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-primary to-purple-600 px-8 py-4 text-white font-semibold shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] border border-white/20 transition-all text-sm sm:text-base"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Build Free Portfolio
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Button>
              </MagneticButton>
            </SignInButton>
            <InstallPWA />
          </SignedOut>

          <SignedIn>
            <MagneticButton strength={25} className="w-full sm:w-auto">
              <Button
                size="xl"
                asChild
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-indigo-500 via-primary to-purple-600 px-8 py-4 text-white font-semibold shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] border border-white/20 transition-all text-sm sm:text-base"
              >
                <Link href="/dashboard" className="flex items-center justify-center gap-2">
                  Launch Studio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
          </SignedIn>
        </div>

        {/* Interactive High-Fidelity Canvas Mockup */}
        <div
          ref={previewRef}
          className="w-full max-w-5xl mx-auto relative perspective-[1200px] mt-4"
        >
          {/* Floating Widget 1: Verified Domain */}
          <div
            ref={floatingBadgeRef1}
            className="hidden md:flex absolute -left-6 top-16 z-30 items-center gap-3 bg-card/95 dark:bg-[#0d121c]/90 backdrop-blur-xl border border-border/80 dark:border-white/[0.12] p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
              <Globe2 className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-foreground flex items-center gap-1">
                alexdev.me
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">Custom SSL Active</div>
            </div>
          </div>

          {/* Floating Widget 2: Edge Speed */}
          <div
            ref={floatingBadgeRef2}
            className="hidden md:flex absolute -right-6 bottom-20 z-30 items-center gap-3 bg-card/95 dark:bg-[#0d121c]/90 backdrop-blur-xl border border-border/80 dark:border-white/[0.12] p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-foreground">99/100 Lighthouse</div>
              <div className="text-[10px] text-muted-foreground font-mono">Instant edge delivery</div>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="relative rounded-2xl border border-border/80 dark:border-white/[0.12] bg-card/90 dark:bg-[#0b0f17] shadow-[0_25px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden">
            {/* Top Window Bar */}
            <div className="h-10 px-4 bg-muted/60 dark:bg-[#0e131d] border-b border-border/60 dark:border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-background/80 dark:bg-white/[0.04] border border-border/50 dark:border-white/[0.06] text-[11px] font-mono text-muted-foreground">
                <Code2 className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
                portfoliobuilder.dev/studio
              </div>
              <div className="w-12" />
            </div>

            {/* Inner Interactive Preview Canvas */}
            <div className="p-6 md:p-10 bg-gradient-to-b from-muted/30 dark:from-[#0e1420] to-background dark:to-[#07090e]">
              <div className="max-w-3xl mx-auto rounded-xl border border-border/70 dark:border-white/[0.08] bg-card/85 dark:bg-[#0f1522]/70 p-6 md:p-8 backdrop-blur-md shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-primary to-purple-500 p-0.5 shadow-lg">
                      <div className="h-full w-full rounded-[14px] bg-card dark:bg-[#0b0f17] flex items-center justify-center text-2xl font-bold text-foreground dark:text-white font-display">
                        AD
                      </div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-card dark:border-[#0b0f17] flex items-center justify-center text-[10px] text-white">
                      ✓
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Alex Devlin</h2>
                      <span className="inline-flex self-center sm:self-auto text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-medium">
                        Open to Roles
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Senior Staff Engineer & Creative Technologist crafting high-scale web infrastructure and design systems.
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      {["Next.js 16", "TypeScript", "GSAP Motion", "PostgreSQL", "Cloud Architecture"].map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-muted/60 dark:bg-white/[0.04] border border-border/60 dark:border-white/[0.08] text-xs font-mono text-foreground/80 dark:text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
