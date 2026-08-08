import Link from "next/link";
import { Github, Twitter, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07090e] text-zinc-400">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column (2 cols on md) */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-primary to-purple-600 p-px shadow-sm">
                <div className="h-full w-full rounded-[7px] bg-[#0b0f17] flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                </div>
              </div>
              <span className="font-bold text-base tracking-tight font-display text-white">
                Portfolio<span className="text-indigo-400">Builder</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              The high-performance portfolio engine for engineers, product designers, and technical founders.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Bento Features
                </Link>
              </li>
              <li>
                <Link href="#workflow" className="hover:text-white transition-colors">
                  Deployment Lifecycle
                </Link>
              </li>
              <li>
                <Link href="#stats" className="hover:text-white transition-colors">
                  Global Metrics
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Studio Dashboard
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">
                  Showcase Gallery
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Theme Registry
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
              Connect
            </h4>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} PortfolioBuilder Inc. Crafted with precision & motion.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
