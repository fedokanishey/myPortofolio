import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { BrandLogo } from "@/components/atoms/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-border/80 dark:border-white/[0.08] bg-card/60 dark:bg-[#07090e] text-muted-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column (2 cols on md) */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo variant="full" size="md" />
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              The high-performance portfolio engine for engineers, product designers, and technical founders.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 dark:border-white/[0.08] bg-muted/40 dark:bg-white/[0.02] text-xs font-mono text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors">
                  Bento Features
                </Link>
              </li>
              <li>
                <Link href="#workflow" className="hover:text-foreground transition-colors">
                  Deployment Lifecycle
                </Link>
              </li>
              <li>
                <Link href="#stats" className="hover:text-foreground transition-colors">
                  Global Metrics
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Studio Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/projects" className="hover:text-foreground transition-colors">
                  Project Studio
                </Link>
              </li>
              <li>
                <Link href="/dashboard/theme" className="hover:text-foreground transition-colors">
                  Theme Customizer
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
              Connect
            </h4>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="https://github.com/fedokanishey"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="h-9 w-9 rounded-lg border border-border/70 dark:border-white/[0.08] bg-muted/40 dark:bg-white/[0.02] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/fedaamohammed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="h-9 w-9 rounded-lg border border-border/70 dark:border-white/[0.08] bg-muted/40 dark:bg-white/[0.02] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-14 pt-8 border-t border-border/70 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <p>© {new Date().getFullYear()} PortfolioBuilder Inc. Crafted with precision & motion.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
