import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  subtitle?: string;
  variant?: "default" | "warning" | "danger" | "success";
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
  variant = "default",
}: StatCardProps) {
  const borderVariants = {
    default: "border-slate-200 dark:border-slate-800",
    warning: "border-amber-300 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20",
    danger: "border-rose-300 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/20",
    success: "border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white dark:bg-slate-900 p-5 shadow-sm transition-all hover:shadow-md",
        borderVariants[variant]
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400 flex-shrink-0">
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {value}
        </h3>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-bold ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
