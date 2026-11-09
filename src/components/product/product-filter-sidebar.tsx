"use client";

import React from "react";
import { useTranslation } from "@/i18n/provider";
import { Category, Brand } from "@/types/product.types";
import { ProductFilters } from "@/types/api.types";
import { Filter, RotateCcw, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductFilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  filters: ProductFilters;
  onFilterChange: (newFilters: Partial<ProductFilters>) => void;
  onReset: () => void;
}

export function ProductFilterSidebar({
  categories,
  brands,
  filters,
  onFilterChange,
  onReset,
}: ProductFilterSidebarProps) {
  const { t, locale } = useTranslation();

  return (
    <div className="w-full space-y-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-teal-600" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t("catalog.filters")}
          </h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline"
        >
          <RotateCcw className="h-3 w-3" />
          <span>{t("catalog.clearFilters")}</span>
        </button>
      </div>

      {/* Stock & Prescription Toggles */}
      <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <label className="flex min-h-11 items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={!!filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked || undefined, page: 1 })}
            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
          />
          <span>المتوفر بالمستودع فقط</span>
        </label>

        <label className="flex min-h-11 items-center gap-2.5 cursor-pointer text-xs font-medium text-rose-700 dark:text-rose-400">
          <input
            type="checkbox"
            checked={!!filters.requiresPrescription}
            onChange={(e) =>
              onFilterChange({
                requiresPrescription: e.target.checked ? true : undefined,
                page: 1,
              })
            }
            className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
          />
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            <span>منتجات تستلزم وصفة طبية</span>
          </span>
        </label>
      </div>

      {/* Categories */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          {t("catalog.category")}
        </h4>
        <div className="max-h-56 overflow-y-auto space-y-1 pe-1">
          <button
            onClick={() => onFilterChange({ category: undefined, page: 1 })}
            className={`w-full min-h-11 flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-start transition-colors ${
              !filters.category
                ? "bg-teal-50 dark:bg-teal-950/60 font-bold text-teal-700 dark:text-teal-300"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span>{t("catalog.allProducts")}</span>
            {!filters.category && <Check className="h-3.5 w-3.5" />}
          </button>

          {categories.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ category: cat.slug, page: 1 })}
                className={`w-full min-h-11 flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-start transition-colors ${
                  isSelected
                    ? "bg-teal-50 dark:bg-teal-950/60 font-bold text-teal-700 dark:text-teal-300"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="truncate">{cat.name[locale]}</span>
                {isSelected && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          {t("catalog.brand")}
        </h4>
        <div className="max-h-48 overflow-y-auto space-y-1 pe-1">
          <button
            onClick={() => onFilterChange({ brand: undefined, page: 1 })}
            className={`w-full min-h-11 flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-start transition-colors ${
              !filters.brand
                ? "bg-teal-50 dark:bg-teal-950/60 font-bold text-teal-700 dark:text-teal-300"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span>كافة الشركات</span>
            {!filters.brand && <Check className="h-3.5 w-3.5" />}
          </button>
          {brands.map((b) => {
            const isSelected = filters.brand?.toLowerCase() === b.name.toLowerCase();
            return (
              <button
                key={b.id}
                onClick={() => onFilterChange({ brand: b.name, page: 1 })}
                className={`w-full min-h-11 flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-start transition-colors ${
                  isSelected
                    ? "bg-teal-50 dark:bg-teal-950/60 font-bold text-teal-700 dark:text-teal-300"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span>{b.name}</span>
                {isSelected && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          {t("catalog.priceRange")} (ج.م)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">من</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                onFilterChange({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                  page: 1,
                })
              }
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">إلى</label>
            <input
              type="number"
              placeholder="50000"
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                onFilterChange({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                  page: 1,
                })
              }
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
