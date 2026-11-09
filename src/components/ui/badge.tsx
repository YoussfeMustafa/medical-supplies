import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "prescription"
    | "coldChain"
    | "sterile";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border-teal-200",
    secondary: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200",
    destructive: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200",
    outline: "text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200",
    prescription: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 border",
    coldChain: "bg-cyan-50 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300 border-cyan-200 border",
    sterile: "bg-teal-50 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300 border-teal-200 border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
