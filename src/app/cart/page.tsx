"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";
import { useCartStore } from "@/stores/use-cart-store";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CartSummary } from "@/components/cart/cart-summary";
import { ShoppingBag, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { t } = useTranslation();
  const { items, clearCart, hasPrescriptionItems } = useCartStore();
  const requiresPrescription = hasPrescriptionItems();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center mx-auto text-teal-600">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          {t("cart.empty")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          {t("cart.emptySubtitle")}
        </p>
        <div className="pt-2">
          <Link href="/products">
            <Button variant="medical" size="lg" className="text-sm font-bold">
              {t("cart.startShopping")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("cart.title")}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            مراجعة المستلزمات الطبية والكميات قبل استكمال بيانات الشحن والتوريد.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:underline"
        >
          تفريغ السلة بالكامل
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-6 shadow-sm space-y-2">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <CartItemRow
                key={`${item.product.id}-${item.variantId || "default"}`}
                item={item}
              />
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-semibold hover:underline"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>{t("cart.continueShopping")}</span>
            </Link>
            <span>{items.length} أصناف مسجلة</span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4 sticky top-24">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
