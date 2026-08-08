"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { cn } from "@/lib/utils";

interface ExperienceItemProps {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  primaryColor?: string;
  isHovered?: boolean;
  isAnyHovered?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}

export function ExperienceItem({
  title,
  company,
  location,
  startDate,
  endDate,
  current,
  description,
  primaryColor = "#6366F1",
  isHovered = false,
  isAnyHovered = false,
  onHoverStart,
  onHoverEnd,
  className,
}: ExperienceItemProps) {
  return (
    <motion.div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      animate={{
        opacity: isAnyHovered && !isHovered ? 0.45 : 1,
        scale: isHovered ? 1.02 : 1,
        y: isHovered ? -4 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative group pl-10 pb-8 last:pb-2 transition-colors duration-300",
        className
      )}
    >
      {/* Vertical Timeline Track */}
      <div 
        className="absolute left-[15px] top-6 bottom-0 w-0.5 bg-border/60 transition-colors duration-300 group-hover:bg-primary/50"
        style={{
          background: isHovered ? `linear-gradient(to bottom, ${primaryColor}, transparent)` : undefined
        }}
      />
      
      {/* Interactive Timeline Node */}
      <motion.div 
        animate={{
          scale: isHovered ? 1.25 : 1,
          borderColor: isHovered ? primaryColor : "hsl(var(--border))",
          boxShadow: isHovered ? `0 0 16px ${primaryColor}80` : "none",
        }}
        transition={{ duration: 0.25 }}
        className="absolute left-[5px] top-3 h-6 w-6 rounded-full border-2 bg-card flex items-center justify-center z-10"
      >
        <Briefcase 
          className="h-3 w-3 transition-colors duration-200" 
          style={{ color: isHovered ? primaryColor : "currentColor" }} 
        />
      </motion.div>

      {/* Card Content Container */}
      <div 
        className={cn(
          "relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md",
          isHovered
            ? "bg-card/95 border-primary/40 shadow-[0_10px_35px_rgba(99,102,241,0.15)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.5)] dark:bg-[#0e1420]/95"
            : "bg-card/50 border-border/60 hover:border-border"
        )}
      >
        {/* Subtle top ambient line on hover */}
        {isHovered && (
          <motion.div 
            layoutId="expHoverGlow"
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`
            }}
          />
        )}

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <motion.h3 
                animate={{ scale: isHovered ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "font-bold text-lg sm:text-xl tracking-tight transition-colors duration-200",
                  isHovered ? "text-foreground" : "text-foreground/90"
                )}
                style={{ color: isHovered ? primaryColor : undefined }}
              >
                {title}
              </motion.h3>
              <p className="font-semibold text-sm sm:text-base mt-0.5" style={{ color: primaryColor }}>
                {company}
              </p>
            </div>
            {current && (
              <Badge variant="success" className="w-fit shadow-sm">
                Current Role
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5" style={{ color: isHovered ? primaryColor : undefined }} />
              <span>{startDate} — {current ? "Present" : endDate}</span>
            </span>
            {location && (
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-3.5 w-3.5" style={{ color: isHovered ? primaryColor : undefined }} />
                <span>{location}</span>
              </span>
            )}
          </div>

          <ExpandableText 
            text={description} 
            maxLength={220}
            className={cn(
              "text-sm leading-relaxed transition-colors duration-200",
              isHovered ? "text-foreground/90 font-normal" : "text-muted-foreground"
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
