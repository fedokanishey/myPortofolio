"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, FolderKanban } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Card } from "./Card";
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
  
  const hasValidImage = image && !imageError && image.startsWith("http");
  const techs = Array.isArray(technologies) ? technologies : [];
  
  // Description logic
  const maxDescLength = 30;
  const shouldTruncateDesc = description.length > maxDescLength;
  
  // Technologies logic
  const maxVisibleTechs = 3;
  const hasMoreTechs = techs.length > maxVisibleTechs;
  const visibleTechs = techsExpanded ? techs : techs.slice(0, maxVisibleTechs);
  const remainingTechs = techs.length - maxVisibleTechs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card
        variant="glass"
        hover="lift"
        className={cn(
          "group overflow-hidden h-full",
          featured && "md:col-span-2",
          className
        )}
      >
        {/* Image or Live Preview or Placeholder */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {hasValidImage ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </>
          ) : liveUrl ? (
            <>
              {/* Live website preview via iframe */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-20" />
              <div className="absolute bottom-2 right-2 z-30">
                <span className="text-[10px] bg-primary/80 text-white px-1.5 py-0.5 rounded">
                  Live
                </span>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
              <FolderKanban className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {title}
            </h3>
            {/* Description - inline expand like certifications */}
            {descExpanded ? (
              <div className="text-sm text-muted-foreground">
                <p className="whitespace-pre-wrap">{description}</p>
                <button
                  onClick={() => setDescExpanded(false)}
                  className="text-xs font-medium hover:underline mt-1 text-primary"
                >
                  See less
                </button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                <span>
                  {shouldTruncateDesc ? description.slice(0, maxDescLength).trim() + "..." : description}
                </span>
                {shouldTruncateDesc && (
                  <button
                    onClick={() => setDescExpanded(true)}
                    className="text-xs font-medium hover:underline ml-1 text-primary"
                  >
                    See more
                  </button>
                )}
              </p>
            )}
          </div>

          {/* Technologies - inline expand */}
          {techs.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {visibleTechs.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
              {hasMoreTechs && !techsExpanded && (
                <button
                  onClick={() => setTechsExpanded(true)}
                  className="text-xs font-medium hover:underline text-primary"
                >
                  +{remainingTechs} more
                </button>
              )}
              {hasMoreTechs && techsExpanded && (
                <button
                  onClick={() => setTechsExpanded(false)}
                  className="text-xs font-medium hover:underline text-primary"
                >
                  Show less
                </button>
              )}
            </div>
          )}

          {(liveUrl || githubUrl) && (
            <div className="flex items-center gap-2 pt-2">
              {liveUrl && (
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="gap-1"
                >
                  <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </span>
                  </Link>
                </Button>
              )}
              {githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-1"
                >
                  <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-1">
                      <Github className="h-3.5 w-3.5" />
                      Code
                    </span>
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

