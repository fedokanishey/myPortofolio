import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Scale, CheckCircle2, AlertTriangle, FileCode } from "lucide-react";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Terms of Service governing the use of PortfolioBuilder platform and portfolio publishing tools.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Header Bar */}
      <header className="border-b border-border/80 dark:border-white/[0.08] bg-card/80 dark:bg-[#0b0f17]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <BrandLogo variant="full" size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl flex-1">
        <div className="space-y-10">
          {/* Page Title & Hero Header */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-500 text-xs font-mono">
              <Scale className="h-3.5 w-3.5" /> TERMS OF SERVICE
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
              These terms outline the rules and guidelines for using the PortfolioBuilder platform, customization features, and portfolio publishing infrastructure.
            </p>
            <p className="text-xs font-mono text-muted-foreground pt-1">
              Last updated: August 2026
            </p>
          </div>

          <hr className="border-border/80 dark:border-white/[0.08]" />

          {/* Terms Sections */}
          <div className="space-y-12 leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h2>1. Acceptance of Terms</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                By creating an account or accessing PortfolioBuilder, you agree to comply with these Terms of Service. If you do not agree to these terms, you may not access or use our services.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <FileCode className="h-4 w-4" />
                </div>
                <h2>2. User Content &amp; Conduct</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                You are solely responsible for all content, text, media, project links, and materials published on your portfolio. You agree not to upload or publish content that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>Infringes upon any third-party intellectual property or copyright.</li>
                <li>Contains malicious code, phishing links, viruses, or security exploits.</li>
                <li>Is fraudulent, defamatory, or violates applicable international laws.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <Scale className="h-4 w-4" />
                </div>
                <h2>3. Intellectual Property Ownership</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                You retain 100% ownership of your personal branding, project documentation, uploaded assets, and portfolio content. PortfolioBuilder claims no copyright or proprietary rights over user-submitted content.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h2>4. Service Availability &amp; Disclaimer</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                While we maintain high uptime and edge deployment standards, PortfolioBuilder services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. We reserve the right to perform scheduled maintenance or update platform features when necessary.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
