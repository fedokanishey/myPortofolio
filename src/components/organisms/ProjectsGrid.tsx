"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
  className?: string;
}

export function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects to display yet.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("bento-grid", className)}
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
          featured={project.featured}
        />
      ))}
    </motion.div>
  );
}
