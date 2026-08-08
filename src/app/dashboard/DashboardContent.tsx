"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Sparkles,
  Briefcase,
  FolderKanban,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { AnimatedCounter } from "@/components/atoms/AnimatedCounter";
import { togglePublish } from "@/actions/portfolio";
import { ProfileForm } from "./profile/ProfileForm";
import type { IPortfolio } from "@/models/Portfolio";

interface DashboardContentProps {
  portfolio: IPortfolio | null;
  clerkName: string;
}

export function DashboardContent({ portfolio, clerkName }: DashboardContentProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = React.useState(false);

  const handleTogglePublish = async () => {
    setIsPublishing(true);
    const result = await togglePublish();
    if (!result.success) {
      alert(result.error);
    }
    setIsPublishing(false);
    router.refresh();
  };

  const stats = [
    {
      label: "Profile Views",
      value: portfolio?.views || 0,
      icon: Eye,
      color: "text-blue-500",
    },
    {
      label: "Projects",
      value: portfolio?.content?.projects?.length || 0,
      icon: FolderKanban,
      color: "text-purple-500",
    },
    {
      label: "Experience",
      value: portfolio?.content?.experience?.length || 0,
      icon: Briefcase,
      color: "text-green-500",
    },
    {
      label: "Skills",
      value: portfolio?.content?.skills?.length || 0,
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your portfolio, track impressions, and customize your live showcase
          </p>
        </div>
        <div className="flex items-center gap-3">
          {portfolio?.slug && (
            <Button variant="outline" className="rounded-xl" asChild>
              <Link href={`/${portfolio.slug}`} target="_blank">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Live
                </span>
              </Link>
            </Button>
          )}
          <Button
            variant={portfolio?.isPublished ? "secondary" : "gradient"}
            className="rounded-xl"
            onClick={handleTogglePublish}
            isLoading={isPublishing}
          >
            {portfolio?.isPublished ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Unpublish
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Publish Portfolio
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status Banner for new portfolios */}
      {!portfolio && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-foreground">Welcome!</span> Start by filling
              out your profile information below to generate and publish your portfolio.
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats Grid with Animated Numbers & Glass Surface */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="relative p-5 rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-[#0c1017]/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 dark:via-white/10 to-transparent" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    <AnimatedCounter end={stat.value} duration={1.2} />
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50 dark:bg-white/[0.04] border border-border/50">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Profile Form */}
      <ProfileForm portfolio={portfolio} clerkName={clerkName} />

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/dashboard/experience">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-5 rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-[#0c1017]/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-all h-full flex items-center gap-4 cursor-pointer"
          >
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Briefcase className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Add Experience</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Share your career milestones
              </p>
            </div>
          </motion.div>
        </Link>

        <Link href="/dashboard/projects">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-5 rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-[#0c1017]/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-all h-full flex items-center gap-4 cursor-pointer"
          >
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <FolderKanban className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Add Projects</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Showcase your best builds
              </p>
            </div>
          </motion.div>
        </Link>

        <Link href="/dashboard/certifications">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-5 rounded-2xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-[#0c1017]/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-all h-full flex items-center gap-4 cursor-pointer"
          >
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Certifications</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Highlight credentials & awards
              </p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
