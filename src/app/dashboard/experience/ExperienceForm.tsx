"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, Reorder, useDragControls } from "framer-motion";
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  MapPin,
  Calendar,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/Card";
import { InputField, TextareaField } from "@/components/molecules/FormField";
import { experienceSchema, type ExperienceFormData } from "@/lib/validations";
import { updateExperience } from "@/actions/portfolio";
import type { IPortfolio, IExperience } from "@/models/Portfolio";

interface ExperienceItemProps {
  exp: IExperience;
  index: number;
  openEditForm: (index: number) => void;
  handleDelete: (index: number) => void;
}

function ExperienceItem({
  exp,
  index,
  openEditForm,
  handleDelete,
}: ExperienceItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={exp}
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
      <Card>
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
              <h3 className="text-lg font-semibold truncate">{exp.title}</h3>
              <p className="text-primary font-medium">{exp.company}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2 flex-wrap">
                {exp.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              <p className="text-muted-foreground mt-3 text-sm">
                {exp.description}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
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

interface ExperienceFormProps {
  portfolio: IPortfolio | null;
}

export function ExperienceForm({ portfolio }: ExperienceFormProps) {
  const router = useRouter();
  const [experiences, setExperiences] = React.useState<IExperience[]>(
    portfolio?.content?.experience || []
  );
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      current: false,
    },
  });

  const isCurrent = watch("current");

  const openAddForm = () => {
    reset({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setEditingIndex(null);
    setIsFormOpen(true);
  };

  const openEditForm = (index: number) => {
    const exp = experiences[index];
    reset({
      title: exp.title,
      company: exp.company,
      location: exp.location || "",
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      current: exp.current,
      description: exp.description,
    });
    setEditingIndex(index);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingIndex(null);
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

  const onSubmit = async (data: ExperienceFormData) => {
    let newExperiences: IExperience[];

    if (editingIndex !== null) {
      newExperiences = [...experiences];
      newExperiences[editingIndex] = data;
    } else {
      newExperiences = [...experiences, data];
    }

    setIsSaving(true);
    try {
      const result = await updateExperience(newExperiences);
      if (result.success) {
        setExperiences(newExperiences);
        closeForm();
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch {
      alert("Failed to save experience");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    const newExperiences = experiences.filter((_, i) => i !== index);

    setIsSaving(true);
    try {
      const result = await updateExperience(newExperiences);
      if (result.success) {
        setExperiences(newExperiences);
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch {
      alert("Failed to delete experience");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-muted-foreground">
            Add your work history and professional experience
          </p>
        </div>
        <Button variant="gradient" onClick={openAddForm}>
          <span className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Experience
          </span>
        </Button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No experience yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your work experience to showcase your professional journey
              </p>
              <Button variant="outline" onClick={openAddForm}>
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add your first experience
                </span>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Reorder.Group
            axis="y"
            values={experiences}
            onReorder={async (newOrder) => {
              setExperiences(newOrder);
              // Auto-save the new order
              try {
                await updateExperience(newOrder);
                router.refresh();
              } catch {
                // Revert on error
                setExperiences(portfolio?.content?.experience || []);
              }
            }}
            className="space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {experiences.map((exp, index) => (
                <ExperienceItem
                  key={exp._id || `exp-${index}`}
                  exp={exp}
                  index={index}
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
                    {editingIndex !== null ? "Edit Experience" : "Add Experience"}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {editingIndex !== null
                      ? "Update your work experience details"
                      : "Add a new work experience to your portfolio"}
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
                    label="Job Title"
                    placeholder="Software Engineer"
                    error={errors.title?.message}
                    required
                    {...register("title")}
                  />
                  <InputField
                    label="Company"
                    placeholder="Google"
                    error={errors.company?.message}
                    required
                    {...register("company")}
                  />
                  <InputField
                    label="Location"
                    placeholder="San Francisco, CA"
                    {...register("location")}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Start Date"
                      placeholder="Jan 2020"
                      error={errors.startDate?.message}
                      required
                      {...register("startDate")}
                    />
                    <InputField
                      label="End Date"
                      placeholder="Dec 2023"
                      disabled={isCurrent}
                      error={errors.endDate?.message}
                      required={!isCurrent}
                      {...register("endDate")}
                    />
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                      {...register("current")}
                      onChange={(e) => {
                        setValue("current", e.target.checked);
                        if (e.target.checked) {
                          setValue("endDate", "");
                        }
                      }}
                    />
                    <span className="text-sm font-medium">I currently work here</span>
                  </label>
                  <TextareaField
                    label="Description"
                    placeholder="Describe your role and achievements..."
                    error={errors.description?.message}
                    required
                    {...register("description")}
                  />
                </div>

                {/* Sticky Action Footer */}
                <div className="shrink-0 p-4 sm:p-5 border-t border-border/60 dark:border-white/[0.08] flex items-center justify-end gap-3 bg-muted/20 dark:bg-black/20">
                  <Button type="button" variant="outline" className="rounded-xl" onClick={closeForm}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gradient" className="rounded-xl" isLoading={isSaving}>
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {editingIndex !== null ? "Save Changes" : "Add Experience"}
                    </span>
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
