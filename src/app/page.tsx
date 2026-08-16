import dynamic from "next/dynamic";
import { MainLayout } from "@/components/templates/MainLayout";
import { HeroSection } from "@/components/organisms/HeroSection";
import { PersistentBackgroundSystem } from "@/components/backgrounds";

const SocialProof = dynamic(
  () => import("@/components/organisms/SocialProof").then((m) => m.SocialProof),
  { ssr: true }
);

const BentoFeatures = dynamic(
  () => import("@/components/organisms/BentoFeatures").then((m) => m.BentoFeatures),
  { ssr: true }
);

const WorkflowTimeline = dynamic(
  () => import("@/components/organisms/WorkflowTimeline").then((m) => m.WorkflowTimeline),
  { ssr: true }
);

const MetricsSection = dynamic(
  () => import("@/components/organisms/MetricsSection").then((m) => m.MetricsSection),
  { ssr: true }
);

const FinalCta = dynamic(
  () => import("@/components/organisms/FinalCta").then((m) => m.FinalCta),
  { ssr: true }
);

export default function HomePage() {
  return (
    <MainLayout>
      <div className="relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
        {/* Clean, Modern Architectural Background */}
        <PersistentBackgroundSystem
          primaryColor="#6366F1"
          secondaryColor="#8B5CF6"
          showGrid={false}
          showParticles={false}
          showOrbs={false}
          showNoise={true}
        />

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
