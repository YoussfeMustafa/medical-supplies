import React from "react";
import { Product } from "@/types/product.types";
import { ProductCard } from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageX } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  viewMode?: "grid" | "list";
}

export function ProductGrid({
  products,
  isLoading = false,
  viewMode = "grid",
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3"
          >
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full rounded-lg mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-slate-50/50 dark:bg-slate-900/30">
        <PackageX className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          لم يتم العثور على منتجات مطابقة
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          جرب تغيير الفلاتر المحددة أو إعادة تعيين معايير البحث للعثور على المستلزمات الطبية.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}
