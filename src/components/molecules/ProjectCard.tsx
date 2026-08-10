"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, FolderKanban, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { SkillIcon } from "@/components/molecules/SkillSearchInput";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { usePerspectiveTilt } from "@/lib/animations/usePerspectiveTilt";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  technologies = [],
  liveUrl,
  githubUrl,
  featured,
  primaryColor = "#6366F1",
  secondaryColor = "#8B5CF6",
  className,
}: ProjectCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const [descExpanded, setDescExpanded] = React.useState(false);
  const [techsExpanded, setTechsExpanded] = React.useState(false);
  const cardRef = usePerspectiveTilt<HTMLDivElement>(6);

  const hasValidImage = image && !imageError && image.startsWith("http");
  const techs = Array.isArray(technologies) ? technologies : [];

  const maxDescLength = 85;
  const shouldTruncateDesc = description.length > maxDescLength;

  const maxVisibleTechs = 3;
  const hasMoreTechs = techs.length > maxVisibleTechs;
  const visibleTechs = techsExpanded ? techs : techs.slice(0, maxVisibleTechs);
  const remainingTechs = techs.length - maxVisibleTechs;

  // Zero-rerender high performance spotlight using CSS variables
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);
    card.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/[0.08] bg-card/90 dark:bg-[#0c1017]/90 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between will-change-transform",
        featured && "md:col-span-2",
        className
      )}
      style={{
        // Default hidden spotlight
        ["--spotlight-opacity" as string]: "0",
        ["--spotlight-x" as string]: "-400px",
        ["--spotlight-y" as string]: "-400px",
      }}
    >
      {/* Zero-rerender CSS Variable Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background: `radial-gradient(450px circle at var(--spotlight-x, -400px) var(--spotlight-y, -400px), ${primaryColor}22, transparent 65%)`,
        }}
      />

      {/* Top Edge Specular Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div>
        {/* Project Thumbnail with Zoom Reveal */}
        <div className="relative aspect-video overflow-hidden bg-muted/40 dark:bg-[#07090e] border-b border-border/60 dark:border-white/[0.06]">
          {hasValidImage ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 dark:from-[#0c1017] via-transparent to-transparent opacity-80" />
            </>
          ) : liveUrl ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <FolderKanban className="h-8 w-8 opacity-30 animate-pulse" />
              </div>
              <iframe
                src={liveUrl}
                title={`${title} preview`}
                className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none relative z-10 border-0"
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card dark:from-[#0c1017] to-transparent pointer-events-none z-20" />
              <div className="absolute bottom-3 right-3 z-30">
                <span 
                  className="text-[10px] font-mono text-white px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm"
                  style={{ background: primaryColor }}
                >
                  Live View
                </span>
              </div>
            </>
          ) : (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`
              }}
            >
              <FolderKanban className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div>
            <h3 
              className="font-bold text-lg text-foreground group-hover:text-primary transition-colors flex items-center justify-between"
            >
              <span>{title}</span>
              {featured && (
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded border"
                  style={{ 
                    color: primaryColor,
                    backgroundColor: `${primaryColor}15`,
                    borderColor: `${primaryColor}30`
                  }}
                >
                  Featured Case Study
                </span>
              )}
            </h3>

            {/* Expandable Description */}
            <div className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {descExpanded ? (
                <div>
                  <p className="whitespace-pre-wrap">{description}</p>
                  <button
                    onClick={() => setDescExpanded(false)}
                    className="text-xs font-semibold hover:underline mt-1 block"
                    style={{ color: primaryColor }}
                  >
                    See less
                  </button>
                </div>
              ) : (
                <p>
                  <span>
                    {shouldTruncateDesc
                      ? description.slice(0, maxDescLength).trim() + "..."
                      : description}
                  </span>
                  {shouldTruncateDesc && (
                    <button
                      onClick={() => setDescExpanded(true)}
                      className="text-xs font-semibold hover:underline ml-1 inline-block"
                      style={{ color: primaryColor }}
                    >
                      See more
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Technology Badges */}
          {techs.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {visibleTechs.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-muted/60 dark:bg-white/[0.04] border border-border/60 dark:border-white/[0.06] text-foreground/80 dark:text-zinc-300 text-[11px] font-mono flex items-center gap-1 py-0.5 px-2"
                >
                  <SkillIcon name={tech} size={11} />
                  {tech}
                </Badge>
              ))}
              {hasMoreTechs && !techsExpanded && (
                <button
                  onClick={() => setTechsExpanded(true)}
                  className="text-[11px] font-mono hover:underline ml-1"
                  style={{ color: primaryColor }}
                >
                  +{remainingTechs} more
                </button>
              )}
              {hasMoreTechs && techsExpanded && (
                <button
                  onClick={() => setTechsExpanded(false)}
                  className="text-[11px] font-mono hover:underline ml-1"
                  style={{ color: primaryColor }}
                >
                  Show less
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Footers with Theme-Synchronized Magnetic Buttons */}
      {(liveUrl || githubUrl) && (
        <div className="p-6 pt-0 flex items-center gap-2.5">
          {liveUrl && (
            <MagneticButton strength={15}>
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-md transition-all group/btn"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 0 16px ${primaryColor}40`,
                }}
              >
                <span>Live Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </MagneticButton>
          )}
          {githubUrl && (
            <MagneticButton strength={15}>
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted/80 dark:bg-white/[0.05] hover:bg-muted dark:hover:bg-white/[0.1] border border-border/80 dark:border-white/[0.08] text-foreground/80 dark:text-zinc-300 hover:text-foreground text-xs font-medium transition-all"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Source</span>
              </Link>
            </MagneticButton>
          )}
        </div>
      )}
    </div>
  );
}
