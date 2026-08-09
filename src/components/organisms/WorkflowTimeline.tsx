"use client";

import React, { useRef, useState } from "react";
import { TextReveal } from "@/components/atoms/TextReveal";
import { UserCheck, Sparkles, Rocket, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "Claim Your Handle & Sync Projects",
    description:
      "Secure your unique portfolio identifier and connect GitHub, Dribbble, or custom project case studies in seconds.",
    tag: "Instant OAuth",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Tailor Layout & Visual Identity",
    description:
      "Choose from precision dark themes, calibrate typography scales, and curate your featured technologies.",
    tag: "Visual Studio",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Deploy Globally with Edge SSL",
    description:
      "Publish with sub-second page loads, automated SEO meta cards, and installable PWA mobile support.",
    tag: "Edge CDN",
  },
];

export const WorkflowTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      if (!containerRef.current || typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 65%",
        end: "bottom 35%",
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.35) {
            setActiveStep(0);
          } else if (progress < 0.70) {
            setActiveStep(1);
          } else {
            setActiveStep(2);
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="workflow" ref={containerRef} className="py-28 md:py-36 relative border-t border-border/80 dark:border-white/[0.06] bg-muted/20 dark:bg-[#090d14] transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-xs font-mono">
            <Rocket className="h-3.5 w-3.5" /> DEPLOYMENT LIFECYCLE
          </div>
          <TextReveal as="h2" triggerOnScroll className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            From zero to live in under 60 seconds.
          </TextReveal>
          <TextReveal as="p" triggerOnScroll delay={0.1} className="text-muted-foreground text-base sm:text-lg">
            No convoluted hosting configs or boilerplate code. Just pure creative freedom.
          </TextReveal>
        </div>

        {/* 3 Step Progress Connector Bar (Desktop) */}
        <div className="hidden md:flex items-center justify-between relative max-w-4xl mx-auto mb-8 px-12">
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-0.5 bg-border/60 dark:bg-white/10 -z-10" />
          <div
            className="absolute left-16 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transition-all duration-500 -z-10"
            style={{
              width: activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "82%",
            }}
          />
          {steps.map((item, idx) => (
            <button
              key={`dot-${item.step}`}
              onClick={() => setActiveStep(idx)}
              className={`h-7 w-7 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                activeStep === idx
                  ? "border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-500/40 scale-110"
                  : activeStep > idx
                  ? "border-indigo-500/60 bg-indigo-500/20 text-indigo-400"
                  : "border-border/80 dark:border-white/20 bg-card text-muted-foreground"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* 3 Step Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`workflow-step-card relative rounded-2xl border p-8 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-indigo-500/60 bg-card/95 dark:bg-[#0f1522] shadow-xl dark:shadow-[0_10px_35px_rgba(99,102,241,0.18)] -translate-y-2"
                    : "border-border/80 dark:border-white/[0.08] bg-card/70 dark:bg-[#0c1017]/60 hover:border-indigo-500/30 dark:hover:border-white/20 opacity-80 hover:opacity-100"
                }`}
              >
                {/* Active Glowing Top Accent Bar */}
                {isActive && (
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-primary to-purple-600" />
                )}

                {/* Step Top Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`font-mono text-3xl font-extrabold transition-colors ${isActive ? "text-indigo-500 dark:text-indigo-400" : "text-foreground/20 dark:text-white/20"}`}>
                    {item.step}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all ${
                      isActive
                        ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "border-border/60 dark:border-white/[0.06] bg-muted/40 dark:bg-white/[0.02] text-muted-foreground"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30 scale-105"
                      : "bg-muted dark:bg-white/[0.05] text-muted-foreground"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
