"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  status: "success" | "error" | null;
  message: string;
}

export function Toast({ status, message }: ToastProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!status) {
      setEntered(false);
      return;
    }
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [status]);

  if (!status) return null;

  const tone =
    status === "success"
      ? "border-success/40 bg-success/10 text-success"
      : "border-error/40 bg-error/10 text-error";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast-feedback ${entered ? "is-in" : ""} mt-6 rounded-md border px-4 py-3 text-sm font-semibold ${tone}`}
    >
      {message}
    </div>
  );
}
