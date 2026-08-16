"use client";

import * as React from "react";
import { ModernTemplate } from "./ModernTemplate";
import { CyberTemplate } from "./CyberTemplate";
import { EditorialTemplate } from "./EditorialTemplate";
import { BentoTemplate } from "./BentoTemplate";
import type { TemplateProps } from "./types";
import type { PortfolioTemplate } from "@/models/Portfolio";

export * from "./types";
export * from "./ModernTemplate";
export * from "./CyberTemplate";
export * from "./EditorialTemplate";
export * from "./BentoTemplate";

export interface TemplateDefinition {
  id: PortfolioTemplate;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  gradient: string;
  tags: string[];
}

export const AVAILABLE_TEMPLATES: TemplateDefinition[] = [
  {
    id: "modern",
    title: "Standard View (Default)",
    subtitle: "Our SaaS Signature Design & Mesh Aura",
    description: "The complete rich flagship portfolio with 5-layer living background, typewriter hero, interactive constellation skills, and glassmorphic cards.",
    badge: "SaaS Default",
    gradient: "from-purple-600 via-indigo-600 to-pink-500",
    tags: ["Signature View", "5-Layer Mesh", "Typewriter Hero", "Fluid Cards"],
  },
  {
    id: "cyber",
    title: "Cyberpunk Terminal",
    subtitle: "Developer Console & Matrix HUD",
    description: "Terminal aesthetics, bash prompt header, code repository view, cyber scanlines, and telemetry badges.",
    badge: "For Engineers",
    gradient: "from-cyan-500 via-emerald-500 to-blue-600",
    tags: ["Monospace HUD", "CLI Prompts", "Dev Centric", "Neon Accents"],
  },
  {
    id: "editorial",
    title: "Editorial Minimalist",
    subtitle: "Swiss Magazine & Monolith Design",
    description: "High-end editorial typography, refined hairlines, spacious bento architecture, and subtle luxury glows.",
    badge: "Executive",
    gradient: "from-zinc-700 via-stone-800 to-neutral-900",
    tags: ["Swiss Typography", "Clean Dividers", "Minimalist", "High Fashion"],
  },
  {
    id: "bento",
    title: "Bento Studio",
    subtitle: "Modular 3D Grid & Creator Showcase",
    description: "Modern modular bento cells, dynamic stats metrics, 3D perspective tilt feel, and vibrant showcase cards.",
    badge: "Creative",
    gradient: "from-blue-600 via-violet-600 to-amber-500",
    tags: ["Bento Grid", "Live Metrics", "3D Elastic GSAP", "Product Centric"],
  },
];

export function PortfolioTemplateRenderer(props: TemplateProps) {
  const templateId = props.portfolio?.themeConfig?.template || "modern";

  switch (templateId) {
    case "cyber":
      return <CyberTemplate {...props} />;
    case "editorial":
      return <EditorialTemplate {...props} />;
    case "bento":
      return <BentoTemplate {...props} />;
    case "modern":
    default:
      return <ModernTemplate {...props} />;
  }
}
