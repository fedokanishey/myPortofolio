"use client";

import { MainLayout } from "@/components/templates/MainLayout";
import { HeroSection } from "@/components/organisms/HeroSection";
import { SocialProof } from "@/components/organisms/SocialProof";
import { BentoFeatures } from "@/components/organisms/BentoFeatures";
import { WorkflowTimeline } from "@/components/organisms/WorkflowTimeline";
import { MetricsSection } from "@/components/organisms/MetricsSection";
import { FinalCta } from "@/components/organisms/FinalCta";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="relative w-full overflow-hidden bg-[#07090e] text-zinc-100 selection:bg-indigo-500/30 selection:text-white">
        {/* Hero Section with Line Reveals & 3D Tilt Mockup */}
        <HeroSection />

        {/* Seamless Infinite Tech Marquee */}
        <SocialProof />

        {/* Asymmetrical Bento Grid with Interactive Sandbox & Spotlights */}
        <BentoFeatures />

        {/* 3-Step Deployment Lifecycle with ScrollTrigger */}
        <WorkflowTimeline />

        {/* Precision Animated Numerical Metrics */}
        <MetricsSection />

        {/* Monolithic Dark Obsidian CTA */}
        <FinalCta />
      </div>
    </MainLayout>
  );
}
