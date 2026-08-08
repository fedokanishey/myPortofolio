"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, Reorder, useDragControls } from "framer-motion";
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
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { SkillSearchInput } from "@/components/molecules/SkillSearchInput";
import { ImageCropModal } from "@/components/molecules/ImageCropModal";
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

interface ProjectItemProps {
  proj: IProject;
  index: number;
  toggleFeatured: (index: number) => void;
  openEditForm: (index: number) => void;
  handleDelete: (index: number) => void;
}

function ProjectItem({
  proj,
  index,
  toggleFeatured,
  openEditForm,
  handleDelete,
}: ProjectItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={proj}
      dragListener={false}
      dragControls={dragControls}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileDrag={{ 
        scale: 1.02, 
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        zIndex: 50,
      }}
      className="relative select-none"
    >
      <Card className={proj.featured ? "ring-2 ring-primary" : ""}>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            {/* Drag Handle with Order Number */}
            <div 
              onPointerDown={(e) => dragControls.start(e)}
              className="flex flex-col items-center gap-1 pt-1 cursor-grab active:cursor-grabbing touch-none select-none p-1.5 -m-1.5 rounded-lg hover:bg-muted/60 transition-colors"
              title="Drag to reorder"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold pointer-events-none">
                {index + 1}
              </div>
              <GripVertical className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors pointer-events-none" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{proj.title}</h3>
                {proj.featured && (
                  <Badge variant="gradient" className="text-xs shrink-0">
                    Featured
                  </Badge>
                )}
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
            </div>
            <div className="flex items-center gap-1 shrink-0">
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
        </CardContent>
      </Card>
    </Reorder.Item>
  );
}

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

  const [isFetchingPreview, setIsFetchingPreview] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [previewType, setPreviewType] = React.useState<"live" | "image">("live");
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const [cropImageSrc, setCropImageSrc] = React.useState<string | null>(null);

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
    setPreviewType("live");
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
    // Determine preview type based on existing data - if has image, it's image type
    setPreviewType(proj.image ? "image" : "live");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingIndex(null);
    setPreviewImage(null);
    setPreviewType("live");
    reset();
  };

  // Lock background scroll when modal is open
  React.useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  // Handle image upload — show crop modal first
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const uploadCroppedImage = async (blob: Blob) => {
    setCropImageSrc(null);
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", blob, "project-image.webp");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setValue("image", data.url);
        setPreviewImage(data.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploadingImage(false);
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

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <Card>
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
          <Reorder.Group
            axis="y"
            values={projects}
            onReorder={async (newOrder) => {
              setProjects(newOrder);
              // Auto-save the new order
              try {
                await updateProjects(newOrder);
                router.refresh();
              } catch {
                // Revert on error
                setProjects(portfolio?.content?.projects || []);
              }
            }}
            className="space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((proj, index) => (
                <ProjectItem
                  key={proj._id || `proj-${index}`}
                  proj={proj}
                  index={index}
                  toggleFeatured={toggleFeatured}
                  openEditForm={openEditForm}
                  handleDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl max-h-[88vh] flex flex-col rounded-2xl border border-border/80 dark:border-white/10 bg-card dark:bg-[#0c1017] shadow-2xl overflow-hidden"
            >
              {/* Sticky Header */}
              <div className="shrink-0 p-5 sm:p-6 border-b border-border/60 dark:border-white/[0.08] flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {editingIndex !== null ? "Edit Project" : "Add Project"}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {editingIndex !== null
                      ? "Update your project details"
                      : "Add a new project to your portfolio"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl" onClick={closeForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Scrollable Form Content */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
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

                  {/* Technologies */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Technologies</label>
                    <SkillSearchInput
                      selectedSkills={technologies}
                      onAdd={(tech) => {
                        if (!technologies.includes(tech)) {
                          setValue("technologies", [...technologies, tech]);
                        }
                      }}
                      onRemove={removeTech}
                    />
                    {errors.technologies?.message && (
                      <p className="text-sm text-destructive">{errors.technologies.message}</p>
                    )}
                  </div>

                  {/* Preview Type Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Project Preview</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewType("live");
                          setValue("image", "");
                          setPreviewImage(null);
                        }}
                        className={`flex-1 py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
                          previewType === "live"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-input hover:bg-muted"
                        }`}
                      >
                        <ExternalLink className="h-4 w-4 inline mr-2" />
                        Live URL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewType("image");
                          setValue("liveUrl", "");
                        }}
                        className={`flex-1 py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
                          previewType === "image"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-input hover:bg-muted"
                        }`}
                      >
                        <ImageIcon className="h-4 w-4 inline mr-2" />
                        Image
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="GitHub URL"
                      placeholder="https://github.com/..."
                      {...register("githubUrl")}
                    />
                    {previewType === "image" ? (
                      <InputField
                        label="Project Link (Optional)"
                        placeholder="https://myproject.com"
                        {...register("liveUrl")}
                      />
                    ) : (
                      <InputField
                        label="Live URL"
                        placeholder="https://myproject.com"
                        {...register("liveUrl")}
                      />
                    )}
                  </div>

                  {/* Preview Content based on type */}
                  {previewType === "live" ? (
                    <div className="space-y-3">
                      {liveUrl ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/70">
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
                            <span className="text-xs bg-primary/90 text-white px-2.5 py-1 rounded-md font-medium shadow-sm">
                              Live Preview
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video rounded-xl bg-muted/50 border border-dashed flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <ExternalLink className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Enter Live URL to see preview</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {previewImage ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/70">
                          <img
                            src={previewImage}
                            alt="Project preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            title="Remove image"
                            onClick={() => {
                              setValue("image", "");
                              setPreviewImage(null);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-white hover:bg-destructive/90 shadow-md"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="aspect-video rounded-xl bg-muted/50 border border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={isUploadingImage}
                          />
                          <div className="text-center text-muted-foreground">
                            {isUploadingImage ? (
                              <>
                                <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin text-primary" />
                                <p className="text-sm">Uploading...</p>
                              </>
                            ) : (
                              <>
                                <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Click to upload image</p>
                              </>
                            )}
                          </div>
                        </label>
                      )}
                    </div>
                  )}

                  <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                      {...register("featured")}
                    />
                    <span className="text-sm font-medium">Featured project (highlight on portfolio)</span>
                  </label>
                </div>

                {/* Sticky Action Footer */}
                <div className="shrink-0 p-4 sm:p-5 border-t border-border/60 dark:border-white/[0.08] flex items-center justify-end gap-3 bg-muted/20 dark:bg-black/20">
                  <Button type="button" variant="outline" className="rounded-xl" onClick={closeForm}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gradient" className="rounded-xl" isLoading={isSaving}>
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {editingIndex !== null ? "Save Changes" : "Add Project"}
                    </span>
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Crop Modal */}
      {cropImageSrc && (
        <ImageCropModal
          imageSrc={cropImageSrc}
          aspectRatio={16 / 9}
          onCropComplete={uploadCroppedImage}
          onCancel={() => setCropImageSrc(null)}
        />
      )}
    </div>
  );
}

