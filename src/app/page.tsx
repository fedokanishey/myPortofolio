"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Palette, Share2 } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/atoms/Button";
import { MainLayout } from "@/components/templates/MainLayout";

const features = [
  {
    icon: Sparkles,
    title: "Beautiful Designs",
    description:
      "Choose from stunning templates and customize them to match your style.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with performance in mind. Your portfolio loads instantly.",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description:
      "Customize colors, fonts, and layouts to create your unique look.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Get a unique URL to share your portfolio with the world.",
  },
];

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(139,92,246,0.12),transparent)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(35%_35%_at_80%_20%,rgba(168,85,247,0.08),transparent)]" />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Create your portfolio in minutes
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Build Your{" "}
              <span className="text-gradient">Professional Portfolio</span>{" "}
              Today
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Showcase your work, share your story, and stand out from the
              crowd with a stunning portfolio that represents who you are.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="gradient" size="xl" className="gap-2">
                    <span className="flex items-center gap-2">
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Button>
                </SignInButton>
                <Button variant="outline" size="xl">
                  View Examples
                </Button>
              </SignedOut>

              <SignedIn>
                <Button variant="gradient" size="xl" asChild className="gap-2">
                  <Link href="/dashboard">
                    <span className="flex items-center gap-2">
                      Go to Dashboard
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </Button>
              </SignedIn>
            </div>
          </motion.div>

          {/* Hero Image/Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 via-background to-purple-500/5 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">JD</span>
                  </div>
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground">Full Stack Developer</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      React
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      Node.js
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      TypeScript
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create a professional portfolio with all the tools and features
              you need to stand out.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-purple-500 p-8 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of professionals who are already showcasing
                their work with beautiful portfolios.
              </p>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    size="xl"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Create Your Portfolio
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  size="xl"
                  className="bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </SignedIn>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
