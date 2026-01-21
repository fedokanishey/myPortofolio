"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Link as LinkIcon, Save, Loader2, FileText, Upload, Trash2 } from "lucide-react";
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
import { AvatarUpload } from "@/components/molecules/AvatarUpload";
import { updateProfile, updateAvatar, updateResume, checkSlugAvailability } from "@/actions/portfolio";
import type { IPortfolio } from "@/models/Portfolio";

// WhatsApp Input Component
function WhatsAppInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  // Parse existing value into country code and phone number
  const parts = value ? value.split(" ") : [];
  const initialCode = parts[0] || "+20";
  const initialPhone = parts.slice(1).join(" ") || "";
  
  const [countryCode, setCountryCode] = React.useState(initialCode);
  const [phoneNumber, setPhoneNumber] = React.useState(initialPhone);

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+") && val.length > 0) {
      val = "+" + val;
    }
    const newCode = val.replace(/[^0-9+]/g, "");
    setCountryCode(newCode);
    onChange(`${newCode} ${phoneNumber}`.trim());
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(newPhone);
    onChange(`${countryCode} ${newPhone}`.trim());
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">WhatsApp</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="+20"
          value={countryCode}
          className="w-20 px-3 py-2 rounded-md border bg-background text-sm"
          onChange={handleCountryCodeChange}
        />
        <input
          type="text"
          placeholder="1234567890"
          value={phoneNumber}
          className="flex-1 px-3 py-2 rounded-md border bg-background text-sm"
          onChange={handlePhoneChange}
        />
      </div>
      <p className="text-xs text-muted-foreground">Enter country code (e.g., +20) and phone number</p>
    </div>
  );
}

const profileFormSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  slug: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Username can only contain lowercase letters, numbers, and hyphens"
    ),
  headline: z.string().max(100, "Headline must be at most 100 characters").optional(),
  bio: z.string().max(2000, "Bio must be at most 2000 characters").optional(),
  skills: z.array(z.string()).optional(),
  socialLinks: z.object({
    email: z.string().optional(),
    whatsapp: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional(),
  }).optional(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  portfolio: IPortfolio | null;
  clerkName: string;
}

export function ProfileForm({ portfolio, clerkName }: ProfileFormProps) {
  const router = useRouter();
  const [avatar, setAvatar] = React.useState(portfolio?.content?.avatar || "");
  const [resume, setResume] = React.useState(portfolio?.content?.resume || "");
  const [isUploadingResume, setIsUploadingResume] = React.useState(false);
  const [skillInput, setSkillInput] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = React.useState(false);
  const resumeInputRef = React.useRef<HTMLInputElement>(null);

  // Use portfolio displayName if exists, otherwise use Clerk name
  const defaultName = (portfolio?.content as { displayName?: string })?.displayName || clerkName;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: defaultName,
      slug: portfolio?.slug || "",
      headline: portfolio?.content?.headline || "",
      bio: portfolio?.content?.bio || "",
      skills: portfolio?.content?.skills || [],
      socialLinks: portfolio?.content?.socialLinks || {},
    },
  });

  const slug = watch("slug");

  // Real-time slug validation
  React.useEffect(() => {
    const checkAvailability = async () => {
      if (!slug || slug.length < 3 || slug === portfolio?.slug) return;
      
      setIsCheckingSlug(true);
      try {
        const { available } = await checkSlugAvailability(slug);
        if (!available) {
          setError("slug", { type: "manual", message: "This username is already taken" });
        } else {
          clearErrors("slug");
        }
      } catch (error) {
        console.error("Failed to check slug availability", error);
      } finally {
        setIsCheckingSlug(false);
      }
    };

    const timer = setTimeout(checkAvailability, 500);

    return () => clearTimeout(timer);
  }, [slug, setError, clearErrors, portfolio?.slug]);

  const skills = watch("skills") || [];

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      // Update avatar if changed
      if (avatar !== portfolio?.content?.avatar) {
        await updateAvatar(avatar);
      }

      const result = await updateProfile(data);
      if (result.success) {
        router.refresh();
      } else {
        if (result.error === "This username is already taken") {
          setError("slug", { type: "manual", message: result.error });
        } else {
          alert(result.error);
        }
      }
    } catch {
      alert("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setValue("skills", [...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setValue(
      "skills",
      skills.filter((s) => s !== skill)
    );
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setIsUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResume(data.url);
        await updateResume(data.url);
        router.refresh();
      } else {
        alert(data.error || "Failed to upload resume");
      }
    } catch (error) {
      console.error("Resume upload error:", error);
      alert("Failed to upload resume");
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleRemoveResume = async () => {
    setResume("");
    await updateResume("");
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile information and social links
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Picture
            </CardTitle>
            <CardDescription>
              Upload a profile picture to display on your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <AvatarUpload
              value={avatar}
              onChange={setAvatar}
              size="xl"
            />
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Your public profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <InputField
              label="Display Name"
              description="Your name as it will appear on your portfolio"
              placeholder="John Doe"
              error={errors.displayName?.message}
              required
              {...register("displayName")}
            />
            <InputField
              label="Username"
              description="This will be your portfolio URL (e.g., yoursite.com/username)"
              placeholder="johndoe"
              error={errors.slug?.message}
              required
              {...register("slug")}
              rightIcon={isCheckingSlug ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            />
            <InputField
              label="Headline"
              placeholder="Full Stack Developer"
              error={errors.headline?.message}
              {...register("headline")}
            />
            <TextareaField
              label="Bio"
              placeholder="Tell visitors about yourself..."
              error={errors.bio?.message}
              {...register("bio")}
            />
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>
              Add your technical skills and expertise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill and press Enter"
                className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm"
              />
              <Button type="button" variant="secondary" onClick={addSkill}>
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    removable
                    onRemove={() => removeSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resume */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume / CV
            </CardTitle>
            <CardDescription>
              Upload your resume to allow visitors to download it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              ref={resumeInputRef}
              onChange={handleResumeUpload}
              accept=".pdf"
              className="hidden"
            />
            
            {resume ? (
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Resume uploaded</p>
                    <a 
                      href={resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View PDF
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => resumeInputRef.current?.click()}
                    disabled={isUploadingResume}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Replace
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveResume}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => resumeInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
              >
                {isUploadingResume ? (
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload your resume (PDF, max 10MB)</p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Social Links
            </CardTitle>
            <CardDescription>
              Add your social media and professional links
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <InputField
              label="Email"
              placeholder="your@email.com"
              type="email"
              {...register("socialLinks.email")}
            />
            <WhatsAppInput 
              value={watch("socialLinks.whatsapp") || ""}
              onChange={(val) => setValue("socialLinks.whatsapp", val)}
            />
            <InputField
              label="GitHub"
              placeholder="https://github.com/username"
              {...register("socialLinks.github")}
            />
            <InputField
              label="LinkedIn"
              placeholder="https://linkedin.com/in/username"
              {...register("socialLinks.linkedin")}
            />
            <InputField
              label="Twitter"
              placeholder="https://twitter.com/username"
              {...register("socialLinks.twitter")}
            />
            <InputField
              label="Website"
              placeholder="https://yourwebsite.com"
              {...register("socialLinks.website")}
            />
            <InputField
              label="Instagram"
              placeholder="https://instagram.com/username"
              {...register("socialLinks.instagram")}
            />
            <InputField
              label="YouTube"
              placeholder="https://youtube.com/@username"
              {...register("socialLinks.youtube")}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="gradient"
            isLoading={isSubmitting || isSaving}
          >
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
