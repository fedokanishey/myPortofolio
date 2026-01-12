import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton animate-pulse rounded-md bg-muted",
        variant === "circular" && "rounded-full",
        variant === "text" && "h-4 w-full",
        className
      )}
      {...props}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-xl border border-border p-6">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" className="h-12 w-12" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-32 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

function SkeletonProfile() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton variant="circular" className="h-24 w-24" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonProfile };
