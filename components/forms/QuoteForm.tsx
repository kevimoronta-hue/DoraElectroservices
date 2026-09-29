"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema } from "@/lib/validation";
import { CLIENT_TYPES, PRIORITIES } from "@/lib/form-config";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { QuoteFormValues } from "@/types";
import { FormField, inputClasses, selectClasses, textareaClasses } from "./FormField";
import { CheckboxGroup } from "./CheckboxGroup";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Icon } from "@/components/ui/Icon";
import { trackEvent } from "@/lib/analytics";
import { useInView } from "@/lib/useInView";

type SubmitState = "idle" | "opening";

export function QuoteForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const hasStarted = useRef(false);
  const { ref: formRevealRef, inView: formInView } = useInView<HTMLFormElement>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      necesidades: [],
      tipoCliente: "Empresa",
      prioridad: "No estoy seguro",
    },
  });

  const necesidades = watch("necesidades") ?? [];
  const showOtroDetail = necesidades.includes("Otro");

  function handleFocus() {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackEvent("quote_form_start");
    }
  }

  const onSubmit = (values: QuoteFormValues) => {
    trackEvent("quote_form_submit");
    setSubmitState("opening");
    window.open(buildWhatsAppLink(values), "_blank", "noopener,noreferrer");
    trackEvent("whatsapp_click", { source: "quote_form" });
    window.setTimeout(() => setSubmitState("idle"), 1600);
  };

  const onInvalid = (formErrors: typeof errors) => {
    const firstField = Object.keys(formErrors)[0] as keyof QuoteFormValues | undefined;
    if (firstField) setFocus(firstField);
  };

  return (
    <form
      ref={formRevealRef}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onFocus={handleFocus}
      noValidate
      aria-label="Formulario de cotización"
      className={`reveal ${formInView ? "is-in" : ""} rounded-lg border border-white/[0.14] bg-surface p-5 md:p-10`}
    >
      {/* Honeypot — hidden from real users, left blank by them; bots often fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">No completar este campo</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="nombre" label="Nombre" required error={errors.nombre?.message}>
          <input id="nombre" type="text" className={inputClasses} autoComplete="given-name" {...register("nombre")} />
        </FormField>
        <FormField id="apellido" label="Apellido" hint="Opcional" error={errors.apellido?.message}>
          <input id="apellido" type="text" className={inputClasses} autoComplete="family-name" {...register("apellido")} />
        </FormField>
        <FormField id="telefono" label="Teléfono" required error={errors.telefono?.message}>
          <input id="telefono" type="tel" className={inputClasses} autoComplete="tel" {...register("telefono")} />
        </FormField>
        <FormField id="correo" label="Correo electrónico" hint="Opcional" error={errors.correo?.message}>
          <input id="correo" type="email" className={inputClasses} autoComplete="email" {...register("correo")} />
        </FormField>
        <FormField id="empresa" label="Empresa" hint="Opcional">
          <input id="empresa" type="text" className={inputClasses} {...register("empresa")} />
        </FormField>
        <FormField id="ubicacion" label="Ubicación del proyecto" hint="Opcional" error={errors.ubicacion?.message}>
          <input id="ubicacion" type="text" className={inputClasses} {...register("ubicacion")} />
        </FormField>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <FormField id="tipoCliente" label="Tipo de cliente" error={errors.tipoCliente?.message}>
          <select id="tipoCliente" className={selectClasses} {...register("tipoCliente")}>
            {CLIENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="prioridad" label="Prioridad" error={errors.prioridad?.message}>
          <select id="prioridad" className={selectClasses} {...register("prioridad")}>
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="mt-5">
        <CheckboxGroup register={register} error={errors.necesidades?.message} />
      </div>

      {showOtroDetail && (
        <div className="mt-5">
          <FormField id="necesidadOtro" label="Especifica tu necesidad" error={errors.necesidadOtro?.message}>
            <input id="necesidadOtro" type="text" className={inputClasses} {...register("necesidadOtro")} />
          </FormField>
        </div>
      )}

      <div className="mt-5">
        <FormField id="descripcion" label="Describe brevemente lo que necesitas" required error={errors.descripcion?.message}>
          <textarea
            id="descripcion"
            className={textareaClasses}
            placeholder="Cuéntanos qué necesitas y dónde se encuentra la instalación."
            {...register("descripcion")}
          />
        </FormField>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consentimiento"
          type="checkbox"
          className="mt-0.5 h-5 w-5 flex-none accent-red-primary"
          {...register("consentimiento")}
        />
        <label htmlFor="consentimiento" className="text-sm leading-relaxed text-text-secondary">
          Acepto que DORA Electroservices utilice estos datos para responder a mi solicitud. Ver{" "}
          <a href="/privacidad" className="text-red-electric underline">
            política de privacidad
          </a>
          .
        </label>
      </div>
      {errors.consentimiento?.message && (
        <p role="alert" className="mt-1.5 text-[12px] font-medium text-error">
          {errors.consentimiento.message}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4">
        <PrimaryButton type="submit" disabled={submitState === "opening"} className="whatsapp-cta w-full">
          <span key={submitState} className="quote-submit-label whatsapp-cta-content">
            <Icon
              name="whatsapp"
              size={18}
              className={`whatsapp-cta-icon ${submitState === "opening" ? "opacity-0" : ""}`}
            />
            <span className="whatsapp-cta-label">
              {submitState === "opening" ? "Abriendo WhatsApp..." : "Solicitar por WhatsApp"}
            </span>
            <span aria-hidden="true" />
          </span>
        </PrimaryButton>
      </div>
    </form>
  );
}
