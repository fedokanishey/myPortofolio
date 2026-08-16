"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import type { HeaderPosition, HeaderStyle } from "@/models/Portfolio";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface PortfolioNavbarProps {
  navItems: NavItem[];
  activeSection: string;
  scrollToSection: (id: string) => void;
  primaryColor?: string;
  secondaryColor?: string;
  showHeader?: boolean;
  headerStyle?: HeaderStyle;
  headerPosition?: HeaderPosition;
  displayName?: string;
  avatarSrc?: string;
  showContactCTA?: boolean;
  className?: string;
}

export function PortfolioNavbar({
  navItems,
  activeSection,
  scrollToSection,
  primaryColor = "#8B5CF6",
  secondaryColor = "#EC4899",
  showHeader = true,
  headerStyle = "pill",
  headerPosition = "top",
  displayName,
  avatarSrc,
  showContactCTA = false,
  className,
}: PortfolioNavbarProps) {
  if (!showHeader) return null;

  // Normalized position: if style is banner, position is usually top/bottom
  const position = headerPosition || "top";
  const style = headerStyle || "pill";

  // ─────────────────────────────────────────────────────────────
  // 1. STYLE: BANNER (Full-Width Glass Bar at Top / Bottom)
  // ─────────────────────────────────────────────────────────────
  if (style === "banner") {
    const isBottom = position === "bottom";
    return (
      <motion.header
        initial={{ y: isBottom ? 60 : -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 z-50 backdrop-blur-xl border-border/80 dark:border-white/10 bg-white/90 dark:bg-[#0b0f17]/90 shadow-md transition-all",
          isBottom ? "bottom-0 border-t" : "top-0 border-b",
          className
        )}
      >
        <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3 max-w-7xl">
          {/* Brand / Name on Left */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2.5 group text-left shrink-0"
          >
            {avatarSrc ? (
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-border shadow-sm group-hover:scale-105 transition-transform">
                <Image
                  src={avatarSrc}
                  alt={displayName || "Avatar"}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
            ) : displayName ? (
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm group-hover:scale-105 transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
            ) : null}

            {displayName && (
              <span className="text-sm sm:text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors hidden xs:inline-block">
                {displayName}
              </span>
            )}
          </button>

          {/* Navigation Links in Center */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 shrink-0",
                    isActive
                      ? "text-white font-semibold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-white/5"
                  )}
                  style={isActive ? { background: primaryColor } : undefined}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline-block">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Tools (Theme Toggle + Optional Quick Action) */}
          <div className="flex items-center gap-2 shrink-0">
            {showContactCTA && (
              <button
                onClick={() => scrollToSection("contact")}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Contact</span>
              </button>
            )}
            <ThemeToggle variant="icon" />
          </div>
        </div>
      </motion.header>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. STYLE: RAIL (Vertical Glass Rail on Left / Right Edge)
  // ─────────────────────────────────────────────────────────────
  if (style === "rail" || position === "left" || position === "right") {
    const isRight = position === "right";

    return (
      <>
        {/* Desktop Vertical Glass Rail (hidden on mobile) */}
        <div
          className={cn(
            "fixed top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center pointer-events-none",
            isRight ? "right-4 lg:right-6" : "left-4 lg:left-6",
            className
          )}
        >
          <motion.nav
            initial={{ x: isRight ? 60 : -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#0b0f17]/95 text-foreground">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <div key={item.id} className="relative group">
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "relative p-2.5 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center justify-center",
                        isActive
                          ? "text-white font-semibold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-muted/80 dark:hover:bg-white/5"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeRailNav"
                          className="absolute inset-0 rounded-xl shadow-md"
                          style={{ background: primaryColor }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                    </motion.button>

                    {/* Tooltip on hover */}
                    <div
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-border bg-popover text-popover-foreground z-50",
                        isRight ? "right-full mr-2.5" : "left-full ml-2.5"
                      )}
                    >
                      {item.label}
                    </div>
                  </div>
                );
              })}

              {/* Vertical Divider */}
              <div className="w-5 h-px bg-zinc-300 dark:bg-zinc-700 my-1 shrink-0" />

              {/* Theme Toggle */}
              <div className="shrink-0">
                <ThemeToggle variant="icon" />
              </div>
            </div>
          </motion.nav>
        </div>

        {/* Mobile Horizontal Fallback Pill (sm:hidden) */}
        <div className="fixed bottom-3 inset-x-0 z-50 flex justify-center px-2 pointer-events-none sm:hidden">
          <motion.nav
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto max-w-[98vw]"
          >
            <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-full backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#0b0f17]/95 text-foreground">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "relative p-2 rounded-full text-xs shrink-0 transition-all",
                      isActive
                        ? "text-white font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                    )}
                    style={isActive ? { background: primaryColor } : undefined}
                    title={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
              <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1 shrink-0" />
              <div className="shrink-0">
                <ThemeToggle variant="icon" />
              </div>
            </div>
          </motion.nav>
        </div>
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 3. STYLE: DOCK (macOS-Style Interactive Glass Dock)
  // ─────────────────────────────────────────────────────────────
  if (style === "dock") {
    const isBottom = position === "bottom";
    return (
      <div
        className={cn(
          "fixed inset-x-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none",
          isBottom ? "bottom-3 sm:bottom-6" : "top-3 sm:top-6",
          className
        )}
      >
        <motion.nav
          initial={{ y: isBottom ? 60 : -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-auto max-w-[98vw] sm:max-w-max"
        >
          <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-3xl backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-2xl bg-white/90 dark:bg-[#0b0f17]/90 text-foreground ring-1 ring-black/5 dark:ring-white/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <div key={item.id} className="relative group flex flex-col items-center">
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "relative p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm font-medium transition-all shrink-0 flex items-center justify-center",
                      isActive
                        ? "text-white font-semibold shadow-lg"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-muted/80 dark:hover:bg-white/5"
                    )}
                    style={isActive ? { background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` } : undefined}
                    whileHover={{ scale: 1.15, y: isBottom ? -4 : 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                  </motion.button>

                  {/* Active Indicator Dot under icon for Dock */}
                  {isActive && (
                    <motion.span
                      layoutId="activeDockDot"
                      className="w-1.5 h-1.5 rounded-full mt-1"
                      style={{ background: primaryColor }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Tooltip */}
                  <div
                    className={cn(
                      "absolute px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-border bg-popover text-popover-foreground z-50",
                      isBottom ? "bottom-full mb-2" : "top-full mt-2"
                    )}
                  >
                    {item.label}
                  </div>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-px h-6 sm:h-7 bg-zinc-300 dark:bg-zinc-700 mx-1 shrink-0" />

            {/* Theme Toggle */}
            <div className="shrink-0">
              <ThemeToggle variant="icon" />
            </div>
          </div>
        </motion.nav>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 4. STYLE: PILL (Default Sleek Floating Glass Capsule)
  // ─────────────────────────────────────────────────────────────
  const isBottom = position === "bottom";
  return (
    <div
      className={cn(
        "fixed inset-x-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none",
        isBottom ? "bottom-3 sm:bottom-6" : "top-3 sm:top-6",
        className
      )}
    >
      <motion.nav
        initial={{ y: isBottom ? 60 : -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-auto max-w-[98vw] sm:max-w-max"
      >
        <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl bg-white/95 dark:bg-[#0b0f17]/95 text-foreground">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative p-2 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0",
                  isActive
                    ? "text-white font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-white"
                )}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillNav"
                    className="absolute inset-0 rounded-full shadow-md"
                    style={{ background: primaryColor }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon
                  className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5 relative z-10 transition-colors",
                    isActive ? "text-white" : "text-zinc-700 dark:text-zinc-400 hover:text-foreground"
                  )}
                />
              </motion.button>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 sm:h-6 bg-zinc-300 dark:bg-zinc-700 mx-1 shrink-0" />

          {/* Theme Toggle */}
          <div className="shrink-0">
            <ThemeToggle variant="icon" />
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
