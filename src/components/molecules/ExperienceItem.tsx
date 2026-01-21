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
  className,
}: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn("relative pl-8 pb-8 last:pb-0", className)}
    >
      {/* Timeline line */}
      <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-border last:hidden" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-6 w-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
        <Briefcase className="h-3 w-3 text-primary" />
      </div>

      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-primary font-medium">{company}</p>
          </div>
          {current && (
            <Badge variant="success" className="w-fit">
              Current
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {startDate} - {current ? "Present" : endDate}
          </span>
          {location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          )}
        </div>

        <ExpandableText 
          text={description} 
          maxLength={200}
          className="text-muted-foreground text-sm leading-relaxed"
        />
      </div>
    </motion.div>
  );
}
