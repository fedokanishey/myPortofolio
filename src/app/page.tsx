"use client";

import { MainLayout } from "@/components/templates/MainLayout";
import { HeroSection } from "@/components/organisms/HeroSection";
import { SocialProof } from "@/components/organisms/SocialProof";
import { BentoFeatures } from "@/components/organisms/BentoFeatures";
import { WorkflowTimeline } from "@/components/organisms/WorkflowTimeline";
import { MetricsSection } from "@/components/organisms/MetricsSection";
import { FinalCta } from "@/components/organisms/FinalCta";
import { PersistentBackgroundSystem } from "@/components/backgrounds";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
        {/* 5-Layer Persistent Living Background System */}
        <PersistentBackgroundSystem primaryColor="#6366F1" secondaryColor="#8B5CF6" />

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
