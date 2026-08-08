"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, X, ZoomIn } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { SkillIcon } from "@/components/molecules/SkillSearchInput";
import { cn } from "@/lib/utils";

// Technologies Row Component with expand/collapse
function TechnologiesRow({ technologies, primaryColor }: { technologies: string[]; primaryColor: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const maxVisible = 3;
  const hasMore = technologies.length > maxVisible;
  const visibleTechs = expanded ? technologies : technologies.slice(0, maxVisible);
  const remaining = technologies.length - maxVisible;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {visibleTechs.map((tech) => (
        <Badge
          key={tech}
          variant="secondary"
          className="text-xs flex items-center gap-1"
          style={{
            background: `${primaryColor}15`,
            color: primaryColor,
          }}
        >
          <SkillIcon name={tech} size={11} color={primaryColor} />
          {tech}
        </Badge>
      ))}
      {hasMore && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs hover:underline flex items-center gap-1 font-medium"
          style={{ color: primaryColor }}
        >
          +{remaining} more
        </button>
      )}
      {hasMore && expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="text-xs hover:underline flex items-center gap-1 font-medium"
          style={{ color: primaryColor }}
        >
          Show less
        </button>
      )}
    </div>
  );
}

// Single line description with inline See more
function DescriptionRow({ description, primaryColor }: { description: string; primaryColor: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const maxLength = 80;
  const shouldTruncate = description.length > maxLength;

  if (expanded) {
    return (
      <div className="text-sm text-muted-foreground">
        <p className="whitespace-pre-wrap">{description}</p>
        <button
          onClick={() => setExpanded(false)}
          className="text-xs font-medium hover:underline mt-1 block"
          style={{ color: primaryColor }}
        >
          See less
        </button>
      </div>
    );
  }

  return (
    <p className="text-sm text-muted-foreground">
      <span className="line-clamp-2 inline">
        {shouldTruncate ? description.slice(0, maxLength).trim() + "..." : description}
      </span>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs font-medium hover:underline ml-1 inline-block"
          style={{ color: primaryColor }}
        >
          See more
        </button>
      )}
    </p>
  );
}

interface CertificationCardProps {
  title: string;
  image?: string;
  description: string;
  technologies: string[];
  date: string;
  primaryColor?: string;
  className?: string;
}

export function CertificationCard({
  title,
  image,
  description,
  technologies = [],
  date,
  primaryColor = "#8B5CF6",
  className,
}: CertificationCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const [showFullImage, setShowFullImage] = React.useState(false);

  // Close on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowFullImage(false);
      }
    };
    if (showFullImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showFullImage]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur-md transition-all duration-300 hover:shadow-xl flex flex-col justify-between",
          className
        )}
        style={{
          borderColor: `${primaryColor}30`,
        }}
      >
        {/* Certificate Image - Clickable to view full */}
        {image && !imageError && (
          <div
            className="relative cursor-pointer overflow-hidden bg-black/40"
            onClick={() => setShowFullImage(true)}
            title="Click to view full certificate"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            </div>
            {/* Zoom indicator overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium shadow-lg">
                <ZoomIn className="h-4 w-4" />
                <span>View Fullscreen</span>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 space-y-3">
          {/* Title and Date */}
          <div>
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 font-mono">
              <Calendar className="h-3.5 w-3.5" />
              <span>{date}</span>
            </div>
          </div>

          {/* Description */}
          {description && (
            <DescriptionRow description={description} primaryColor={primaryColor} />
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <TechnologiesRow technologies={technologies} primaryColor={primaryColor} />
          )}
        </div>
      </motion.div>

      {/* Full Image Modal with Prominent Close Button */}
      <AnimatePresence>
        {showFullImage && image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setShowFullImage(false)}
          >
            {/* Prominent Close Button at top right */}
            <button
              type="button"
              className="absolute top-5 right-5 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/25 text-white font-medium text-sm backdrop-blur-xl border border-white/20 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullImage(false);
              }}
            >
              <X className="h-5 w-5 text-white" />
              <span>Close (Esc)</span>
            </button>

            {/* Modal Certificate Frame */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl flex items-center justify-center p-2 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
