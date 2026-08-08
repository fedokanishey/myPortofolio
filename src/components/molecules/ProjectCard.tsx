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
  className,
}: ProjectCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const [descExpanded, setDescExpanded] = React.useState(false);
  const [techsExpanded, setTechsExpanded] = React.useState(false);
  const cardRef = usePerspectiveTilt<HTMLDivElement>(6);

  const [mousePos, setMousePos] = React.useState({ x: -400, y: -400 });
  const [isHovered, setIsHovered] = React.useState(false);

  const hasValidImage = image && !imageError && image.startsWith("http");
  const techs = Array.isArray(technologies) ? technologies : [];

  const maxDescLength = 85;
  const shouldTruncateDesc = description.length > maxDescLength;

  const maxVisibleTechs = 3;
  const hasMoreTechs = techs.length > maxVisibleTechs;
  const visibleTechs = techsExpanded ? techs : techs.slice(0, maxVisibleTechs);
  const remainingTechs = techs.length - maxVisibleTechs;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1017]/90 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between will-change-transform",
        featured && "md:col-span-2",
        className
      )}
    >
      {/* Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 60%)`,
        }}
      />
      {/* Top Edge Specular Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div>
        {/* Project Thumbnail with Zoom Reveal */}
        <div className="relative aspect-video overflow-hidden bg-[#07090e] border-b border-white/[0.06]">
          {hasValidImage ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-transparent opacity-80" />
            </>
          ) : liveUrl ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <FolderKanban className="h-8 w-8 opacity-30 animate-pulse" />
              </div>
              <iframe
                src={liveUrl}
                title={`${title} preview`}
                className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none relative z-10"
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] to-transparent pointer-events-none z-20" />
              <div className="absolute bottom-3 right-3 z-30">
                <span className="text-[10px] font-mono bg-indigo-500/80 text-white px-2 py-0.5 rounded-full backdrop-blur-md">
                  Live View
                </span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
              <FolderKanban className="h-12 w-12 text-zinc-600" />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors flex items-center justify-between">
              <span>{title}</span>
              {featured && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Featured Case Study
                </span>
              )}
            </h3>

            {/* Expandable Description */}
            <div className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {descExpanded ? (
                <div>
                  <p className="whitespace-pre-wrap">{description}</p>
                  <button
                    onClick={() => setDescExpanded(false)}
                    className="text-xs font-semibold text-indigo-400 hover:underline mt-1 block"
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
                      className="text-xs font-semibold text-indigo-400 hover:underline ml-1 inline-block"
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
                  className="bg-white/[0.04] border-white/[0.06] text-zinc-300 text-[11px] font-mono flex items-center gap-1 py-0.5 px-2"
                >
                  <SkillIcon name={tech} size={11} />
                  {tech}
                </Badge>
              ))}
              {hasMoreTechs && !techsExpanded && (
                <button
                  onClick={() => setTechsExpanded(true)}
                  className="text-[11px] font-mono text-indigo-400 hover:underline ml-1"
                >
                  +{remainingTechs} more
                </button>
              )}
              {hasMoreTechs && techsExpanded && (
                <button
                  onClick={() => setTechsExpanded(false)}
                  className="text-[11px] font-mono text-indigo-400 hover:underline ml-1"
                >
                  Show less
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Footers with Magnetic Buttons */}
      {(liveUrl || githubUrl) && (
        <div className="p-6 pt-0 flex items-center gap-2.5">
          {liveUrl && (
            <MagneticButton strength={15}>
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all group/btn"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium transition-all"
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
