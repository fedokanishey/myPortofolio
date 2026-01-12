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
} from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/theme", label: "Theme", icon: Palette },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  slug?: string;
}

export function DashboardLayout({ children, slug }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            {!collapsed && (
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PB</span>
                </div>
                <span className="font-semibold">Dashboard</span>
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  collapsed ? "" : "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && link.label}
                </Link>
              );
            })}
          </nav>

          {/* Preview Link */}
          {slug && (
            <div className="p-2 border-t border-border">
              <Link
                href={`/${slug}`}
                target="_blank"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                  "bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary hover:from-primary/20 hover:to-purple-500/20 transition-all"
                )}
              >
                <Eye className="h-5 w-5 shrink-0" />
                {!collapsed && "View Portfolio"}
              </Link>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <UserButton
                afterSwitchSessionUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
              {!collapsed && <ThemeToggle variant="icon" />}
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
