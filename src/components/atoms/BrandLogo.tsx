"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string | null | false;
}

export function BrandLogo({
  variant = "full",
  size = "md",
  className,
  href = "/",
}: BrandLogoProps) {
  const iconSizeMap = {
    sm: { w: 26, h: 28, box: "h-7 w-7" },
    md: { w: 32, h: 34, box: "h-9 w-9" },
    lg: { w: 40, h: 42, box: "h-11 w-11" },
  };

  const currentSize = iconSizeMap[size] || iconSizeMap.md;

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      {/* Emblem Icon with Gradient Glow */}
      <div
        className={cn(
          "relative rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105",
          currentSize.box
        )}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 via-primary/20 to-purple-600/20 blur-sm group-hover:blur-md transition-all opacity-75" />
        <div className="relative h-full w-full rounded-xl bg-white/5 dark:bg-white/[0.04] border border-border/60 dark:border-white/10 p-1 flex items-center justify-center backdrop-blur-md shadow-sm">
          <Image
            src="/logo-icon.png"
            alt="PortfolioBuilder Logo"
            width={currentSize.w}
            height={currentSize.h}
            className="object-contain drop-shadow-[0_2px_8px_rgba(99,102,241,0.4)]"
            priority
          />
        </div>
      </div>

      {/* Brand Text */}
      {variant === "full" && (
        <span
          className={cn(
            "font-extrabold tracking-tight font-display text-foreground transition-colors",
            size === "sm" && "text-sm",
            size === "md" && "text-base sm:text-lg",
            size === "lg" && "text-xl sm:text-2xl"
          )}
        >
          Port<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-primary to-purple-500">folio</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
