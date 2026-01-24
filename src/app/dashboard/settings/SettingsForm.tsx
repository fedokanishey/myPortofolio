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
  LayoutGrid,
  Briefcase,
  FolderKanban,
  Award,
  Lightbulb,
  Share2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/Card";
import { togglePublish, deletePortfolio, updateSectionVisibility, updateHiddenItems } from "@/actions/portfolio";
import type { IPortfolio, ISectionVisibility, IHiddenItems } from "@/models/Portfolio";

interface SettingsFormProps {
  portfolio: IPortfolio | null;
}

export function SettingsForm({ portfolio }: SettingsFormProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [visibility, setVisibility] = React.useState<ISectionVisibility>(
    portfolio?.sectionVisibility || {
      showExperience: true,
      showProjects: true,
      showCertifications: true,
      showSkills: true,
      showSocialLinks: true,
    }
  );
  const [hiddenItems, setHiddenItems] = React.useState<IHiddenItems>(
    portfolio?.hiddenItems || {
      experience: [],
      projects: [],
      certifications: [],
      skills: [],
      socialLinks: [],
    }
  );
  const [isSavingVisibility, setIsSavingVisibility] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  const handleToggleItemVisibility = async (section: keyof IHiddenItems, itemId: string) => {
    const sectionItems = hiddenItems[section] || [];
    const newSectionItems = sectionItems.includes(itemId)
      ? sectionItems.filter(id => id !== itemId)
      : [...sectionItems, itemId];
    
    const newHiddenItems = {
      ...hiddenItems,
      [section]: newSectionItems,
    };

    setHiddenItems(newHiddenItems);
    setIsSavingVisibility(true);

    try {
      const result = await updateHiddenItems(newHiddenItems);
      if (!result.success) {
        setHiddenItems(hiddenItems); // Revert
        alert(result.error);
      } else {
        router.refresh();
      }
    } catch {
      setHiddenItems(hiddenItems);
      alert("Failed to update item visibility");
    } finally {
      setIsSavingVisibility(false);
    }
  };

  // Get social links as array for display
  const socialLinksData = portfolio?.content?.socialLinks
    ? Object.entries(portfolio.content.socialLinks)
        .filter(([, value]) => value && value.trim() !== "")
        .map(([key, value]) => ({ platform: key, url: value }))
    : [];

  const handleToggleVisibility = async (key: keyof ISectionVisibility) => {
    const newVisibility = {
      ...visibility,
      [key]: !visibility[key],
    };
    setVisibility(newVisibility);
    setIsSavingVisibility(true);
    
    try {
      const result = await updateSectionVisibility(newVisibility);
      if (result.success) {
        router.refresh();
      } else {
        // Revert on error
        setVisibility(visibility);
        alert(result.error);
      }
    } catch {
      setVisibility(visibility);
      alert("Failed to update visibility settings");
    } finally {
      setIsSavingVisibility(false);
    }
  };

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

      {/* Section Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5" />
            Section Visibility
          </CardTitle>
          <CardDescription>
            Choose which sections to show on your public portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Experience Accordion */}
            <div className="rounded-lg bg-muted/50 overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => toggleExpand("experience")}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">
                      {portfolio?.content?.experience?.length || 0} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleVisibility("showExperience"); }}
                    disabled={isSavingVisibility}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      visibility.showExperience ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      visibility.showExperience ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </button>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === "experience" ? "rotate-180" : ""}`} />
                </div>
              </div>
              {expanded === "experience" && (
                <div className="px-3 pb-3 pt-1 border-t border-border/50">
                  {portfolio?.content?.experience && portfolio.content.experience.length > 0 ? (
                    <ul className="space-y-2">
                      {portfolio.content.experience.map((exp, i) => {
                        const itemId = exp._id || i.toString();
                        const isHidden = hiddenItems.experience.includes(itemId);
                        return (
                          <li key={itemId} className="text-sm p-2 rounded bg-background/50 flex justify-between items-center group">
                            <div>
                              <p className={`font-medium ${isHidden ? "text-muted-foreground line-through" : ""}`}>{exp.title}</p>
                              <p className="text-muted-foreground text-xs">{exp.company}</p>
                            </div>
                            <button
                              onClick={() => handleToggleItemVisibility("experience", itemId)}
                              className={`p-1.5 rounded-md transition-colors ${
                                isHidden ? "hover:bg-primary/20 text-muted-foreground" : "hover:bg-primary/10 text-primary"
                              }`}
                              title={isHidden ? "Show item" : "Hide item"}
                            >
                              {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No experience added</p>
                  )}
                </div>
              )}
            </div>

            {/* Projects Accordion */}
            <div className="rounded-lg bg-muted/50 overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => toggleExpand("projects")}
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Projects</p>
                    <p className="text-sm text-muted-foreground">
                      {portfolio?.content?.projects?.length || 0} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleVisibility("showProjects"); }}
                    disabled={isSavingVisibility}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      visibility.showProjects ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      visibility.showProjects ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </button>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === "projects" ? "rotate-180" : ""}`} />
                </div>
              </div>
              {expanded === "projects" && (
                <div className="px-3 pb-3 pt-1 border-t border-border/50">
                  {portfolio?.content?.projects && portfolio.content.projects.length > 0 ? (
                    <ul className="space-y-2">
                      {portfolio.content.projects.map((proj, i) => {
                        const itemId = proj._id || i.toString();
                        const isHidden = hiddenItems.projects.includes(itemId);
                        return (
                          <li key={itemId} className="text-sm p-2 rounded bg-background/50 flex justify-between items-center group">
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium truncate ${isHidden ? "text-muted-foreground line-through" : ""}`}>{proj.title}</p>
                              <p className="text-muted-foreground text-xs line-clamp-1">{proj.description}</p>
                            </div>
                            <button
                              onClick={() => handleToggleItemVisibility("projects", itemId)}
                              className={`p-1.5 rounded-md transition-colors ${
                                isHidden ? "hover:bg-primary/20 text-muted-foreground" : "hover:bg-primary/10 text-primary"
                              }`}
                              title={isHidden ? "Show item" : "Hide item"}
                            >
                              {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No projects added</p>
                  )}
                </div>
              )}
            </div>

            {/* Certifications Accordion */}
            <div className="rounded-lg bg-muted/50 overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => toggleExpand("certifications")}
              >
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Certifications</p>
                    <p className="text-sm text-muted-foreground">
                      {portfolio?.content?.certifications?.length || 0} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleVisibility("showCertifications"); }}
                    disabled={isSavingVisibility}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      visibility.showCertifications ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      visibility.showCertifications ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </button>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === "certifications" ? "rotate-180" : ""}`} />
                </div>
              </div>
              {expanded === "certifications" && (
                <div className="px-3 pb-3 pt-1 border-t border-border/50">
                  {portfolio?.content?.certifications && portfolio.content.certifications.length > 0 ? (
                    <ul className="space-y-2">
                      {portfolio.content.certifications.map((cert, i) => {
                        const itemId = cert._id || i.toString();
                        const isHidden = hiddenItems.certifications.includes(itemId);
                        return (
                          <li key={itemId} className="text-sm p-2 rounded bg-background/50 flex justify-between items-center group">
                            <div>
                              <p className={`font-medium ${isHidden ? "text-muted-foreground line-through" : ""}`}>{cert.title}</p>
                              <p className="text-muted-foreground text-xs">{cert.date}</p>
                            </div>
                            <button
                              onClick={() => handleToggleItemVisibility("certifications", itemId)}
                              className={`p-1.5 rounded-md transition-colors ${
                                isHidden ? "hover:bg-primary/20 text-muted-foreground" : "hover:bg-primary/10 text-primary"
                              }`}
                              title={isHidden ? "Show item" : "Hide item"}
                            >
                              {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No certifications added</p>
                  )}
                </div>
              )}
            </div>

            {/* Skills Accordion */}
            <div className="rounded-lg bg-muted/50 overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => toggleExpand("skills")}
              >
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Skills</p>
                    <p className="text-sm text-muted-foreground">
                      {portfolio?.content?.skills?.length || 0} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleVisibility("showSkills"); }}
                    disabled={isSavingVisibility}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      visibility.showSkills ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      visibility.showSkills ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </button>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === "skills" ? "rotate-180" : ""}`} />
                </div>
              </div>
              {expanded === "skills" && (
                <div className="px-3 pb-3 pt-1 border-t border-border/50">
                  {portfolio?.content?.skills && portfolio.content.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {portfolio.content.skills.map((skill, i) => {
                        const isHidden = hiddenItems.skills.includes(skill);
                        return (
                          <button
                            key={skill}
                            onClick={() => handleToggleItemVisibility("skills", skill)}
                            className={`text-xs px-2 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                              isHidden 
                                ? "bg-muted text-muted-foreground border-border line-through" 
                                : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                            }`}
                          >
                            {skill}
                            {isHidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No skills added</p>
                  )}
                </div>
              )}
            </div>

            {/* Social Links Accordion */}
            <div className="rounded-lg bg-muted/50 overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => toggleExpand("socialLinks")}
              >
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Social Links</p>
                    <p className="text-sm text-muted-foreground">
                      {socialLinksData.length} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleToggleVisibility("showSocialLinks"); }}
                    disabled={isSavingVisibility}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      visibility.showSocialLinks ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      visibility.showSocialLinks ? "translate-x-6" : "translate-x-1"
                    }`} />
                  </button>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === "socialLinks" ? "rotate-180" : ""}`} />
                </div>
              </div>
              {expanded === "socialLinks" && (
                <div className="px-3 pb-3 pt-1 border-t border-border/50">
                  {socialLinksData.length > 0 ? (
                    <ul className="space-y-2">
                      {socialLinksData.map(({ platform, url }) => {
                        const isHidden = hiddenItems.socialLinks.includes(platform);
                        return (
                          <li key={platform} className="text-sm p-2 rounded bg-background/50 flex justify-between items-center">
                            <div className="flex-1 min-w-0 mr-4">
                              <span className={`capitalize font-medium block ${isHidden ? "text-muted-foreground line-through" : ""}`}>{platform}</span>
                              <span className="text-muted-foreground text-xs truncate block">{url}</span>
                            </div>
                            <button
                              onClick={() => handleToggleItemVisibility("socialLinks", platform)}
                              className={`p-1.5 rounded-md transition-colors shrink-0 ${
                                isHidden ? "hover:bg-primary/20 text-muted-foreground" : "hover:bg-primary/10 text-primary"
                              }`}
                              title={isHidden ? "Show link" : "Hide link"}
                            >
                              {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No social links added</p>
                  )}
                </div>
              )}
            </div>
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
