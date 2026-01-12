import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioBySlug, getPortfolioBySlugForMetadata, incrementPortfolioViews } from "@/actions/portfolio";
import { PortfolioView } from "./PortfolioView";

interface PortfolioPageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { username } = await params;
  const portfolio = await getPortfolioBySlugForMetadata(username);

  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
    };
  }

  const user = portfolio.userId as { name: string; image?: string };

  return {
    title: `${user.name} | Portfolio`,
    description:
      portfolio.content.bio || `Check out ${user.name}'s professional portfolio`,
    openGraph: {
      title: `${user.name} - ${portfolio.content.headline || "Portfolio"}`,
      description: portfolio.content.bio || undefined,
      images: portfolio.content.avatar ? [portfolio.content.avatar] : undefined,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name} | Portfolio`,
      description: portfolio.content.bio || undefined,
    },
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { username } = await params;
  const portfolio = await getPortfolioBySlug(username);

  if (!portfolio) {
    notFound();
  }

  // Increment views only once per page render
  await incrementPortfolioViews(username);

  return <PortfolioView portfolio={portfolio} />;
}
