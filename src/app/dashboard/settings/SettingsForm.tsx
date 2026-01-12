"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Eye,
  EyeOff,
  Trash2,
  Download,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/Card";
import { togglePublish, deletePortfolio } from "@/actions/portfolio";
import type { IPortfolio } from "@/models/Portfolio";

interface SettingsFormProps {
  portfolio: IPortfolio | null;
}

export function SettingsForm({ portfolio }: SettingsFormProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleTogglePublish = async () => {
    setIsPublishing(true);
    try {
      const result = await togglePublish();
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch {
      alert("Failed to update publish status");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete your portfolio? This action cannot be undone."
    );
    if (!confirmed) return;

    const doubleConfirmed = confirm(
      "Please confirm again. All your data will be permanently deleted."
    );
    if (!doubleConfirmed) return;

    setIsDeleting(true);
    try {
      const result = await deletePortfolio();
      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch {
      alert("Failed to delete portfolio");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = () => {
    if (!portfolio) return;

    const data = {
      exportedAt: new Date().toISOString(),
      portfolio: {
        slug: portfolio.slug,
        content: portfolio.content,
        themeConfig: portfolio.themeConfig,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-${portfolio.slug}-export.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your portfolio settings and visibility
        </p>
      </div>

      {/* Publish Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {portfolio?.isPublished ? (
              <Eye className="h-5 w-5 text-green-500" />
            ) : (
              <EyeOff className="h-5 w-5 text-muted-foreground" />
            )}
            Visibility
          </CardTitle>
          <CardDescription>
            Control whether your portfolio is visible to the public
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">
                {portfolio?.isPublished ? "Published" : "Unpublished"}
              </p>
              <p className="text-sm text-muted-foreground">
                {portfolio?.isPublished
                  ? "Your portfolio is visible to everyone"
                  : "Your portfolio is only visible to you"}
              </p>
              {portfolio?.slug && portfolio?.isPublished && (
                <a
                  href={`/${portfolio.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1 mt-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  View your portfolio
                </a>
              )}
            </div>
            <Button
              variant={portfolio?.isPublished ? "secondary" : "gradient"}
              onClick={handleTogglePublish}
              isLoading={isPublishing}
              disabled={!portfolio}
            >
              {portfolio?.isPublished ? (
                <span className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4" />
                  Unpublish
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Publish
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Stats */}
      {portfolio && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Portfolio Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold">{portfolio.views || 0}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold">
                  {portfolio.content?.projects?.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold">
                  {portfolio.content?.experience?.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Experiences</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Data
          </CardTitle>
          <CardDescription>
            Download a copy of your portfolio data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={!portfolio}
          >
            <span className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export as JSON
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10">
            <div>
              <p className="font-medium">Delete Portfolio</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your portfolio and all associated data
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleDelete}
              isLoading={isDeleting}
              disabled={!portfolio}
            >
              <span className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
