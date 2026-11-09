"use client";

import React from "react";
import Link from "next/link";
import { CartItem, useCartStore } from "@/stores/use-cart-store";
import { useTranslation } from "@/i18n/provider";
import { useAuthStore } from "@/stores/use-auth-store";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CartItemRow({ item }: { item: CartItem }) {
  const { t, locale } = useTranslation();
  const { updateQuantity, removeItem } = useCartStore();
  const { user } = useAuthStore();
  const isWholesale = user?.role === "wholesale";

  const { product, quantity, variantId, variantName, priceAtAddition } = item;
  const lineTotal = priceAtAddition * quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
      >
        <img
          src={product.images[0]}
          alt={product.name[locale]}
          className="h-full w-full object-cover"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-teal-600 transition-colors line-clamp-2"
            >
              {product.name[locale]}
            </Link>
            <button
              onClick={() => removeItem(product.id, variantId)}
              className="min-h-11 min-w-11 shrink-0 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors p-1"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span>{product.brand}</span>
            {variantName && (
              <>
                <span>•</span>
                <span className="font-medium text-teal-700 dark:text-teal-300">
                  {variantName[locale]}
                </span>
              </>
            )}
            {product.requiresPrescription && (
              <Badge variant="prescription" className="text-[10px] py-0 px-1.5">
                <FileText className="h-2.5 w-2.5" />
                <span>بوصفة</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Quantity Controls & Price */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 overflow-hidden">
            <button
              onClick={() =>
                updateQuantity(product.id, quantity - 1, variantId, isWholesale)
              }
              className="min-h-11 min-w-11 flex items-center justify-center p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-slate-900 dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(product.id, quantity + 1, variantId, isWholesale)
              }
              className="min-h-11 min-w-11 flex items-center justify-center p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <div className="text-end">
            <span className="text-sm font-bold text-teal-700 dark:text-teal-400">
              {formatCurrency(lineTotal, locale)}
            </span>
            {quantity > 1 && (
              <span className="text-[10px] text-slate-400 block">
                {formatCurrency(priceAtAddition, locale)} / قطعة
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
