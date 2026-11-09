"use client";

import React from "react";
import { useUIStore, ToastMessage } from "@/stores/use-ui-store";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: () => void;
}) {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />,
    info: <Info className="h-5 w-5 text-cyan-600 flex-shrink-0" />,
  };

  const borders = {
    success: "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/90 dark:bg-emerald-950/80",
    error: "border-rose-200 dark:border-rose-900/50 bg-rose-50/90 dark:bg-rose-950/80",
    warning: "border-amber-200 dark:border-amber-900/50 bg-amber-50/90 dark:bg-amber-950/80",
    info: "border-cyan-200 dark:border-cyan-900/50 bg-cyan-50/90 dark:bg-cyan-950/80",
  };

  const type = toast.type || "info";

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-md transition-all duration-200 animate-in slide-in-from-bottom-5",
        borders[type]
      )}
    >
      {icons[type]}
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {toast.title}
        </h4>
        {toast.description && (
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded p-1 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
