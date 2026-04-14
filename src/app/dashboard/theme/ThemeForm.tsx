"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Palette, Sun, Moon, Monitor, Save, Search, Type, Eye } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/Card";
import { updateThemeConfig } from "@/actions/portfolio";
import type { IPortfolio, IThemeConfig } from "@/models/Portfolio";
import { cn } from "@/lib/utils";

// Extended font list with Google Fonts CDN URLs — all available via next/font or CDN
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

  // Load Google Font CSS when selecting a font for preview
  const loadFont = React.useCallback((fontName: string) => {
    const id = `gfont-${fontName.replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);
  }, []);

  // Load current font
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
      {/* Current font display + search */}
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
          {/* Search */}
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
          {/* Font list */}
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

// Mini Portfolio Preview
function ThemePreview({
  theme,
}: {
  theme: IThemeConfig;
}) {
  // Load the selected font
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

  const isDark = theme.mode === "dark";
  const bg = isDark ? "#0f172a" : "#ffffff";
  const textColor = isDark ? "#f1f5f9" : "#0f172a";
  const mutedColor = isDark ? "#94a3b8" : "#64748b";
  const cardBg = isDark ? "#1e293b" : "#f8fafc";

  return (
    <div
      className="rounded-xl overflow-hidden border shadow-lg"
      style={{
        fontFamily: theme.fontFamily,
        background: bg,
        color: textColor,
      }}
    >
      {/* Mini Navbar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: isDark ? "#334155" : "#e2e8f0" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
            }}
          />
          <span className="text-xs font-bold">Portfolio</span>
        </div>
        <div className="flex gap-3">
          {["About", "Projects", "Contact"].map((item) => (
            <span key={item} className="text-[10px]" style={{ color: mutedColor }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="px-5 py-6 text-center">
        <div
          className="h-14 w-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-sm font-bold"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          }}
        >
          JD
        </div>
        <h3 className="text-base font-bold mb-1">John Doe</h3>
        <p className="text-xs mb-3" style={{ color: theme.primaryColor }}>
          Full Stack Developer
        </p>
        <div className="flex justify-center gap-1.5 flex-wrap">
          {["React", "Node.js", "TypeScript"].map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-full text-[10px] text-white font-medium"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Project Card Mock */}
      <div className="px-5 pb-5">
        <div
          className="rounded-lg p-3"
          style={{ background: cardBg }}
        >
          <div
            className="h-16 rounded-md mb-2"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}25, ${theme.secondaryColor}25)`,
            }}
          />
          <div className="text-xs font-semibold mb-1">My Project</div>
          <div className="text-[10px]" style={{ color: mutedColor }}>
            A beautifully crafted application...
          </div>
          <div className="flex gap-1 mt-2">
            <span
              className="px-1.5 py-0.5 rounded text-[8px]"
              style={{ background: `${theme.primaryColor}15`, color: theme.primaryColor }}
            >
              React
            </span>
            <span
              className="px-1.5 py-0.5 rounded text-[8px]"
              style={{ background: `${theme.secondaryColor}15`, color: theme.secondaryColor }}
            >
              Next.js
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Theme</h1>
          <p className="text-muted-foreground">
            Customize the look and feel of your portfolio
          </p>
        </div>
        <Button variant="gradient" onClick={handleSave} isLoading={isSaving}>
          <span className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </span>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Settings Column */}
        <div className="space-y-6">
          {/* Color Presets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Presets
              </CardTitle>
              <CardDescription>
                Choose a color combination for your portfolio
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
                      "p-3 rounded-lg border-2 transition-all group hover:scale-[1.02]",
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
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
              <CardDescription>
                Or pick your own custom colors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) =>
                          setTheme({ ...theme, primaryColor: e.target.value })
                        }
                        className="h-10 w-14 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={(e) =>
                        setTheme({ ...theme, primaryColor: e.target.value })
                      }
                      className="h-10 w-28 px-3 rounded-lg border border-input bg-background text-sm font-mono uppercase"
                    />
                    {/* Color preview swatch */}
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
                    <div className="relative">
                      <input
                        type="color"
                        value={theme.secondaryColor}
                        onChange={(e) =>
                          setTheme({ ...theme, secondaryColor: e.target.value })
                        }
                        className="h-10 w-14 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
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
                  className="h-12 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Font Family — Searchable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Typography
              </CardTitle>
              <CardDescription>
                Choose a font for your portfolio ({ALL_FONTS.length} fonts available)
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
                  Jumps over the lazy dog — 0123456789
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  {theme.fontFamily}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Theme Mode */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Set the default theme mode for visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button
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

        {/* Sticky Preview Column */}
        <div className="lg:sticky lg:top-4 lg:self-start space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Eye className="h-4 w-4" />
            Live Preview
          </div>
          <ThemePreview theme={theme} />
        </div>
      </div>
    </div>
  );
}
