"use client";

import React from "react";

interface SectionDecoProps {
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

/**
 * Hero Ambient Mesh Ring & Rotating Orbital Nodes
 */
export function HeroMeshAura({
  primaryColor = "#6366F1",
  secondaryColor = "#8B5CF6",
  className = "",
}: SectionDecoProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden ${className}`}
    >
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-25 dark:opacity-20 animate-spin"
        style={{ animationDuration: "90s" }}
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle
          cx="400"
          cy="400"
          r="280"
          stroke="url(#heroGrad1)"
          strokeWidth="1"
          strokeDasharray="6 12"
        />
        <circle
          cx="400"
          cy="400"
          r="360"
          stroke="url(#heroGrad2)"
          strokeWidth="1"
          strokeDasharray="4 16"
        />
        <defs>
          <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="heroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Skills Technology Constellation & Flowing Connective Network
 */
export function SkillsConstellationDeco({
  primaryColor = "#6366F1",
  secondaryColor = "#8B5CF6",
  className = "",
}: SectionDecoProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-30 dark:opacity-25 ${className}`}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
            <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Animated Connecting Pathways */}
        <path
          d="M-100,60 Q300,120 700,40 T1500,80"
          fill="none"
          stroke="url(#constellationGrad)"
          strokeWidth="1.5"
          className="animate-dash-flow"
        />
        <path
          d="M-50,140 Q400,20 900,160 T1600,90"
          fill="none"
          stroke="url(#constellationGrad)"
          strokeWidth="1"
          className="animate-dash-flow"
          style={{ animationDuration: "60s" }}
        />
      </svg>
    </div>
  );
}

/**
 * Projects Engineering Blueprint Decors (Corner Crosshairs & Frame Lines)
 */
export function ProjectsBlueprintDeco({
  primaryColor = "#6366F1",
  className = "",
}: SectionDecoProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-20 dark:opacity-15 ${className}`}
    >
      <div className="container mx-auto h-full relative">
        {/* Subtle geometric framing lines */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{
            background: `linear-gradient(to bottom, transparent, ${primaryColor}40, transparent)`,
          }}
        />
        <div
          className="absolute right-4 top-0 bottom-0 w-px"
          style={{
            background: `linear-gradient(to bottom, transparent, ${primaryColor}40, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Contact Flowing Bezier Ribbons
 */
export function ContactFlowingRibbons({
  primaryColor = "#6366F1",
  secondaryColor = "#EC4899",
  className = "",
}: SectionDecoProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-35 dark:opacity-30 ${className}`}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100,500 C300,300 600,550 1000,350 C1300,200 1500,450 1600,300"
          stroke="url(#contactRibbonGrad1)"
          strokeWidth="1.5"
          className="animate-dash-flow"
          style={{ animationDuration: "50s" }}
        />
        <path
          d="M-50,450 C350,250 650,500 1050,300 C1350,150 1550,400 1650,250"
          stroke="url(#contactRibbonGrad2)"
          strokeWidth="1"
          className="animate-dash-flow"
          style={{ animationDuration: "35s" }}
        />
        <defs>
          <linearGradient id="contactRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="contactRibbonGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
