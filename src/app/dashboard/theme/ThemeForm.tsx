"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Save,
  Search,
  Type,
  Eye,
  LayoutTemplate,
  Check,
  Compass,
  Sliders,
  Sparkles,
  Terminal,
  Newspaper,
  LayoutGrid,
  Code2,
  ExternalLink,
  Cpu,
  Layers,
  CircleDot,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/Card";
import { updateThemeConfig } from "@/actions/portfolio";
import type {
  IPortfolio,
  IThemeConfig,
  PortfolioTemplate,
  HeaderStyle,
  HeaderPosition,
} from "@/models/Portfolio";
import { AVAILABLE_TEMPLATES } from "@/components/templates/portfolio";
import { cn } from "@/lib/utils";

// Extended font list
const ALL_FONTS = [
  { value: "Inter", label: "Inter", category: "Sans-serif" },
  { value: "Plus Jakarta Sans", label: "Plus Jakarta Sans", category: "Sans-serif" },
  { value: "Roboto", label: "Roboto", category: "Sans-serif" },
  { value: "Poppins", label: "Poppins", category: "Sans-serif" },
  { value: "Outfit", label: "Outfit", category: "Sans-serif" },
  { value: "Space Grotesk", label: "Space Grotesk", category: "Sans-serif" },
  { value: "Manrope", label: "Manrope", category: "Sans-serif" },
  { value: "DM Sans", label: "DM Sans", category: "Sans-serif" },
  { value: "Nunito Sans", label: "Nunito Sans", category: "Sans-serif" },
  { value: "Work Sans", label: "Work Sans", category: "Sans-serif" },
  { value: "Lato", label: "Lato", category: "Sans-serif" },
  { value: "Open Sans", label: "Open Sans", category: "Sans-serif" },
  { value: "Montserrat", label: "Montserrat", category: "Sans-serif" },
  { value: "Raleway", label: "Raleway", category: "Sans-serif" },
  { value: "Nunito", label: "Nunito", category: "Sans-serif" },
  { value: "Quicksand", label: "Quicksand", category: "Sans-serif" },
  { value: "Sora", label: "Sora", category: "Sans-serif" },
  { value: "Figtree", label: "Figtree", category: "Sans-serif" },
  { value: "Lexend", label: "Lexend", category: "Sans-serif" },
  { value: "Geist", label: "Geist", category: "Sans-serif" },
  { value: "Playfair Display", label: "Playfair Display", category: "Serif" },
  { value: "Merriweather", label: "Merriweather", category: "Serif" },
  { value: "Lora", label: "Lora", category: "Serif" },
  { value: "Source Serif 4", label: "Source Serif 4", category: "Serif" },
  { value: "IBM Plex Mono", label: "IBM Plex Mono", category: "Monospace" },
  { value: "JetBrains Mono", label: "JetBrains Mono", category: "Monospace" },
  { value: "Fira Code", label: "Fira Code", category: "Monospace" },
];

const colorPresets = [
  { primary: "#8B5CF6", secondary: "#EC4899", label: "Purple Pink" },
  { primary: "#3B82F6", secondary: "#06B6D4", label: "Blue Cyan" },
  { primary: "#10B981", secondary: "#22C55E", label: "Emerald Green" },
  { primary: "#F59E0B", secondary: "#EF4444", label: "Amber Red" },
  { primary: "#6366F1", secondary: "#8B5CF6", label: "Indigo Violet" },
  { primary: "#EC4899", secondary: "#F43F5E", label: "Pink Rose" },
  { primary: "#0EA5E9", secondary: "#2563EB", label: "Ocean Blue" },
  { primary: "#F97316", secondary: "#FBBF24", label: "Sunset Orange" },
  { primary: "#059669", secondary: "#34D399", label: "Forest Mint" },
  { primary: "#1E293B", secondary: "#475569", label: "Midnight Slate" },
  { primary: "#FB7185", secondary: "#FDA4AF", label: "Coral Blush" },
  { primary: "#A78BFA", secondary: "#C4B5FD", label: "Lavender Dream" },
];

