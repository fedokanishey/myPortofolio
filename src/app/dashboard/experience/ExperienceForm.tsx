"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  MapPin,
  Calendar,
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
        <AnimatePresence mode="popLayout">
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
            experiences.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
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
                      <div className="flex items-center gap-2 ml-4">
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
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={closeForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {editingIndex !== null ? "Edit Experience" : "Add Experience"}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={closeForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {editingIndex !== null
                      ? "Update your work experience details"
                      : "Add a new work experience to your portfolio"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <div className="grid grid-cols-2 gap-4">
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
                        {...register("endDate")}
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-input"
                        {...register("current")}
                        onChange={(e) => {
                          setValue("current", e.target.checked);
                          if (e.target.checked) {
                            setValue("endDate", "");
                          }
                        }}
                      />
                      <span className="text-sm">I currently work here</span>
                    </label>
                    <TextareaField
                      label="Description"
                      placeholder="Describe your role and achievements..."
                      error={errors.description?.message}
                      required
                      {...register("description")}
                    />
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={closeForm}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="gradient" isLoading={isSaving}>
                        <span className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          {editingIndex !== null ? "Update" : "Add"} Experience
                        </span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
