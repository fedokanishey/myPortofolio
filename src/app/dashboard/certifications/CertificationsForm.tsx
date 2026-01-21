"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Calendar,
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
import { certificationSchema, type CertificationFormData } from "@/lib/validations";
import { updateCertifications } from "@/actions/portfolio";
import type { IPortfolio, ICertification } from "@/models/Portfolio";

interface CertificationsFormProps {
  portfolio: IPortfolio | null;
}

export function CertificationsForm({ portfolio }: CertificationsFormProps) {
  const router = useRouter();
  const [certifications, setCertifications] = React.useState<ICertification[]>(
    portfolio?.content?.certifications || []
  );
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [techInput, setTechInput] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      technologies: [],
    },
  });

  const technologies = watch("technologies") || [];
  const imageUrl = watch("image");

  const openAddForm = () => {
    reset({
      title: "",
      image: "",
      description: "",
      technologies: [],
      date: "",
    });
    setTechInput("");
    setEditingIndex(null);
    setIsFormOpen(true);
  };

  const openEditForm = (index: number) => {
    const cert = certifications[index];
    reset({
      title: cert.title,
      image: cert.image || "",
      description: cert.description,
      technologies: cert.technologies || [],
      date: cert.date,
    });
    setTechInput("");
    setEditingIndex(index);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingIndex(null);
    reset();
    setTechInput("");
  };

  const addTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setValue("technologies", [...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setValue("technologies", technologies.filter((t) => t !== tech));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "portfolios/certifications");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setValue("image", data.url);
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: CertificationFormData) => {
    let newCertifications: ICertification[];

    if (editingIndex !== null) {
      newCertifications = [...certifications];
      newCertifications[editingIndex] = data;
    } else {
      newCertifications = [...certifications, data];
    }

    setIsSaving(true);
    const result = await updateCertifications(newCertifications);
    setIsSaving(false);

    if (result.success) {
      setCertifications(newCertifications);
      closeForm();
      router.refresh();
    }
  };

  const handleDelete = async (index: number) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    setIsSaving(true);
    const result = await updateCertifications(newCertifications);
    setIsSaving(false);

    if (result.success) {
      setCertifications(newCertifications);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications
              </CardTitle>
              <CardDescription>
                Add your professional certifications and credentials
              </CardDescription>
            </div>
            <Button onClick={openAddForm} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="popLayout">
            {certifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground"
              >
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No certifications yet</p>
                <p className="text-sm">Add your first certification to showcase your credentials</p>
              </motion.div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert._id || index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{cert.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              <span>{cert.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {cert.description}
                            </p>
                            {cert.technologies && cert.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {cert.technologies.slice(0, 3).map((tech) => (
                                  <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                                {cert.technologies.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{cert.technologies.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1 ml-2">
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
                ))}
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

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
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {editingIndex !== null ? "Edit Certification" : "Add Certification"}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={closeForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {editingIndex !== null
                      ? "Update your certification details"
                      : "Add a new certification to your portfolio"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                      label="Title"
                      placeholder="AWS Certified Solutions Architect"
                      error={errors.title?.message}
                      required
                      {...register("title")}
                    />

                    {/* Certificate Image Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Certificate Image
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      
                      {imageUrl ? (
                        <div className="relative rounded-lg overflow-hidden border">
                          <Image 
                            src={imageUrl} 
                            alt="Certificate" 
                            width={400}
                            height={200}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isUploading}
                            >
                              Replace
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setValue("image", "")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                        >
                          {isUploading ? (
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                          ) : (
                            <>
                              <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">Click to upload certificate image</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <TextareaField
                      label="Description"
                      placeholder="Describe what you learned and achieved..."
                      error={errors.description?.message}
                      required
                      {...register("description")}
                    />

                    {/* Technologies */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Technologies <span className="text-destructive">*</span>
                      </label>
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
                          placeholder="Add technology and press Enter"
                          className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm"
                        />
                        <Button type="button" variant="secondary" onClick={addTech}>
                          Add
                        </Button>
                      </div>
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
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
                      {errors.technologies?.message && (
                        <p className="text-sm text-destructive">{errors.technologies.message}</p>
                      )}
                    </div>

                    <InputField
                      label="Date"
                      placeholder="Jan 2024"
                      error={errors.date?.message}
                      required
                      {...register("date")}
                    />

                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={closeForm}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="gradient" isLoading={isSaving}>
                        <span className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          {editingIndex !== null ? "Update" : "Add"} Certification
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
