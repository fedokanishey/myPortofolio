"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  ExternalLink,
  Github,
  Star,
  Wand2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/Card";
import { InputField, TextareaField } from "@/components/molecules/FormField";
import { projectSchema } from "@/lib/validations";
import { updateProjects } from "@/actions/portfolio";
import type { IPortfolio, IProject } from "@/models/Portfolio";
import { z } from "zod";

const formSchema = projectSchema;
type ProjectFormData = z.infer<typeof formSchema>;

interface ProjectsFormProps {
  portfolio: IPortfolio | null;
}

export function ProjectsForm({ portfolio }: ProjectsFormProps) {
  const router = useRouter();
  const [projects, setProjects] = React.useState<IProject[]>(
    portfolio?.content?.projects || []
  );
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [techInput, setTechInput] = React.useState("");
  const [isFetchingPreview, setIsFetchingPreview] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      featured: false,
      technologies: [],
    },
  });

  const technologies = watch("technologies") || [];
  const liveUrl = watch("liveUrl");
  const currentImage = watch("image");

  // Fetch preview image from URL
  const fetchPreview = async () => {
    if (!liveUrl) return;
    
    setIsFetchingPreview(true);
    try {
      const response = await fetch("/api/fetch-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: liveUrl }),
      });
      
      const data = await response.json();
      
      if (data.success && data.image) {
        setValue("image", data.image);
        setPreviewImage(data.image);
      } else {
        alert("Could not fetch preview image from this URL");
      }
    } catch {
      alert("Failed to fetch preview");
    } finally {
      setIsFetchingPreview(false);
    }
  };

  const openAddForm = () => {
    reset({
      title: "",
      description: "",
      image: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
      featured: false,
    });
    setEditingIndex(null);
    setPreviewImage(null);
    setIsFormOpen(true);
  };

  const openEditForm = (index: number) => {
    const proj = projects[index];
    reset({
      title: proj.title,
      description: proj.description,
      image: proj.image || "",
      technologies: proj.technologies,
      liveUrl: proj.liveUrl || "",
      githubUrl: proj.githubUrl || "",
      featured: proj.featured,
    });
    setEditingIndex(index);
    setPreviewImage(proj.image || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingIndex(null);
    setTechInput("");
    setPreviewImage(null);
    reset();
  };

  const addTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setValue("technologies", [...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setValue(
      "technologies",
      technologies.filter((t) => t !== tech)
    );
  };

  const onSubmit = async (data: ProjectFormData) => {
    let newProjects: IProject[];

    if (editingIndex !== null) {
      newProjects = [...projects];
      newProjects[editingIndex] = data;
    } else {
      newProjects = [...projects, data];
    }

    setIsSaving(true);
    try {
      const result = await updateProjects(newProjects);
      if (result.success) {
        setProjects(newProjects);
        closeForm();
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch {
      alert("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const newProjects = projects.filter((_, i) => i !== index);

    setIsSaving(true);
    try {
      const result = await updateProjects(newProjects);
      if (result.success) {
        setProjects(newProjects);
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch {
      alert("Failed to delete project");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFeatured = async (index: number) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], featured: !newProjects[index].featured };

    setIsSaving(true);
    try {
      const result = await updateProjects(newProjects);
      if (result.success) {
        setProjects(newProjects);
        router.refresh();
      }
    } catch {
      // Ignore
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Showcase your best work and side projects
          </p>
        </div>
        <Button variant="gradient" onClick={openAddForm}>
          <span className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </span>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {projects.length === 0 ? (
            <Card className="md:col-span-2">
              <CardContent className="py-12 text-center">
                <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add your projects to showcase your skills and work
                </p>
                <Button variant="outline" onClick={openAddForm}>
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add your first project
                  </span>
                </Button>
              </CardContent>
            </Card>
          ) : (
            projects.map((proj, index) => (
              <motion.div
                key={proj._id || index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className={proj.featured ? "ring-2 ring-primary" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{proj.title}</h3>
                          {proj.featured && (
                            <Badge variant="gradient" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFeatured(index)}
                          title={proj.featured ? "Remove from featured" : "Mark as featured"}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              proj.featured ? "fill-primary text-primary" : ""
                            }`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {proj.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {proj.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{proj.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                        >
                          <Github className="h-3 w-3" />
                          Code
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={closeForm}
            />
            {/* Modal Container - this is the scrollable area */}
            <div className="fixed inset-0 z-50 overflow-y-auto pointer-events-none">
              <div className="flex min-h-full items-start justify-center p-4 pt-10 pb-10">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  className="w-full max-w-lg pointer-events-auto"
                >
                  <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {editingIndex !== null ? "Edit Project" : "Add Project"}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={closeForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {editingIndex !== null
                      ? "Update your project details"
                      : "Add a new project to your portfolio"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                      label="Project Title"
                      placeholder="My Awesome Project"
                      error={errors.title?.message}
                      required
                      {...register("title")}
                    />
                    <TextareaField
                      label="Description"
                      placeholder="Describe your project..."
                      error={errors.description?.message}
                      required
                      {...register("description")}
                    />

                    {/* Live Preview Section */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Project Preview</label>
                      
                      {/* Live Website Preview (iframe) */}
                      {liveUrl ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border">
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-0">
                            <Loader2 className="h-6 w-6 animate-spin" />
                          </div>
                          <iframe
                            src={liveUrl}
                            title="Website Preview"
                            className="w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none relative z-10"
                            sandbox="allow-scripts allow-same-origin"
                            loading="lazy"
                          />
                          <div className="absolute bottom-2 right-2 z-20">
                            <span className="text-xs bg-primary/80 text-white px-2 py-1 rounded">
                              Live Preview
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video rounded-lg bg-muted border flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <ExternalLink className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Enter Live URL to see preview</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Technologies */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Technologies</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTech();
                            }
                          }}
                          placeholder="Add technology"
                          className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm"
                        />
                        <Button type="button" variant="secondary" onClick={addTech}>
                          Add
                        </Button>
                      </div>
                      {errors.technologies?.message && (
                        <p className="text-sm text-destructive">{errors.technologies.message}</p>
                      )}
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              removable
                              onRemove={() => removeTech(tech)}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Live URL"
                        placeholder="https://myproject.com"
                        {...register("liveUrl")}
                      />
                      <InputField
                        label="GitHub URL"
                        placeholder="https://github.com/..."
                        {...register("githubUrl")}
                      />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-input"
                        {...register("featured")}
                      />
                      <span className="text-sm">Featured project</span>
                    </label>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={closeForm}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="gradient" isLoading={isSaving}>
                        <span className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          {editingIndex !== null ? "Update" : "Add"} Project
                        </span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
