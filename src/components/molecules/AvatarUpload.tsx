"use client";

import * as React from "react";
import Image from "next/image";
import { Camera, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { ImageCropModal } from "@/components/molecules/ImageCropModal";

interface AvatarUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
  xl: "h-40 w-40",
};

export function AvatarUpload({
  value,
  onChange,
  className,
  size = "lg",
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [cropSrc, setCropSrc] = React.useState<string | null>(null);
  const [originalFile, setOriginalFile] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setOriginalFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setCropSrc(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCropComplete = async (blob: Blob) => {
    setCropSrc(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", new File([blob], originalFile?.name || "avatar.webp", { type: blob.type }));
      formData.append("folder", "avatars");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      setOriginalFile(null);
    }
  };

  const handleCropCancel = () => {
    setCropSrc(null);
    setOriginalFile(null);
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* Ambient background aura */}
      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-primary/20 to-purple-500/20 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        className={cn(
          "relative rounded-full overflow-hidden cursor-pointer group transition-all duration-300",
          "ring-4 ring-border/80 hover:ring-primary/60 dark:ring-white/10 dark:hover:ring-primary/80 shadow-lg",
          sizeClasses[size]
        )}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt="Avatar"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white">
              <Camera className="h-6 w-6" />
              <span className="text-[11px] font-medium tracking-wide uppercase">Change</span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-muted/80 via-card to-primary/5 text-muted-foreground group-hover:text-primary transition-colors border-2 border-dashed border-border/80 group-hover:border-primary/50 rounded-full">
            {isUploading ? (
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
            ) : (
              <>
                <div className="p-2.5 rounded-full bg-primary/10 text-primary mb-1.5 group-hover:scale-110 transition-transform">
                  <Camera className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold">Upload Photo</span>
              </>
            )}
          </div>
        )}
      </div>

      {value && !isUploading && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      )}

      {error && (
        <p className="text-sm text-destructive mt-2 text-center">{error}</p>
      )}

      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          aspectRatio={1} // Avatar uses a 1:1 aspect ratio (circle)
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
