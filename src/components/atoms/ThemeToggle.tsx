"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface ThemeToggleProps {
  className?: string;
  variant?: "button" | "icon";
}

export function ThemeToggle({ className, variant = "button" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full text-foreground h-9 w-9", className)}
        disabled
      >
        <Sun className="h-4 w-4 text-amber-500 opacity-50" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full text-foreground hover:bg-muted/80 h-9 w-9 flex items-center justify-center transition-all",
          className
        )}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0 scale-100 hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-slate-800 transition-transform duration-300 rotate-0 scale-100 hover:-rotate-12" />
        )}
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-border p-1 bg-muted/80 backdrop-blur-md",
        className
      )}
    >
      <button
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200",
          !isDark ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => setTheme("light")}
        title="Light Mode"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200",
          isDark ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => setTheme("dark")}
        title="Dark Mode"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