const HEADER_STYLES: { id: HeaderStyle; label: string; description: string; icon: string }[] = [
  {
    id: "pill",
    label: "Floating Capsule (Pill)",
    description: "Sleek floating glass capsule with active glow and smooth animations",
    icon: "💊",
  },
  {
    id: "dock",
    label: "Interactive Glass Dock",
    description: "macOS-style dock with lift micro-interactions, tooltips, and active dots",
    icon: "🖥️",
  },
  {
    id: "banner",
    label: "Glass Banner Header",
    description: "Full-width modern bar featuring your name branding, nav links, and CTA",
    icon: "🏷️",
  },
  {
    id: "rail",
    label: "Minimal Sidebar Rail",
    description: "Ultra-clean vertical dock along the screen edge (left or right)",
    icon: "🧭",
  },
];

const HEADER_POSITIONS: { id: HeaderPosition; label: string; hint: string }[] = [
  { id: "top", label: "Top", hint: "Centered at top of screen" },
  { id: "bottom", label: "Bottom", hint: "Floating near bottom" },
  { id: "left", label: "Left Edge", hint: "Vertical rail on left side" },
  { id: "right", label: "Right Edge", hint: "Vertical rail on right side" },
];

// Font Search component
function FontSearchSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (font: string) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const loadFont = React.useCallback((fontName: string) => {
    const id = `gfont-${fontName.replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);
  }, []);

  React.useEffect(() => {
    loadFont(value);
  }, [value, loadFont]);

  const filteredFonts = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return ALL_FONTS;
    return ALL_FONTS.filter(
      (f) =>
        f.label.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div ref={containerRef} className="relative">
      <div
        className="flex items-center gap-3 h-12 px-4 rounded-lg border border-input bg-background cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Type className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="text-sm font-medium" style={{ fontFamily: value }}>
          {value}
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          {ALL_FONTS.find((f) => f.value === value)?.category || "Font"}
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-lg border border-border bg-background shadow-xl overflow-hidden">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fonts..."
                className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-72 overflow-auto">
            {filteredFonts.map((font) => {
              loadFont(font.value);
              return (
                <button
                  key={font.value}
                  type="button"
                  onClick={() => {
                    onChange(font.value);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 hover:bg-muted/70 transition-colors text-left",
                    value === font.value && "bg-primary/10"
                  )}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {font.category}
                  </span>
                </button>
              );
            })}
            {filteredFonts.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No fonts found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FAITHFUL MINI TEMPLATE LIVE PREVIEWS
// ─────────────────────────────────────────────────────────────

interface MiniPreviewProps {
  theme: IThemeConfig;
  isDark: boolean;
  name: string;
  headline: string;
}

// 1. Modern Aurora Mini Preview
function ModernMiniPreview({ theme, isDark, name, headline }: MiniPreviewProps) {
  const p = theme.primaryColor;
  const s = theme.secondaryColor;

  return (
    <div className="relative p-4 space-y-4 overflow-hidden">
      {/* Aurora Ambient Glow Orbs */}
      <div
        className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none"
        style={{ background: p }}
      />
      <div
        className="absolute top-20 -right-10 w-28 h-28 rounded-full blur-2xl opacity-30 pointer-events-none"
        style={{ background: s }}
      />

      {/* Hero Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-medium bg-muted/80 backdrop-blur-md border border-border">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for work</span>
        </div>
      </div>

      {/* Avatar & Title */}
      <div className="text-center space-y-2 relative z-10">
        <div className="relative inline-block">
          <div
            className="w-12 h-12 rounded-full mx-auto p-0.5 shadow-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${p}, ${s})` }}
          >
            <div className={cn("w-full h-full rounded-full flex items-center justify-center font-bold text-xs", isDark ? "bg-[#0b0f17] text-white" : "bg-white text-zinc-900")}>
              {name.charAt(0)}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-tight">
            {name}
          </h4>
          <p
            className="text-[11px] font-semibold mt-0.5"
            style={{
              backgroundImage: `linear-gradient(135deg, ${p}, ${s})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {headline}
          </p>
        </div>
      </div>

      {/* Skills Chips */}
      <div className="flex flex-wrap justify-center gap-1">
        {["React", "Next.js", "TypeScript", "Tailwind"].map((sk) => (
          <span
            key={sk}
            className="px-2 py-0.5 rounded-full text-[8px] font-medium text-white shadow-sm"
            style={{ background: `linear-gradient(135deg, ${p}, ${s})` }}
          >
            {sk}
          </span>
        ))}
      </div>

      {/* Mini Project Card */}
      <div
        className={cn("p-2.5 rounded-xl border transition-all relative overflow-hidden", isDark ? "bg-white/5 border-white/10" : "bg-zinc-50 border-zinc-200")}
      >
        <div
          className="h-12 rounded-lg mb-2 flex items-center justify-center text-[10px] font-semibold text-white/80"
          style={{ background: `linear-gradient(135deg, ${p}60, ${s}60)` }}
        >
          <Sparkles className="h-3.5 w-3.5 mr-1" /> Featured Project
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold">Design System App</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded font-mono" style={{ background: `${p}20`, color: p }}>
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}

// 2. Cyberpunk Terminal Mini Preview
function CyberMiniPreview({ theme, isDark, name, headline }: MiniPreviewProps) {
  const p = theme.primaryColor;
  const s = theme.secondaryColor;

  return (
    <div
      className={cn(
        "p-3 space-y-3 font-mono relative overflow-hidden text-xs",
        isDark ? "bg-[#06090e] text-zinc-200" : "bg-zinc-100 text-zinc-800"
      )}
    >
      {/* Terminal Titlebar */}
      <div
        className={cn(
          "flex items-center justify-between px-2 py-1 rounded border text-[9px]",
          isDark ? "bg-zinc-900/90 border-zinc-800 text-zinc-400" : "bg-white border-zinc-300 text-zinc-600"
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span className="ml-1 text-[8px] opacity-70">bash ~ sys_core</span>
        </div>
        <span className="text-[8px] px-1 rounded" style={{ color: p, background: `${p}15` }}>
          ONLINE
        </span>
      </div>

      {/* Cyber Prompt & Telemetry */}
      <div className="space-y-1 text-[10px]">
        <div className="flex items-center gap-1 text-[9px] opacity-60">
          <Terminal className="h-3 w-3" style={{ color: p }} />
          <span>&gt; query --profile {name.toLowerCase().replace(/\s+/g, "_")}</span>
        </div>
        <p className="font-bold text-xs" style={{ color: p }}>
          &gt; {name.toUpperCase()}
        </p>
        <p className="text-[9px] opacity-80">&gt; ROLE: {headline}</p>
      </div>

      {/* Cyber Tags */}
      <div className="grid grid-cols-2 gap-1 text-[8px]">
        {["[REACT.TS]", "[NEXT_15]", "[GSAP_V3]", "[WEB_GL]"].map((tag) => (
          <div
            key={tag}
            className="p-1 rounded border text-center font-bold"
            style={{
              borderColor: `${p}40`,
              background: `${p}08`,
              color: p,
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Code Snippet Card */}
      <div
        className="p-2 rounded border space-y-1 text-[8px]"
        style={{ borderColor: `${s}40`, background: isDark ? "#0c1017" : "#f4f4f5" }}
      >
        <div className="flex items-center justify-between text-[8px] opacity-70">
          <span>// sys_module_01.ts</span>
          <span style={{ color: s }}>0 ERRORS</span>
        </div>
        <p className="opacity-90 font-mono text-[8px]">
          <span style={{ color: p }}>const</span> status = <span style={{ color: s }}>&apos;CYBER_READY&apos;</span>;
        </p>
      </div>
    </div>
  );
}

// 3. Editorial Minimalist Mini Preview
function EditorialMiniPreview({ theme, isDark, name, headline }: MiniPreviewProps) {
  const p = theme.primaryColor;

  return (
    <div
      className={cn(
        "p-4 space-y-3 relative overflow-hidden",
        isDark ? "bg-[#0c0d0e] text-zinc-100" : "bg-[#fbfbfb] text-zinc-900"
      )}
    >
      {/* Masthead Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-border text-[8px] font-mono tracking-widest uppercase opacity-70">
        <span>VOL. 01 / INDEX</span>
        <span>EDITION 2026</span>
      </div>

      {/* Editorial Headline */}
      <div className="space-y-1 text-center py-2">
        <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: p }}>
          SELECTED WORKS &amp; RECORD
        </span>
        <h3 className="text-base font-serif font-medium tracking-tight leading-tight">
          {name}
        </h3>
        <p className="text-[10px] font-serif italic text-muted-foreground">
          &mdash; {headline} &mdash;
        </p>
      </div>

      {/* Editorial Row 01 */}
      <div className="space-y-1 pt-1 border-t border-border">
        <div className="flex items-center justify-between text-[9px]">
          <span className="font-serif font-bold">01. Digital Architecture</span>
          <span className="font-mono text-[8px] text-muted-foreground">2026</span>
        </div>
        <p className="text-[8px] text-muted-foreground line-clamp-1">
          Precision typography &amp; refined minimalist software craftsmanship.
        </p>
      </div>

      {/* Editorial Row 02 */}
      <div className="space-y-1 pt-1 border-t border-border">
        <div className="flex items-center justify-between text-[9px]">
          <span className="font-serif font-bold">02. Creative Direction</span>
          <span className="font-mono text-[8px]" style={{ color: p }}>
            ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}

// 4. Bento Studio Mini Preview
function BentoMiniPreview({ theme, isDark, name, headline }: MiniPreviewProps) {
  const p = theme.primaryColor;
  const s = theme.secondaryColor;

  return (
    <div className="p-3 space-y-2">
      {/* 4-Quadrant Bento Grid */}
      <div className="grid grid-cols-2 gap-2 text-left">
        {/* Cell 1: Main Intro Bento Card (Span 2) */}
        <div
          className={cn(
            "col-span-2 p-2.5 rounded-xl border relative overflow-hidden",
            isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-zinc-50 border-zinc-200"
          )}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="p-1 rounded-md text-white text-[8px]"
              style={{ background: `linear-gradient(135deg, ${p}, ${s})` }}
            >
              <Sparkles className="h-2.5 w-2.5" />
            </span>
            <span className="text-[9px] font-bold">{name}</span>
          </div>
          <p className="text-[9px] text-muted-foreground line-clamp-1">
            {headline}
          </p>
        </div>

        {/* Cell 2: Avatar / Status Card */}
        <div
          className={cn(
            "p-2 rounded-xl border flex flex-col items-center justify-center text-center",
            isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-zinc-50 border-zinc-200"
          )}
        >
          <div
            className="w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center mb-1 shadow-sm"
            style={{ background: `linear-gradient(135deg, ${p}, ${s})` }}
          >
            {name.charAt(0)}
          </div>
          <span className="text-[8px] font-semibold text-emerald-500">
            ● Available
          </span>
        </div>

        {/* Cell 3: Metrics / Tech Card */}
        <div
          className={cn(
            "p-2 rounded-xl border flex flex-col justify-center",
            isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-zinc-50 border-zinc-200"
          )}
        >
          <span className="text-xs font-bold font-mono" style={{ color: p }}>
            10+
          </span>
          <span className="text-[8px] text-muted-foreground">
            Projects Built
          </span>
        </div>

        {/* Cell 4: Tech Stack Bento Pill Card (Span 2) */}
        <div
          className={cn(
            "col-span-2 p-2 rounded-xl border flex items-center justify-between",
            isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-zinc-50 border-zinc-200"
          )}
        >
          <span className="text-[8px] font-bold text-muted-foreground">STACK</span>
          <div className="flex gap-1">
            {["React", "Next.js", "GSAP"].map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[7px] font-semibold"
                style={{ background: `${p}15`, color: p }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPREHENSIVE MINI PREVIEW CONTAINER WITH DYNAMIC NAVBAR
// ─────────────────────────────────────────────────────────────

function ThemePreview({
  theme,
  portfolio,
}: {
  theme: IThemeConfig;
  portfolio: IPortfolio | null;
}) {
  const [previewMode, setPreviewMode] = React.useState<"light" | "dark">("dark");

  // Load font dynamically
  React.useEffect(() => {
    const fontName = theme.fontFamily;
    const id = `gfont-preview-${fontName.replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);
  }, [theme.fontFamily]);

  const isDark = previewMode === "dark";
  const p = theme.primaryColor;
  const s = theme.secondaryColor;
  const tmpl = theme.template || "modern";
  const showHeader = theme.showHeader ?? true;
  const headerStyle = theme.headerStyle || "pill";
  const headerPosition = theme.headerPosition || "top";

  const displayName = portfolio?.content?.displayName || "John Doe";
  const headline = portfolio?.content?.headline || "Full Stack Engineer & Designer";

  return (
    <div className="space-y-2">
      {/* Preview Controls Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground uppercase tracking-wider text-[10px]">
            {tmpl} View
          </span>
          <span>&bull;</span>
          <span className="text-[10px]" style={{ fontFamily: theme.fontFamily }}>
            {theme.fontFamily}
          </span>
        </div>

        {/* Quick Light / Dark Simulator Toggle */}
        <div className="flex items-center p-0.5 rounded-lg border bg-muted/40">
          <button
            type="button"
            onClick={() => setPreviewMode("light")}
            className={cn(
              "p-1 rounded-md text-xs transition-colors",
              !isDark ? "bg-background text-foreground shadow-sm font-bold" : "text-muted-foreground hover:text-foreground"
            )}
            title="Preview in Light Mode"
          >
            <Sun className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode("dark")}
            className={cn(
              "p-1 rounded-md text-xs transition-colors",
              isDark ? "bg-background text-foreground shadow-sm font-bold" : "text-muted-foreground hover:text-foreground"
            )}
            title="Preview in Dark Mode"
          >
            <Moon className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Main Mini Device Screen */}
      <div
        className={cn(
          "rounded-2xl overflow-hidden border shadow-2xl relative transition-all duration-300 min-h-[380px] flex flex-col justify-between",
          isDark ? "bg-[#0b0f17] text-white border-zinc-800" : "bg-white text-zinc-900 border-zinc-200"
        )}
        style={{ fontFamily: theme.fontFamily }}
      >
        {/* TOP NAVBAR PREVIEW */}
        {showHeader && (headerPosition === "top" || headerStyle === "banner") && (
          <div className="p-2 z-20 sticky top-0">
            {headerStyle === "banner" ? (
              <div
                className={cn(
                  "px-3 py-1.5 rounded-xl border flex items-center justify-between shadow-sm",
                  isDark ? "bg-white/10 border-white/10" : "bg-white border-zinc-200"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${p}, ${s})` }}
                  >
                    {displayName.charAt(0)}
                  </div>
                  <span className="text-[9px] font-bold">{displayName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] px-1.5 py-0.5 rounded text-white font-bold" style={{ background: p }}>
                    About
                  </span>
                  <span className="text-[8px] opacity-60">Works</span>
                </div>
              </div>
            ) : headerStyle === "dock" ? (
              <div className="flex justify-center">
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border shadow-lg",
                    isDark ? "bg-zinc-900/90 border-zinc-700" : "bg-white/90 border-zinc-200"
                  )}
                >
                  <span className="w-2.5 h-2.5 rounded-md flex items-center justify-center text-[8px] text-white" style={{ background: p }}>
                    ●
                  </span>
                  <span className="w-2.5 h-2.5 rounded-md bg-muted" />
                  <span className="w-2.5 h-2.5 rounded-md bg-muted" />
                </div>
              </div>
            ) : (
              /* Pill */
              <div className="flex justify-center">
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-md",
                    isDark ? "bg-zinc-900/90 border-zinc-700" : "bg-white/90 border-zinc-200"
                  )}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: p }} />
                  <span className="w-2 h-2 rounded-full bg-muted" />
                  <span className="w-2 h-2 rounded-full bg-muted" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SIDEBAR RAIL PREVIEWS (Left / Right) */}
        {showHeader && (headerPosition === "left" || headerStyle === "rail") && headerPosition !== "right" && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
            <div
              className={cn(
                "p-1.5 rounded-xl border flex flex-col gap-1.5 shadow-lg",
                isDark ? "bg-zinc-900/95 border-zinc-700" : "bg-white/95 border-zinc-200"
              )}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: p }} />
              <span className="w-2.5 h-2.5 rounded-full bg-muted" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted" />
            </div>
          </div>
        )}

        {showHeader && headerPosition === "right" && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
            <div
              className={cn(
                "p-1.5 rounded-xl border flex flex-col gap-1.5 shadow-lg",
                isDark ? "bg-zinc-900/95 border-zinc-700" : "bg-white/95 border-zinc-200"
              )}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: p }} />
              <span className="w-2.5 h-2.5 rounded-full bg-muted" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted" />
            </div>
          </div>
        )}

        {/* Dynamic Template Body Preview */}
        <div className="flex-1 flex flex-col justify-center">
          {tmpl === "cyber" && (
            <CyberMiniPreview theme={theme} isDark={isDark} name={displayName} headline={headline} />
          )}
          {tmpl === "editorial" && (
            <EditorialMiniPreview theme={theme} isDark={isDark} name={displayName} headline={headline} />
          )}
          {tmpl === "bento" && (
            <BentoMiniPreview theme={theme} isDark={isDark} name={displayName} headline={headline} />
          )}
          {tmpl === "modern" && (
            <ModernMiniPreview theme={theme} isDark={isDark} name={displayName} headline={headline} />
          )}
        </div>

        {/* BOTTOM NAVBAR PREVIEW */}
        {showHeader && headerPosition === "bottom" && headerStyle !== "banner" && (
          <div className="p-2 z-20 sticky bottom-0 flex justify-center">
            {headerStyle === "dock" ? (
              <div
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border shadow-lg",
                  isDark ? "bg-zinc-900/90 border-zinc-700" : "bg-white/90 border-zinc-200"
                )}
              >
                <span className="w-2.5 h-2.5 rounded-md flex items-center justify-center text-[8px] text-white" style={{ background: p }}>
                  ●
                </span>
                <span className="w-2.5 h-2.5 rounded-md bg-muted" />
                <span className="w-2.5 h-2.5 rounded-md bg-muted" />
              </div>
            ) : (
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-md",
                  isDark ? "bg-zinc-900/90 border-zinc-700" : "bg-white/90 border-zinc-200"
                )}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: p }} />
                <span className="w-2 h-2 rounded-full bg-muted" />
                <span className="w-2 h-2 rounded-full bg-muted" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN THEME FORM COMPONENT
// ─────────────────────────────────────────────────────────────

interface ThemeFormProps {
  portfolio: IPortfolio | null;
}

export function ThemeForm({ portfolio }: ThemeFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);
  const [theme, setTheme] = React.useState<IThemeConfig>({
    primaryColor: portfolio?.themeConfig?.primaryColor || "#8B5CF6",
    secondaryColor: portfolio?.themeConfig?.secondaryColor || "#EC4899",
    fontFamily: portfolio?.themeConfig?.fontFamily || "Inter",
    mode: portfolio?.themeConfig?.mode || "system",
    template: portfolio?.themeConfig?.template || "modern",
    showHeader: portfolio?.themeConfig?.showHeader ?? true,
    headerStyle: portfolio?.themeConfig?.headerStyle || "pill",
    headerPosition: portfolio?.themeConfig?.headerPosition || "top",
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateThemeConfig(theme);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch {
      alert("Failed to save theme");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Theme &amp; Templates</h1>
          <p className="text-muted-foreground">
            Customize your portfolio view template, navbar layout, colors, and typography
          </p>
        </div>
        <Button variant="gradient" onClick={handleSave} isLoading={isSaving}>
          <span className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </span>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Settings Column */}
        <div className="space-y-6">
          {/* 1. Portfolio Template Selection */}
          <Card className="border-primary/20 bg-gradient-to-b from-card to-card/50 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <LayoutTemplate className="h-5 w-5 text-primary" />
                  Portfolio View Template
                </CardTitle>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                  4 Designs Available
                </span>
              </div>
              <CardDescription>
                Select the structural layout and animation style for your public portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AVAILABLE_TEMPLATES.map((tmpl) => {
                  const isSelected = (theme.template || "modern") === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setTheme({ ...theme, template: tmpl.id })}
                      className={cn(
                        "relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between group hover:scale-[1.01]",
                        isSelected
                          ? "border-primary bg-primary/[0.04] ring-2 ring-primary/20 shadow-md"
                          : "border-border/80 bg-background/50 hover:border-primary/50"
                      )}
                    >
                      <div>
                        {/* Header with Title and Selected Badge */}
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                              {tmpl.title}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium text-muted-foreground">
                              {tmpl.badge}
                            </span>
                          </div>
                          {isSelected ? (
                            <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                              <Check className="h-3 w-3" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-border group-hover:border-primary/50" />
                          )}
                        </div>

                        {/* Subtitle & Description */}
                        <p className="text-xs font-medium text-primary mb-1.5">{tmpl.subtitle}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                          {tmpl.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-border/40">
                        {tmpl.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 2. Header & Navigation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Compass className="h-5 w-5 text-primary" />
                Header &amp; Navigation
              </CardTitle>
              <CardDescription>
                Customize your portfolio&apos;s navigation style, positioning, and visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Header Visibility Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
                <div className="space-y-0.5">
                  <div className="text-sm font-semibold flex items-center gap-2">
                    <span>Show Navigation Bar</span>
                    {theme.showHeader !== false ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                        Enabled
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Display floating or banner navigation for visitors to jump between sections
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setTheme({
                      ...theme,
                      showHeader: theme.showHeader === false ? true : false,
                    })
                  }
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5",
                    theme.showHeader !== false ? "bg-primary" : "bg-muted border border-border"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                      theme.showHeader !== false ? "translate-x-6" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {theme.showHeader !== false && (
                <div className="space-y-5 pt-2">
                  {/* Header Style */}
                  <div>
                    <label className="text-sm font-semibold mb-2.5 block">
                      Navigation Shape &amp; Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {HEADER_STYLES.map((st) => {
                        const isSelected = (theme.headerStyle || "pill") === st.id;
                        return (
                          <div
                            key={st.id}
                            onClick={() => setTheme({ ...theme, headerStyle: st.id })}
                            className={cn(
                              "p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.01]",
                              isSelected
                                ? "border-primary bg-primary/[0.04] ring-2 ring-primary/20 shadow-sm"
                                : "border-border hover:border-primary/40 bg-background"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-bold flex items-center gap-1.5">
                                <span>{st.icon}</span>
                                <span>{st.label}</span>
                              </span>
                              {isSelected && <Check className="h-4 w-4 text-primary" />}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {st.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Header Position */}
                  <div>
                    <label className="text-sm font-semibold mb-2.5 block">
                      Placement &amp; Position
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {HEADER_POSITIONS.map((pos) => {
                        const isSelected = (theme.headerPosition || "top") === pos.id;
                        return (
                          <button
                            key={pos.id}
                            type="button"
                            onClick={() => setTheme({ ...theme, headerPosition: pos.id })}
                            className={cn(
                              "p-3 rounded-xl border-2 transition-all text-left flex flex-col justify-between hover:scale-[1.02]",
                              isSelected
                                ? "border-primary bg-primary/[0.04] ring-2 ring-primary/20 shadow-sm"
                                : "border-border hover:border-primary/40 bg-background"
                            )}
                          >
                            <span className="text-xs font-bold text-foreground mb-0.5">
                              {pos.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground leading-tight">
                              {pos.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 3. Color Presets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Color Presets
              </CardTitle>
              <CardDescription>
                Choose a curated color palette for accents, badges, and glows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() =>
                      setTheme({
                        ...theme,
                        primaryColor: preset.primary,
                        secondaryColor: preset.secondary,
                      })
                    }
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all group hover:scale-[1.02] text-left",
                      theme.primaryColor === preset.primary &&
                        theme.secondaryColor === preset.secondary
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex gap-1.5 mb-2">
                      <div
                        className="h-7 w-7 rounded-full ring-2 ring-white/50 shadow-sm"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="h-7 w-7 rounded-full ring-2 ring-white/50 shadow-sm"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 4. Custom Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
              <CardDescription>
                Or define your exact brand hex colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) =>
                        setTheme({ ...theme, primaryColor: e.target.value })
                      }
                      className="h-10 w-14 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={(e) =>
                        setTheme({ ...theme, primaryColor: e.target.value })
                      }
                      className="h-10 w-28 px-3 rounded-lg border border-input bg-background text-sm font-mono uppercase"
                    />
                    <div
                      className="h-10 flex-1 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}80)`,
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Secondary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) =>
                        setTheme({ ...theme, secondaryColor: e.target.value })
                      }
                      className="h-10 w-14 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={theme.secondaryColor}
                      onChange={(e) =>
                        setTheme({ ...theme, secondaryColor: e.target.value })
                      }
                      className="h-10 w-28 px-3 rounded-lg border border-input bg-background text-sm font-mono uppercase"
                    />
                    <div
                      className="h-10 flex-1 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${theme.secondaryColor}, ${theme.secondaryColor}80)`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Gradient Preview */}
              <div className="mt-4">
                <label className="text-xs text-muted-foreground mb-1.5 block">Gradient Preview</label>
                <div
                  className="h-10 rounded-lg shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* 5. Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                Typography
              </CardTitle>
              <CardDescription>
                Choose a font for your portfolio ({ALL_FONTS.length} Google Fonts available)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FontSearchSelect
                value={theme.fontFamily}
                onChange={(font) => setTheme({ ...theme, fontFamily: font })}
              />

              {/* Font Preview */}
              <div className="mt-4 p-4 rounded-lg border bg-muted/30" style={{ fontFamily: theme.fontFamily }}>
                <p className="text-2xl font-bold mb-1">The Quick Brown Fox</p>
                <p className="text-sm text-muted-foreground">
                  Jumps over the lazy dog &mdash; 0123456789
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  {theme.fontFamily}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 6. Appearance Mode */}
          <Card>
            <CardHeader>
              <CardTitle>Default Appearance</CardTitle>
              <CardDescription>
                Set the default color mode for first-time visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setTheme({ ...theme, mode: "light" })}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 hover:scale-[1.02]",
                    theme.mode === "light"
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Sun className="h-6 w-6" />
                  <span className="text-sm">Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme({ ...theme, mode: "dark" })}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 hover:scale-[1.02]",
                    theme.mode === "dark"
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Moon className="h-6 w-6" />
                  <span className="text-sm">Dark</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme({ ...theme, mode: "system" })}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 hover:scale-[1.02]",
                    theme.mode === "system"
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Monitor className="h-6 w-6" />
                  <span className="text-sm">System</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Live Preview Column */}
        <div className="lg:sticky lg:top-6 lg:self-start space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Eye className="h-4 w-4 text-primary" />
            Live Preview
          </div>
          <ThemePreview theme={theme} portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}
