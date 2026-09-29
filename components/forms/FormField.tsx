import type { ReactNode } from "react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-text-primary">
        {label} {required && <span className="text-red-electric">*</span>}
      </label>
      {children}
      {hint && !error && <span className="text-xs text-text-muted">{hint}</span>}
      <ErrorMessage id={`${id}-error`} message={error} />
    </div>
  );
}

export const inputClasses =
  "h-12 rounded-md border border-white/[0.14] bg-background-secondary px-3.5 text-[15px] text-text-primary placeholder:text-text-muted focus-visible:border-red-primary";

export const textareaClasses =
  "min-h-[120px] rounded-md border border-white/[0.14] bg-background-secondary px-3.5 py-3 text-[15px] text-text-primary placeholder:text-text-muted focus-visible:border-red-primary";

export const selectClasses = inputClasses;
