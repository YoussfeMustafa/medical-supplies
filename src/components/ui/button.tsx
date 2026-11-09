import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link"
    | "medical";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantClasses = {
      default:
        "bg-teal-700 text-white hover:bg-teal-800 shadow-sm active:scale-[0.98]",
      medical:
        "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 shadow-md shadow-teal-500/20 active:scale-[0.98]",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 active:scale-[0.98]",
      outline:
        "border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200",
      ghost:
        "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:scale-[0.98]",
      link: "text-teal-700 dark:text-teal-400 underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeClasses = {
      default: "h-11 px-5 py-2.5 text-sm font-medium",
      sm: "h-9 px-3.5 py-1.5 text-xs font-medium rounded-md",
      lg: "h-12 px-7 py-3 text-base font-semibold rounded-lg",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50 select-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
