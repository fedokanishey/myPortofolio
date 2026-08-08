"use client";

import React from "react";
import { AnimatedCounter } from "@/components/atoms/AnimatedCounter";
import { Activity, ShieldCheck, Zap, Users } from "lucide-react";

const metrics = [
  {
    icon: Zap,
    value: 99.8,
    suffix: "%",
    decimals: 1,
    label: "Global Uptime",
    sublabel: "Distributed CDN failover",
  },
  {
    icon: Activity,
    value: 45,
    prefix: "<",
    suffix: "ms",
    decimals: 0,
    label: "Average TTFB",
    sublabel: "Global edge execution",
  },
  {
    icon: Users,
    value: 12500,
    suffix: "+",
    decimals: 0,
    label: "Portfolios Hosted",
    sublabel: "Trusted by top creators",
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "/100",
    decimals: 0,
    label: "Lighthouse Score",
    sublabel: "Zero bloat, pure speed",
  },
];

export const MetricsSection = () => {
  return (
    <section id="stats" className="py-24 border-y border-border/80 dark:border-white/[0.06] bg-muted/10 dark:bg-[#07090e] relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-border/60 dark:divide-white/[0.08]">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? "pt-8 lg:pt-0 lg:px-6" : "lg:pr-6"
                }`}
              >
                <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-4">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-2">
                  <AnimatedCounter
                    end={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals}
                  />
                </div>
                <div className="text-sm font-semibold text-foreground/90 mb-0.5">{m.label}</div>
                <div className="text-xs text-muted-foreground font-mono">{m.sublabel}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
