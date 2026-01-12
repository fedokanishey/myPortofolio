import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-24 w-24 text-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  fallback?: string;
}

function Avatar({
  className,
  size,
  src,
  alt = "Avatar",
  fallback,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const showFallback = !src || hasError;

  return (
    <div
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {showFallback ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-purple-500 text-white font-medium">
          {fallback ? getInitials(fallback) : "?"}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

export { Avatar, avatarVariants };
