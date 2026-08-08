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
      const stepElements = gsap.utils.toArray<HTMLElement>(".workflow-step-card");
      if (!stepElements.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      stepElements.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          end: "bottom 30%",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="workflow" ref={containerRef} className="py-28 md:py-36 relative border-t border-border/80 dark:border-white/[0.06] bg-muted/20 dark:bg-[#090d14] transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
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

        {/* 3 Step Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={item.step}
                className={`workflow-step-card relative rounded-2xl border p-8 transition-all duration-300 ${
                  isActive
                    ? "border-indigo-500/50 bg-card/95 dark:bg-[#0f1522] shadow-lg dark:shadow-[0_10px_35px_rgba(99,102,241,0.12)] -translate-y-1"
                    : "border-border/80 dark:border-white/[0.08] bg-card/70 dark:bg-[#0c1017]/60 hover:border-primary/40 dark:hover:border-white/20"
                }`}
              >
                {/* Step Top Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-foreground/20 dark:text-white/20">
                    {item.step}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                      isActive
                        ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "border-border/60 dark:border-white/[0.06] bg-muted/40 dark:bg-white/[0.02] text-muted-foreground"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    isActive
                      ? "bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30"
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
