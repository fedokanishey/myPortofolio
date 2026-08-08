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
  Award,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { PersistentBackgroundSystem } from "@/components/backgrounds";
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
  const [collapsed, setCollapsed] = React.useState(false); // Desktop collapsed state
  const [mobileOpen, setMobileOpen] = React.useState(false); // Mobile drawer state
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Load desktop collapsed state from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") {
      setCollapsed(true);
    } else if (saved === "false") {
      setCollapsed(false);
    }
    setIsHydrated(true);
  }, []);

  // Persist desktop collapsed state
  React.useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("sidebar-collapsed", String(collapsed));
    }
  }, [collapsed, isHydrated]);

  // Close mobile drawer whenever route changes
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground relative selection:bg-indigo-500/30 selection:text-foreground">
      {/* Persistent Background with soft ambient orbs and subtle dot matrix */}
      <PersistentBackgroundSystem
        primaryColor="#6366F1"
        secondaryColor="#8B5CF6"
        showParticles={false}
        showNoise={false}
      />

      {/* Mobile Top App Bar (< md) */}
      <header className="md:hidden sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/80 bg-card/90 dark:bg-[#090d14]/90 backdrop-blur-xl px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl border border-border/70 hover:bg-muted text-foreground transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <BrandLogo variant="full" size="sm" href="/" />
        </div>

        <div className="flex items-center gap-2">
          {slug && (
            <Link
              href={`/${slug}`}
              target="_blank"
              className="p-2 rounded-xl border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-all text-xs font-semibold flex items-center gap-1.5"
              title="View Live Portfolio"
            >
              <Eye className="h-4 w-4" />
            </Link>
          )}
          <ThemeToggle variant="icon" />
          <UserButton
            afterSwitchSessionUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 ring-2 ring-primary/20",
              },
            }}
          />
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer (Layer on top) */}
      <aside
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-card dark:bg-[#0c1017] border-r border-border/80 shadow-2xl flex flex-col transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-border/80 px-4 shrink-0">
          <BrandLogo variant="full" size="sm" href="/" />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close Navigation Menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex-1 overflow-y-auto space-y-1.5 p-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <link.icon className={cn("h-5 w-5 shrink-0", isActive && "text-white")} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Drawer Footer */}
        <div className="p-4 border-t border-border/80 space-y-3 shrink-0">
          {slug && (
            <Link
              href={`/${slug}`}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full rounded-xl py-2.5 px-3 text-sm font-semibold bg-gradient-to-r from-primary/15 via-purple-500/15 to-primary/10 text-primary border border-primary/20 hover:from-primary/25 transition-all shadow-sm"
            >
              <Eye className="h-4 w-4" />
              <span>View Live Portfolio</span>
            </Link>
          )}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <UserButton
                afterSwitchSessionUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 ring-2 ring-primary/20",
                  },
                }}
              />
              <span className="text-xs text-muted-foreground font-mono">Account</span>
            </div>
            <ThemeToggle variant="icon" />
          </div>
        </div>
      </aside>

      {/* Desktop Persistent Sidebar (hidden on mobile, visible on md+) */}
      <aside
        className={cn(
          "hidden md:flex fixed inset-y-0 left-0 z-40 border-r border-border/80 bg-card/85 dark:bg-[#090d14]/90 backdrop-blur-2xl transition-all duration-300 shadow-sm flex-col overflow-visible",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Floating Toggle Button on the Divider Border Line (Half in, Half out) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-5 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border/80 bg-background dark:bg-[#121722] text-muted-foreground hover:text-foreground shadow-md hover:shadow-lg transition-all hover:scale-110 cursor-pointer focus:outline-none"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>

        <div className="flex flex-col h-full overflow-hidden">
          {/* Top Section: Header & Links */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Header with Logo */}
            <div
              className={cn(
                "flex h-16 items-center border-b border-border/80 px-4 shrink-0 transition-all",
                collapsed ? "justify-center px-2" : "justify-start"
              )}
            >
              {collapsed ? (
                <BrandLogo variant="icon" size="sm" href="/" />
              ) : (
                <BrandLogo variant="full" size="sm" href="/" />
              )}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="flex-1 overflow-y-auto space-y-1.5 p-2.5">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all relative group",
                      collapsed && "justify-center px-2",
                      isActive
                        ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                    title={collapsed ? link.label : undefined}
                  >
                    <link.icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                        isActive && "text-white"
                      )}
                    />
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Bottom Section */}
          <div className="shrink-0">
            {/* View Portfolio Link */}
            {slug && (
              <div className="p-2.5 border-t border-border/80">
                <Link
                  href={`/${slug}`}
                  target="_blank"
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold",
                    collapsed && "justify-center px-2",
                    "bg-gradient-to-r from-primary/15 via-purple-500/15 to-primary/10 text-primary border border-primary/20 hover:from-primary/25 hover:to-purple-500/25 transition-all shadow-sm"
                  )}
                  title={collapsed ? "View Live Portfolio" : undefined}
                >
                  <Eye className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>View Portfolio</span>}
                </Link>
              </div>
            )}

            {/* Footer with ThemeToggle & UserButton */}
            <div className="border-t border-border/80 p-3">
              <div
                className={cn(
                  "flex items-center gap-2",
                  collapsed ? "flex-col justify-center" : "flex-row justify-between"
                )}
              >
                <UserButton
                  afterSwitchSessionUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8 ring-2 ring-primary/20",
                    },
                  }}
                />
                <ThemeToggle variant="icon" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content (full width on mobile, offset on desktop) */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 min-h-screen relative z-10 w-full",
          "ml-0", // Full width on mobile!
          collapsed ? "md:ml-16" : "md:ml-64" // Offset only on desktop!
        )}
      >
        <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
