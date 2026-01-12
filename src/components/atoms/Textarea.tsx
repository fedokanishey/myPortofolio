import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex min-h-[100px] w-full rounded-lg border bg-background text-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        ghost:
          "border-transparent bg-muted focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-ring",
        error:
          "border-destructive focus-visible:ring-2 focus-visible:ring-destructive",
      },
      textareaSize: {
        default: "px-3 py-2",
        sm: "px-2 py-1 text-xs min-h-[60px]",
        lg: "px-4 py-3 min-h-[150px]",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textareaSize, error, ...props }, ref) => {
    const textareaVariant = error ? "error" : variant;

    return (
      <textarea
        className={cn(
          textareaVariants({ variant: textareaVariant, textareaSize, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
