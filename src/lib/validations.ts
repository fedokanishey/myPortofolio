import { z } from "zod";

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url().optional().or(z.literal("")),
  technologies: z.array(z.string()).min(1, "Add at least one technology"),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean(),
});

export const socialLinksSchema = z.object({
  twitter: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
});

export const themeConfigSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"),
  fontFamily: z.string().min(1, "Font family is required"),
  mode: z.enum(["light", "dark", "system"]).default("system"),
});

export const profileSchema = z.object({
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
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
  skills: z.array(z.string()).optional(),
  socialLinks: socialLinksSchema.optional(),
});

export const portfolioSchema = z.object({
  slug: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Username can only contain lowercase letters, numbers, and hyphens"
    ),
  themeConfig: themeConfigSchema.optional(),
  content: z.object({
    headline: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    coverImage: z.string().optional(),
    experience: z.array(experienceSchema).default([]),
    projects: z.array(projectSchema).default([]),
    skills: z.array(z.string()).default([]),
    socialLinks: socialLinksSchema.optional(),
  }),
  isPublished: z.boolean().default(false),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type SocialLinksFormData = z.infer<typeof socialLinksSchema>;
export type ThemeConfigFormData = z.infer<typeof themeConfigSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PortfolioFormData = z.infer<typeof portfolioSchema>;
