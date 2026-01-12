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
import {
  Card,
  CardContent,
} from "@/components/molecules/Card";
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
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your portfolio and track your progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          {portfolio?.slug && (
            <Button variant="outline" asChild>
              <Link href={`/${portfolio.slug}`} target="_blank">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </span>
              </Link>
            </Button>
          )}
          <Button
            variant={portfolio?.isPublished ? "secondary" : "gradient"}
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
                Publish
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      {!portfolio && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-primary/10 border border-primary/20"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-sm">
              <span className="font-medium">Welcome!</span> Start by filling
              out your profile information below to create your portfolio.
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Profile Form */}
      <ProfileForm portfolio={portfolio} clerkName={clerkName} />

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/dashboard/experience">
          <Card hover="lift" className="cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Add Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Share your work history
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/projects">
          <Card hover="lift" className="cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <FolderKanban className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Add Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Showcase your best work
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/theme">
          <Card hover="lift" className="cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Customize Theme</h3>
                <p className="text-sm text-muted-foreground">
                  Make it uniquely yours
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
