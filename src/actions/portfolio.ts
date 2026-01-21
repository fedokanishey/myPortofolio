"use server";

import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import { User, Portfolio } from "@/models";
import { portfolioSchema, profileSchema } from "@/lib/validations";
import type { IPortfolio, IExperience, IProject, IThemeConfig, ICertification } from "@/models/Portfolio";

// Helper to get or create user
async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await connectDB();

  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("User not found");
    }

    user = await User.create({
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
      image: clerkUser.imageUrl,
    });
  }

  return user;
}

// Get portfolio for current user
export async function getMyPortfolio() {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const portfolio = await Portfolio.findOne({ userId: user._id }).lean();
    
    if (!portfolio) {
      return null;
    }

    return JSON.parse(JSON.stringify(portfolio)) as IPortfolio;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

// Create portfolio
export async function createPortfolio(data: unknown) {
  try {
    const user = await getOrCreateUser();
    const validatedData = portfolioSchema.parse(data);

    await connectDB();

    // Check if slug is already taken
    const existingPortfolio = await Portfolio.findOne({ slug: validatedData.slug });
    if (existingPortfolio) {
      return { success: false, error: "This username is already taken" };
    }

    // Check if user already has a portfolio
    const userPortfolio = await Portfolio.findOne({ userId: user._id });
    if (userPortfolio) {
      return { success: false, error: "You already have a portfolio. Please update it instead." };
    }

    const portfolio = await Portfolio.create({
      userId: user._id,
      ...validatedData,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${validatedData.slug}`);

    return { success: true, data: JSON.parse(JSON.stringify(portfolio)) };
  } catch (error) {
    console.error("Error creating portfolio:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create portfolio" };
  }
}

// Update portfolio
export async function updatePortfolio(data: unknown) {
  try {
    const user = await getOrCreateUser();
    const validatedData = portfolioSchema.partial().parse(data);

    await connectDB();

    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    // Check if new slug is taken by another user
    if (validatedData.slug && validatedData.slug !== portfolio.slug) {
      const existingPortfolio = await Portfolio.findOne({ 
        slug: validatedData.slug,
        _id: { $ne: portfolio._id }
      });
      if (existingPortfolio) {
        return { success: false, error: "This username is already taken" };
      }
    }

    const oldSlug = portfolio.slug;

    Object.assign(portfolio, validatedData);
    await portfolio.save();

    revalidatePath("/dashboard");
    revalidatePath(`/${oldSlug}`);
    if (validatedData.slug) {
      revalidatePath(`/${validatedData.slug}`);
    }

    return { success: true, data: JSON.parse(JSON.stringify(portfolio)) };
  } catch (error) {
    console.error("Error updating portfolio:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update portfolio" };
  }
}

// Update profile section
export async function updateProfile(data: unknown) {
  try {
    const user = await getOrCreateUser();
    const validatedData = profileSchema.parse(data);

    await connectDB();

    let portfolio = await Portfolio.findOne({ userId: user._id });

    if (!portfolio) {
      // Create a new portfolio with profile data
      portfolio = await Portfolio.create({
        userId: user._id,
        slug: validatedData.slug,
        content: {
          displayName: validatedData.displayName,
          headline: validatedData.headline || "",
          bio: validatedData.bio || "",
          skills: validatedData.skills || [],
          socialLinks: validatedData.socialLinks || {},
          experience: [],
          projects: [],
        },
      });
    } else {
      // Check if new slug is taken
      if (validatedData.slug !== portfolio.slug) {
        const existingPortfolio = await Portfolio.findOne({ 
          slug: validatedData.slug,
          _id: { $ne: portfolio._id }
        });
        if (existingPortfolio) {
          return { success: false, error: "This username is already taken" };
        }
      }

      portfolio.slug = validatedData.slug;
      portfolio.content.displayName = validatedData.displayName;
      portfolio.content.headline = validatedData.headline || "";
      portfolio.content.bio = validatedData.bio || "";
      portfolio.content.skills = validatedData.skills || [];
      portfolio.content.socialLinks = validatedData.socialLinks || {};
      await portfolio.save();
    }

    revalidatePath("/dashboard");
    revalidatePath(`/${validatedData.slug}`);

    return { success: true, data: JSON.parse(JSON.stringify(portfolio)) };
  } catch (error) {
    console.error("Error updating profile:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update profile" };
  }
}

// Update avatar
export async function updateAvatar(avatarUrl: string) {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    let portfolio = await Portfolio.findOne({ userId: user._id });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    portfolio.content.avatar = avatarUrl;
    await portfolio.save();

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    revalidatePath(`/${portfolio.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, error: "Failed to update avatar" };
  }
}

// Update experience array
export async function updateExperience(experiences: IExperience[]) {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const portfolio = await Portfolio.findOne({ userId: user._id });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    portfolio.content.experience = experiences;
    await portfolio.save();

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/experience");
    revalidatePath(`/${portfolio.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating experience:", error);
    return { success: false, error: "Failed to update experience" };
  }
}

// Update projects array
export async function updateProjects(projects: IProject[]) {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const portfolio = await Portfolio.findOne({ userId: user._id });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    portfolio.content.projects = projects;
    await portfolio.save();

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    revalidatePath(`/${portfolio.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating projects:", error);
    return { success: false, error: "Failed to update projects" };
  }
}

// Update certifications array
export async function updateCertifications(certifications: ICertification[]) {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const portfolio = await Portfolio.findOne({ userId: user._id });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    portfolio.content.certifications = certifications;
    await portfolio.save();

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/certifications");
    revalidatePath(`/${portfolio.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating certifications:", error);
    return { success: false, error: "Failed to update certifications" };
  }
}

// Update resume URL
export async function updateResume(resumeUrl: string) {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const portfolio = await Portfolio.findOne({ userId: user._id });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    portfolio.content.resume = resumeUrl;
    await portfolio.save();

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    revalidatePath(`/${portfolio.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating resume:", error);
    return { success: false, error: "Failed to update resume" };
  }
}

// Update theme config
export async function updateThemeConfig(themeConfig: IThemeConfig) {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const portfolio = await Portfolio.findOne({ userId: user._id });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    portfolio.themeConfig = themeConfig;
    await portfolio.save();

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/theme");
    revalidatePath(`/${portfolio.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating theme:", error);
    return { success: false, error: "Failed to update theme" };
  }
}

// Delete portfolio
export async function deletePortfolio() {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const portfolio = await Portfolio.findOneAndDelete({ userId: user._id });

    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return { success: false, error: "Failed to delete portfolio" };
  }
}

// Toggle publish status
export async function togglePublish() {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      return { success: false, error: "Portfolio not found" };
    }

    portfolio.isPublished = !portfolio.isPublished;
    await portfolio.save();

    revalidatePath("/dashboard");
    revalidatePath(`/${portfolio.slug}`);

    return { success: true, isPublished: portfolio.isPublished };
  } catch (error) {
    console.error("Error toggling publish:", error);
    return { success: false, error: "Failed to toggle publish status" };
  }
}

// Get portfolio by slug (public) - for metadata (no increment)
export async function getPortfolioBySlugForMetadata(slug: string) {
  try {
    await connectDB();

    const portfolio = await Portfolio.findOne({ 
      slug: slug.toLowerCase(),
      isPublished: true 
    }).populate("userId", "name image").lean();

    if (!portfolio) {
      return null;
    }

    return JSON.parse(JSON.stringify(portfolio)) as IPortfolio & { userId: { name: string; image?: string } };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

// Get portfolio by slug (public) - for page rendering (no increment)
export async function getPortfolioBySlug(slug: string) {
  try {
    await connectDB();

    const portfolio = await Portfolio.findOne({ 
      slug: slug.toLowerCase(),
      isPublished: true 
    }).populate("userId", "name image").lean();

    if (!portfolio) {
      return null;
    }

    return JSON.parse(JSON.stringify(portfolio)) as IPortfolio & { userId: { name: string; image?: string } };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

// Increment portfolio views (call once per page view)
export async function incrementPortfolioViews(slug: string) {
  try {
    await connectDB();
    await Portfolio.findOneAndUpdate(
      { slug: slug.toLowerCase(), isPublished: true },
      { $inc: { views: 1 } }
    );
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}

// Check if slug is available
export async function checkSlugAvailability(slug: string) {
  try {
    const user = await getOrCreateUser();
    await connectDB();

    const existingPortfolio = await Portfolio.findOne({ 
      slug: slug.toLowerCase(),
      userId: { $ne: user._id }
    });

    return { available: !existingPortfolio };
  } catch (error) {
    console.error("Error checking slug:", error);
    return { available: false };
  }
}
