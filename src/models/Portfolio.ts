import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Sub-document interfaces
export interface IExperience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ICertification {
  _id?: string;
  title: string;
  image?: string;
  description: string;
  technologies: string[];
  date: string;
}

export interface ISocialLinks {
  email?: string;
  whatsapp?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  instagram?: string;
  youtube?: string;
}

export interface IThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  mode: "light" | "dark" | "system";
}

export interface IContent {
  displayName?: string;
  headline: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  resume?: string;
  experience: IExperience[];
  projects: IProject[];
  certifications: ICertification[];
  skills: string[];
  socialLinks: ISocialLinks;
}

export interface IPortfolio extends Document {
  userId: Types.ObjectId;
  slug: string;
  themeConfig: IThemeConfig;
  content: IContent;
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
  },
  { _id: true }
);

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    technologies: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { _id: true }
);

const CertificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    date: { type: String, required: true },
  },
  { _id: true }
);

const SocialLinksSchema = new Schema<ISocialLinks>(
  {
    email: { type: String },
    whatsapp: { type: String },
    twitter: { type: String },
    github: { type: String },
    linkedin: { type: String },
    website: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
  { _id: false }
);

const ThemeConfigSchema = new Schema<IThemeConfig>(
  {
    primaryColor: { type: String, default: "#8B5CF6" },
    secondaryColor: { type: String, default: "#EC4899" },
    fontFamily: { type: String, default: "Inter" },
    mode: { type: String, enum: ["light", "dark", "system"], default: "system" },
  },
  { _id: false }
);

const ContentSchema = new Schema<IContent>(
  {
    displayName: { type: String },
    headline: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatar: { type: String },
    coverImage: { type: String },
    resume: { type: String },
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    skills: [{ type: String }],
    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
  },
  { _id: false }
);

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"],
    },
    themeConfig: { type: ThemeConfigSchema, default: () => ({}) },
    content: { type: ContentSchema, default: () => ({}) },
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Index for efficient slug lookups
PortfolioSchema.index({ slug: 1 });

// Prevent Mongoose model recompilation error in development
if (process.env.NODE_ENV !== "production" && mongoose.models && mongoose.models.Portfolio) {
  delete mongoose.models.Portfolio;
}

const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;
