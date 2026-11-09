"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/use-cart-store";
import { useTranslation } from "@/i18n/provider";
import { useAuthStore } from "@/stores/use-auth-store";
import { formatCurrency } from "@/lib/utils";
import { X, ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";
import { CartItemRow } from "./cart-item-row";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { t, locale } = useTranslation();
  const {
    items,
    isDrawerOpen,
    setDrawerOpen,
    getSubtotal,
    hasPrescriptionItems,
  } = useCartStore();
  const { user } = useAuthStore();
  const isWholesale = user?.role === "wholesale";

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotal(isWholesale);
  const requiresPrescription = hasPrescriptionItems();

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 end-0 z-50 flex max-w-full">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-end duration-300">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {t("cart.title")}
                </h3>
                <span className="text-xs text-slate-400">
                  {items.length} أصناف في السلة
                </span>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {t("cart.empty")}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {t("cart.emptySubtitle")}
                </p>
                <Link
                  href="/products"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-block pt-2"
                >
                  <Button variant="medical" size="sm" className="text-xs">
                    {t("cart.startShopping")}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                {requiresPrescription && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50/70 dark:bg-rose-950/30 p-3 text-[11px] text-rose-800 dark:text-rose-300 flex items-start gap-2 mb-3">
                    <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{t("cart.prescriptionItemsNotice")}</span>
                  </div>
                )}
                {items.map((item) => (
                  <CartItemRow
                    key={`${item.product.id}-${item.variantId || "default"}`}
                    item={item}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  {t("cart.subtotal")}
                </span>
                <span className="text-base font-bold text-teal-700 dark:text-teal-400">
                  {formatCurrency(subtotal, locale)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                الشحن والضرائب تحسب بدقة في خطوة الدفع التالية.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full text-xs h-11">
                    عرض السلة كاملة
                  </Button>
                </Link>

                <Link
                  href="/checkout"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full"
                >
                  <Button variant="medical" size="sm" className="w-full text-xs h-11 font-bold">
                    <span>إتمام الطلب</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
