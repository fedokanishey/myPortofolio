"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderKanban,
  Palette,
  Settings,
  Eye,
  ChevronRight,
  Award,
} from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/certifications", label: "Certifications", icon: Award },
  { href: "/dashboard/theme", label: "Theme", icon: Palette },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  slug?: string;
}

export function DashboardLayout({ children, slug }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(true); // Default: collapsed
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Load collapsed state from localStorage after hydration
  React.useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") {
      setCollapsed(true);
    }
    setIsHydrated(true);
  }, []);

  // Persist collapsed state to localStorage
  React.useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("sidebar-collapsed", String(collapsed));
    }
  }, [collapsed, isHydrated]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 border-r border-border bg-card transition-all duration-300 overflow-hidden",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Top Section: Logo + Navigation - takes remaining space */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Logo/Header */}
            <div className={cn(
              "flex h-14 items-center border-b border-border px-3 shrink-0",
              collapsed ? "justify-center" : "justify-between"
            )}>
              {!collapsed && (
                <Link href="/" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-sm">PB</span>
                  </div>
                  <span className="font-semibold truncate">Dashboard</span>
                </Link>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className={cn(
                  "p-2 rounded-lg hover:bg-muted transition-colors shrink-0",
                  collapsed && "mx-auto"
                )}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    collapsed ? "" : "rotate-180"
                  )}
                />
              </button>
            </div>

            {/* Navigation - scrollable when too many items */}
            <nav className="flex-1 overflow-y-auto space-y-1 p-2">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      collapsed && "justify-center px-2",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    title={collapsed ? link.label : undefined}
                  >
                    <link.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Section - shrink-0 keeps it always visible */}
          <div className="shrink-0">
            {/* Preview Link */}
            {slug && (
              <div className="p-2 border-t border-border">
                <Link
                  href={`/${slug}`}
                  target="_blank"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                    collapsed && "justify-center px-2",
                    "bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary hover:from-primary/20 hover:to-purple-500/20 transition-all"
                  )}
                  title={collapsed ? "View Portfolio" : undefined}
                >
                  <Eye className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>View Portfolio</span>}
                </Link>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-border p-3">
              <div className={cn(
                "flex items-center gap-2",
                collapsed ? "flex-col" : "flex-row justify-between"
              )}>
                {collapsed && <ThemeToggle variant="icon" />}
                <UserButton
                  afterSwitchSessionUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
                {!collapsed && <ThemeToggle variant="icon" />}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
