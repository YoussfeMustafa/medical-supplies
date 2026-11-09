"use client";

import React from "react";
import { useCartStore } from "@/stores/use-cart-store";
import { useTranslation } from "@/i18n/provider";
import { useAuthStore } from "@/stores/use-auth-store";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Lock, FileText, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OrderSummarySidebarProps {
  onPlaceOrder: () => void;
  isSubmitting?: boolean;
}

export function OrderSummarySidebar({
  onPlaceOrder,
  isSubmitting = false,
}: OrderSummarySidebarProps) {
  const { t, locale } = useTranslation();
  const {
    items,
    couponCode,
    getSubtotal,
    getDiscount,
    getShippingCost,
    getTax,
    getTotal,
    hasPrescriptionItems,
  } = useCartStore();
  const { user } = useAuthStore();
  const isWholesale = user?.role === "wholesale";

  const subtotal = getSubtotal(isWholesale);
  const discount = getDiscount(isWholesale);
  const shipping = getShippingCost(isWholesale);
  const tax = getTax(isWholesale);
  const total = getTotal(isWholesale);
  const requiresPrescription = hasPrescriptionItems();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-5">
      <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        أصناف الشحنة ({items.length})
      </h3>

      {/* Items Mini List */}
      <div className="max-h-60 overflow-y-auto space-y-3 pe-1">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.variantId || "default"}`}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={item.product.images[0]}
                alt={item.product.name[locale]}
                className="h-10 w-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800 flex-shrink-0"
              />
              <div className="overflow-hidden">
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                  {item.product.name[locale]}
                </span>
                <span className="text-slate-400 text-[11px]">
                  الكمية: {item.quantity} × {formatCurrency(item.priceAtAddition, locale)}
                </span>
              </div>
            </div>
            <span className="font-bold text-slate-900 dark:text-white flex-shrink-0">
              {formatCurrency(item.priceAtAddition * item.quantity, locale)}
            </span>
          </div>
        ))}
      </div>

      {requiresPrescription && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 dark:bg-rose-950/30 p-3 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
          <FileText className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>تحتوي الشحنة على أصناف مقيدة تستوجب اعتماد الوصفة الطبية.</span>
        </div>
      )}

      {/* Financial Calculations */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center justify-between">
          <span>{t("cart.subtotal")}</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(subtotal, locale)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 font-semibold">
            <span>الخصم المطبق ({couponCode})</span>
            <span>-{formatCurrency(discount, locale)}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span>{t("cart.vat")}</span>
          <span>{formatCurrency(tax, locale)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>{t("cart.shipping")}</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-600 font-bold">مجاني</span>
            ) : (
              formatCurrency(shipping, locale)
            )}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-slate-900 dark:text-white block">
            {t("cart.total")}
          </span>
          <span className="text-[10px] text-slate-400">شامل الضريبة 14%</span>
        </div>
        <span className="text-xl font-extrabold text-teal-700 dark:text-teal-400">
          {formatCurrency(total, locale)}
        </span>
      </div>

      {/* Place Order CTA */}
      <Button
        onClick={onPlaceOrder}
        variant="medical"
        size="lg"
        disabled={isSubmitting || items.length === 0}
        className="w-full text-sm font-bold shadow-lg shadow-teal-600/20 h-12"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>جارِ تسجيل الطلب وإصدار الفاتورة...</span>
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            <span>{t("checkout.placeOrder")}</span>
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span>شهادة أمان المعاملات الطبية المعتمدة</span>
      </div>
    </div>
  );
}
