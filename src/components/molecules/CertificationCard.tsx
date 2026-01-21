"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, X, ZoomIn, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { ExpandableText } from "@/components/atoms/ExpandableText";
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
          className="text-xs"
          style={{
            background: `${primaryColor}15`,
            color: primaryColor,
          }}
        >
          {tech}
        </Badge>
      ))}
      {hasMore && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs text-muted-foreground hover:underline flex items-center gap-1"
          style={{ color: primaryColor }}
        >
          +{remaining} more
        </button>
      )}
      {hasMore && expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="text-xs text-muted-foreground hover:underline flex items-center gap-1"
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
  const maxLength = 30;
  const shouldTruncate = description.length > maxLength;

  if (expanded) {
    return (
      <div className="text-sm text-muted-foreground">
        <p className="whitespace-pre-wrap">{description}</p>
        <button
          onClick={() => setExpanded(false)}
          className="text-xs font-medium hover:underline mt-1"
          style={{ color: primaryColor }}
        >
          See less
        </button>
      </div>
    );
  }

  return (
    <p className="text-sm text-muted-foreground">
      <span className="line-clamp-1 inline">
        {shouldTruncate ? description.slice(0, maxLength).trim() + "..." : description}
      </span>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs font-medium hover:underline ml-1"
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg",
          className
        )}
        style={{
          borderColor: `${primaryColor}20`,
        }}
      >
        {/* Certificate Image - Clickable to view full */}
        {image && !imageError && (
          <div 
            className="relative cursor-pointer overflow-hidden"
            onClick={() => setShowFullImage(true)}
          >
            <div className="relative w-full" style={{ paddingBottom: "70%" }}>
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain bg-muted/30 transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            </div>
            {/* Zoom indicator */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        )}

      <div className="p-6 space-y-3">
        {/* Title and Date */}
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>

        {/* Description - Single line with See more */}
        {description && (
          <DescriptionRow description={description} primaryColor={primaryColor} />
        )}

        {/* Technologies - Single line with overflow */}
        {technologies.length > 0 && (
          <TechnologiesRow technologies={technologies} primaryColor={primaryColor} />
        )}
      </div>
    </motion.div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {showFullImage && image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setShowFullImage(false)}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setShowFullImage(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
