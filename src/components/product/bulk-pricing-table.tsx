"use client";

import React from "react";
import { Product, BulkPricingTier } from "@/types/product.types";
import { useTranslation } from "@/i18n/provider";
import { formatCurrency } from "@/lib/utils";
import { Building2, Sparkles, TrendingDown } from "lucide-react";

interface BulkPricingTableProps {
  product: Product;
  selectedQuantity: number;
  onSelectTierQuantity?: (qty: number) => void;
}

export function BulkPricingTable({
  product,
  selectedQuantity,
  onSelectTierQuantity,
}: BulkPricingTableProps) {
  const { t, locale } = useTranslation();

  if (!product.bulkTiers || product.bulkTiers.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-teal-200/80 dark:border-teal-900/50 bg-gradient-to-br from-teal-50/50 to-cyan-50/30 dark:from-teal-950/20 dark:to-slate-900 p-5 shadow-sm">
      <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-sm mb-3">
        <Building2 className="h-4 w-4" />
        <h4>{t("product.wholesaleTiersTitle")}</h4>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        أسعار تفضيلية مخصصة للمستشفيات، العيادات، ومعامل التحاليل الطبية عند طلب كميات شهرية مجمعة.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-start text-xs border-collapse">
          <thead>
            <tr className="border-b border-teal-200/60 dark:border-teal-900/40 text-slate-500 dark:text-slate-400">
              <th className="py-2.5 px-3 text-start font-semibold">
                {t("product.minQuantity")}
              </th>
              <th className="py-2.5 px-3 text-start font-semibold">
                {t("product.discount")}
              </th>
              <th className="py-2.5 px-3 text-start font-semibold">
                {t("product.unitPrice")}
              </th>
              <th className="py-2.5 px-3 text-end font-semibold">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-100/60 dark:divide-teal-900/30">
            {product.bulkTiers.map((tier, idx) => {
              const isApplied = selectedQuantity >= tier.minQuantity;
              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isApplied
                      ? "bg-teal-100/60 dark:bg-teal-900/40 font-semibold text-teal-900 dark:text-teal-200"
                      : "hover:bg-teal-50/60 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <td className="py-3 px-3">
                    <span className="font-bold">{tier.minQuantity}</span> قطع فما فوق
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                      <TrendingDown className="h-3 w-3" />
                      <span>{tier.discountPercentage}%</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-teal-700 dark:text-teal-400">
                    {formatCurrency(tier.unitPrice, locale)}
                  </td>
                  <td className="py-3 px-3 text-end">
                    {onSelectTierQuantity && (
                      <button
                        onClick={() => onSelectTierQuantity(tier.minQuantity)}
                        className="min-h-11 font-semibold text-teal-700 dark:text-teal-300 hover:underline"
                      >
                        تطبيق الكمية
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
