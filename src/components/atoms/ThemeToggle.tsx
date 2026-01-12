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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full", className)}
        disabled
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full", className)}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" />
        )}
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border p-1 bg-muted",
        className
      )}
    >
      <button
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
          !isDark && "bg-background shadow-sm"
        )}
        onClick={() => setTheme("light")}
      >
        <Sun className={cn("h-4 w-4", !isDark && "text-primary")} />
      </button>
      <button
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
          isDark && "bg-background shadow-sm"
        )}
        onClick={() => setTheme("dark")}
      >
        <Moon className={cn("h-4 w-4", isDark && "text-primary")} />
      </button>
    </div>
  );
}
