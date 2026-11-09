import React from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showScore?: boolean;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  className,
  showScore = true,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  const starSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={cn(starSizes[size], "fill-amber-400")} />
        ))}
        {hasHalfStar && (
          <StarHalf className={cn(starSizes[size], "fill-amber-400 text-amber-400")} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(starSizes[size], "text-slate-300 dark:text-slate-600")}
          />
        ))}
      </div>
      {showScore && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-slate-400">({reviewCount})</span>
      )}
    </div>
  );
}
