import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how PortfolioBuilder protects and manages your personal data and portfolio content.",
};

export default function PrivacyPage() {
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
              <Shield className="h-3.5 w-3.5" /> LEGAL &amp; PRIVACY
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
              Your privacy and content security are our top priorities. This policy details how PortfolioBuilder collects, uses, and safeguards your data.
            </p>
            <p className="text-xs font-mono text-muted-foreground pt-1">
              Last updated: August 2026
            </p>
          </div>

          <hr className="border-border/80 dark:border-white/[0.08]" />

          {/* Policy Sections */}
          <div className="space-y-12 leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <Eye className="h-4 w-4" />
                </div>
                <h2>1. Information We Collect</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                We collect information to provide and improve our portfolio engine services. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>
                  <strong className="text-foreground">Account Information:</strong> Name, email address, profile image, and authentication tokens via Clerk.
                </li>
                <li>
                  <strong className="text-foreground">Portfolio Content:</strong> Bio, work experience, projects, uploaded resumes (PDFs), social links, and custom domain configurations.
                </li>
                <li>
                  <strong className="text-foreground">Usage Data:</strong> Technical logs, browser details, IP address, and analytics related to portfolio visitor traffic.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <Lock className="h-4 w-4" />
                </div>
                <h2>2. How We Use Your Data</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                We strictly use your information for the following operational purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>Building, hosting, and publishing your custom developer portfolio.</li>
                <li>Processing resume downloads and portfolio analytics.</li>
                <li>Authenticating user sessions and securing account access.</li>
                <li>Providing customer support and platform updates.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <Shield className="h-4 w-4" />
                </div>
                <h2>3. Data Protection &amp; Sharing</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                We do not sell, rent, or trade your personal information to third parties. Public information you explicitly choose to publish on your portfolio (such as public project links and contact details) will be accessible to visitors.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base">
                All stored data is encrypted in transit (TLS 1.3) and at rest using modern enterprise cloud infrastructure standards.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <FileText className="h-4 w-4" />
                </div>
                <h2>4. Your Rights &amp; Data Control</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                You retain full ownership of all intellectual property and content published on your portfolio. You can edit, hide, or permanently delete your portfolio data at any time directly through your Studio Dashboard.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
