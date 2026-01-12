"use client";

import * as React from "react";
import { Input, InputProps } from "@/components/atoms/Input";
import { Textarea, TextareaProps } from "@/components/atoms/Textarea";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface InputFieldProps extends FormFieldProps, Omit<InputProps, "error"> {}
interface TextareaFieldProps extends FormFieldProps, Omit<TextareaProps, "error"> {}

export function FormField({
  label,
  error,
  description,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-xs text-destructive animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}

export function InputField({
  label,
  error,
  description,
  required,
  className,
  ...props
}: InputFieldProps) {
  return (
    <FormField
      label={label}
      error={error}
      description={description}
      required={required}
      className={className}
    >
      <Input error={error} {...props} />
    </FormField>
  );
}

export function TextareaField({
  label,
  error,
  description,
  required,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <FormField
      label={label}
      error={error}
      description={description}
      required={required}
      className={className}
    >
      <Textarea error={error} {...props} />
    </FormField>
  );
}
