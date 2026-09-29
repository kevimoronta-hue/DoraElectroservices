import { NEEDS_OPTIONS } from "@/lib/form-config";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Icon } from "@/components/ui/Icon";
import type { UseFormRegister } from "react-hook-form";
import type { QuoteFormValues } from "@/types";

interface CheckboxGroupProps {
  register: UseFormRegister<QuoteFormValues>;
  error?: string;
}

export function CheckboxGroup({ register, error }: CheckboxGroupProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-1 text-sm font-semibold text-text-primary">¿Qué necesitas?</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {NEEDS_OPTIONS.map((option) => (
          // The whole card is the label: native checkbox stays functional and
          // keyboard/screen-reader accessible, just visually hidden — the
          // card's border/fill react to `:checked` via `:has()` in CSS, no
          // JS state duplication needed.
          <label key={option.id} className="needs-chip">
            <input type="checkbox" value={option.label} {...register("necesidades")} className="needs-chip-input" />
            <span className="needs-chip-label">{option.label}</span>
            <Icon name="check" size={16} className="needs-chip-check" />
          </label>
        ))}
      </div>
      <ErrorMessage id="necesidades-error" message={error} />
    </fieldset>
  );
}
