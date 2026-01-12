import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Github,
  Twitter,
  Linkedin,
  Globe,
  Instagram,
  Youtube,
  type LucideIcon,
} from "lucide-react";

interface SocialLink {
  platform: keyof typeof socialIcons;
  url: string;
}

const socialIcons: Record<string, LucideIcon> = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  website: Globe,
  instagram: Instagram,
  youtube: Youtube,
};

const socialColors: Record<string, string> = {
  twitter: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10",
  github: "hover:text-foreground hover:bg-foreground/10",
  linkedin: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
  website: "hover:text-primary hover:bg-primary/10",
  instagram: "hover:text-[#E4405F] hover:bg-[#E4405F]/10",
  youtube: "hover:text-[#FF0000] hover:bg-[#FF0000]/10",
};

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconSize?: "sm" | "default" | "lg";
}

export function SocialLinks({
  links,
  className,
  iconSize = "default",
}: SocialLinksProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((link) => {
        const Icon = socialIcons[link.platform];
        if (!Icon || !link.url) return null;

        return (
          <Link
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center rounded-full transition-all duration-200",
              sizeClasses[iconSize],
              "text-muted-foreground",
              socialColors[link.platform]
            )}
          >
            <Icon className={iconSizeClasses[iconSize]} />
            <span className="sr-only">{link.platform}</span>
          </Link>
        );
      })}
    </div>
  );
}
