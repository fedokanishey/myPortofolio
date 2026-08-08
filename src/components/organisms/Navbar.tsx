"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/atoms/Button";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { Sparkles, ArrowUpRight } from "lucide-react";
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
            ? "bg-[#0b0f17]/85 dark:bg-[#0b0f17]/85 backdrop-blur-xl border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-primary to-purple-600 p-px shadow-[0_0_15px_rgba(99,102,241,0.35)] transition-transform duration-300 group-hover:scale-105">
            <div className="h-full w-full rounded-[7px] bg-[#0b0f17] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-indigo-400" />
            </div>
          </div>
          <span className="font-bold text-base tracking-tight font-display text-white">
            Portfolio<span className="text-indigo-400">Builder</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200",
                pathname === link.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
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
                className="hidden sm:inline-flex text-xs text-zinc-300 hover:text-white hover:bg-white/5"
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
              className="text-xs text-zinc-300 hover:text-white"
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
