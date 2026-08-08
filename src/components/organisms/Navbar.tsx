"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/atoms/Button";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#stats", label: "Impact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4">
      <div
        className={cn(
          "max-w-6xl mx-auto transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border",
          scrolled
            ? "bg-background/85 dark:bg-[#0b0f17]/85 backdrop-blur-xl border-border/80 dark:border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Brand Logo */}
        <BrandLogo variant="full" size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/50 dark:bg-white/[0.03] border border-border/60 dark:border-white/[0.06] rounded-full px-4 py-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200",
                pathname === link.href
                  ? "text-foreground bg-background shadow-xs dark:bg-white/10 dark:text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle variant="icon" />

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                Sign In
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <MagneticButton strength={18}>
                <Button
                  size="sm"
                  className="relative group overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-primary to-purple-600 text-white text-xs font-semibold px-4 py-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] border border-white/20 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Start Building
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Button>
              </MagneticButton>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton
              afterSwitchSessionUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 ring-2 ring-indigo-500/30",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
