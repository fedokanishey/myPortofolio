import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-2xl border transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-card/95 to-card/85 dark:from-[#0d121c]/90 dark:to-[#090d14]/90 text-card-foreground border-border/70 dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] backdrop-blur-xl",
        glass: "glass-card",
        outline: "bg-transparent border-border/70 hover:border-primary/50",
        gradient:
          "bg-gradient-to-br from-primary/10 via-card/90 to-purple-500/10 border-primary/25 shadow-lg",
      },
      hover: {
        none: "",
        lift: "hover:shadow-xl hover:-translate-y-1 hover:border-primary/40",
        glow: "hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50",
        scale: "hover:scale-[1.015]",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "none",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  showDecoration?: boolean;
}

function Card({ className, variant = "default", hover, showDecoration = true, children, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, hover }), className)} {...props}>
      {showDecoration && variant === "default" && (
        <>
          {/* Subtle Top Accent Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/35 dark:via-primary/50 to-transparent pointer-events-none" />
          
          {/* Subtle Micro Dot Pattern (Distinct from main background) */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />
          
          {/* Soft Corner Ambient Accent */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-semibold leading-none tracking-tight text-lg", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
