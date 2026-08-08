"use client";

import * as React from "react";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { cn } from "@/lib/utils";

interface Project {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectsGridProps {
  projects: Project[];
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

export function ProjectsGrid({
  projects,
  primaryColor = "#6366F1",
  secondaryColor = "#8B5CF6",
  className,
}: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects to display yet.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full",
        className
      )}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id || index}
          title={project.title}
          description={project.description}
          image={project.image}
          technologies={project.technologies}
          liveUrl={project.liveUrl}
          githubUrl={project.githubUrl}
          featured={false}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ))}
    </div>
  );
}
