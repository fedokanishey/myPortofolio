"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/atoms/Button";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { TextReveal } from "@/components/atoms/TextReveal";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const FinalCta = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        {
          y: 40,
          scale: 0.96,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
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
    <section ref={containerRef} className="py-28 md:py-36 relative bg-background dark:bg-[#07090e] overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl border border-border/80 dark:border-white/[0.12] bg-gradient-to-b from-card via-card/90 to-background dark:from-[#0f1522] dark:via-[#0c1017] dark:to-[#07090e] p-10 sm:p-16 md:p-20 text-center shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/20 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono">
              <Sparkles className="h-3.5 w-3.5" /> START CRAFTING TODAY
            </div>

            <TextReveal as="h2" triggerOnScroll className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Ready to stand out with a world-class portfolio?
            </TextReveal>

            <TextReveal as="p" triggerOnScroll delay={0.1} className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Join thousands of forward-thinking engineers, product designers, and creators who host their story on PortfolioBuilder.
            </TextReveal>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <MagneticButton strength={24} className="w-full sm:w-auto">
                    <Button
                      size="xl"
                      className="w-full sm:w-auto relative group overflow-hidden rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 shadow-lg transition-all text-sm sm:text-base"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Started For Free
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </MagneticButton>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <MagneticButton strength={24} className="w-full sm:w-auto">
                  <Button
                    size="xl"
                    asChild
                    className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 shadow-lg transition-all text-sm sm:text-base"
                  >
                    <Link href="/dashboard" className="flex items-center justify-center gap-2">
                      Go to Studio
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </SignedIn>
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> No credit card required
              </span>
              <span>•</span>
              <span>100% Free Plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
