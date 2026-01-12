"use client";

import * as React from "react";
import Image from "next/image";
import { Camera, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

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
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
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
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
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

      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        className={cn(
          "relative rounded-full overflow-hidden cursor-pointer group",
          "border-4 border-dashed border-border hover:border-primary/50 transition-colors",
          sizeClasses[size]
        )}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt="Avatar"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="h-6 w-6 text-white" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <Camera className="h-6 w-6 mb-1" />
                <span className="text-xs">Upload</span>
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
    </div>
  );
}
