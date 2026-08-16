"use client";

import * as React from "react";
import Image from "next/image";
import { FolderKanban, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectPreviewFrameProps {
  title: string;
  image?: string;
  liveUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
  aspectRatioClass?: string;
}

export function ProjectPreviewFrame({
  title,
  image,
  liveUrl,
  primaryColor = "#6366F1",
  secondaryColor = "#8B5CF6",
  className,
  aspectRatioClass = "aspect-video",
}: ProjectPreviewFrameProps) {
  const [imageError, setImageError] = React.useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = React.useState(false);
  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const hasValidImage = Boolean(
    image &&
      !imageError &&
      (image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("/") ||
        image.startsWith("data:"))
  );

  React.useEffect(() => {
    if (!liveUrl || hasValidImage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [liveUrl, hasValidImage]);

  // Normalize liveUrl for local preview if needed
  const previewUrl = React.useMemo(() => {
    if (!liveUrl) return "";
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      try {
        const urlObj = new URL(liveUrl);
        if (urlObj.hostname.includes("portofolio-maker") || urlObj.hostname === "localhost") {
          return "/";
        }
      } catch {
        // keep liveUrl
      }
    }
    return liveUrl;
  }, [liveUrl]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-muted/30 dark:bg-[#07090e] border-b border-border/50 dark:border-white/[0.06] select-none",
        aspectRatioClass,
        className
      )}
    >
      {hasValidImage ? (
        <>
          <Image
            src={image!}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        </>
      ) : liveUrl ? (
        <>
          {/* Live Iframe Background Placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2 z-0">
            <FolderKanban className="h-8 w-8 opacity-25 animate-pulse" />
            <span className="text-[11px] font-mono opacity-50">Loading live site preview...</span>
          </div>

          {shouldLoadIframe && (
            <iframe
              src={previewUrl}
              title={`${title} live site preview`}
              className={cn(
                "w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none relative z-10 border-0 transition-opacity duration-700",
                iframeLoaded ? "opacity-100" : "opacity-0"
              )}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setIframeLoaded(true)}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 dark:from-[#090d16]/90 via-transparent to-transparent pointer-events-none z-20" />

          {/* Live View Badge */}
          <div className="absolute bottom-2.5 right-2.5 z-30">
            <span
              className="inline-flex items-center gap-1 text-[10px] font-mono text-white font-semibold px-2 py-0.5 rounded-full shadow-md backdrop-blur-md"
              style={{ background: primaryColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
              <Globe className="h-3 w-3" />
              Live Site
            </span>
          </div>
        </>
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}12, ${secondaryColor}12)`,
          }}
        >
          <FolderKanban className="h-10 w-10 text-muted-foreground/40" />
          <span className="text-xs font-mono text-muted-foreground/70 font-semibold">{title}</span>
        </div>
      )}
    </div>
  );
}
