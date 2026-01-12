"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Palette, Sun, Moon, Monitor, Save } from "lucide-react";
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

const fontOptions = [
  { value: "Inter", label: "Inter" },
  { value: "Roboto", label: "Roboto" },
  { value: "Poppins", label: "Poppins" },
  { value: "Outfit", label: "Outfit" },
  { value: "Space Grotesk", label: "Space Grotesk" },
];

const colorPresets = [
  { primary: "#8B5CF6", secondary: "#EC4899", label: "Purple Pink" },
  { primary: "#3B82F6", secondary: "#06B6D4", label: "Blue Cyan" },
  { primary: "#10B981", secondary: "#22C55E", label: "Emerald Green" },
  { primary: "#F59E0B", secondary: "#EF4444", label: "Amber Red" },
  { primary: "#6366F1", secondary: "#8B5CF6", label: "Indigo Violet" },
  { primary: "#EC4899", secondary: "#F43F5E", label: "Pink Rose" },
];

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                  "p-4 rounded-lg border-2 transition-all",
                  theme.primaryColor === preset.primary
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex gap-1 mb-2">
                  <div
                    className="h-8 w-8 rounded-full"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="h-8 w-8 rounded-full"
                    style={{ backgroundColor: preset.secondary }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{preset.label}</span>
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
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    setTheme({ ...theme, primaryColor: e.target.value })
                  }
                  className="h-10 w-20 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) =>
                    setTheme({ ...theme, primaryColor: e.target.value })
                  }
                  className="h-10 px-3 rounded-lg border border-input bg-background text-sm font-mono"
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
                  className="h-10 w-20 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) =>
                    setTheme({ ...theme, secondaryColor: e.target.value })
                  }
                  className="h-10 px-3 rounded-lg border border-input bg-background text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Font Family */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>
            Choose a font for your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {fontOptions.map((font) => (
              <button
                key={font.value}
                onClick={() => setTheme({ ...theme, fontFamily: font.value })}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-center",
                  theme.fontFamily === font.value
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                )}
                style={{ fontFamily: font.value }}
              >
                <span className="text-lg">{font.label}</span>
              </button>
            ))}
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
                "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
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
                "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
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
                "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
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

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            See how your theme looks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="p-8 rounded-lg text-center space-y-4"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}20, ${theme.secondaryColor}20)`,
              fontFamily: theme.fontFamily,
            }}
          >
            <div
              className="h-20 w-20 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
              }}
            >
              JD
            </div>
            <h3 className="text-2xl font-bold">John Doe</h3>
            <p style={{ color: theme.primaryColor }} className="font-medium">
              Full Stack Developer
            </p>
            <div className="flex justify-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: theme.primaryColor }}
              >
                React
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                Node.js
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
