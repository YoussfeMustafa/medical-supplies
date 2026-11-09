"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/use-cart-store";
import { useTranslation } from "@/i18n/provider";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import { formatCurrency } from "@/lib/utils";
import { Tag, ArrowRight, ShieldCheck, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CartSummary({ showCheckoutButton = true }: { showCheckoutButton?: boolean }) {
  const { t, locale } = useTranslation();
  const {
    items,
    couponCode,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getShippingCost,
    getTax,
    getTotal,
    hasPrescriptionItems,
  } = useCartStore();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const isWholesale = user?.role === "wholesale";
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = getSubtotal(isWholesale);
  const discount = getDiscount(isWholesale);
  const shipping = getShippingCost(isWholesale);
  const tax = getTax(isWholesale);
  const total = getTotal(isWholesale);
  const requiresPrescription = hasPrescriptionItems();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim(), isWholesale);
    if (res.success) {
      setCouponError("");
      setCouponInput("");
      addToast({
        title: "تم تطبيق الكود",
        description: res.message,
        type: "success",
      });
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        ملخص الطلب المالي
      </h3>

      {/* Prescription Notice */}
      {requiresPrescription && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 dark:bg-rose-950/30 p-3 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{t("cart.prescriptionItemsNotice")}</span>
        </div>
      )}

      {/* Breakdown */}
      <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center justify-between">
          <span>{t("cart.subtotal")}</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(subtotal, locale)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 font-semibold">
            <span>
              {t("cart.discount")} ({couponCode})
            </span>
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
              <span className="text-emerald-600 font-semibold">
                {t("cart.freeShipping")}
              </span>
            ) : (
              formatCurrency(shipping, locale)
            )}
          </span>
        </div>
      </div>

      {/* Coupon Input */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        {couponCode ? (
          <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold">
              <Tag className="h-3.5 w-3.5" />
              <span>الكود النشط: {couponCode}</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-slate-400 hover:text-rose-600 font-semibold"
            >
              إلغاء
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="space-y-1.5">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="كود الخصم (مثال: CURE10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="text-xs h-9 uppercase"
              />
              <Button type="submit" variant="secondary" size="sm" className="text-xs h-9">
                {t("cart.applyCoupon")}
              </Button>
            </div>
            {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
          </form>
        )}
      </div>

      {/* Final Total */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-slate-900 dark:text-white block">
            {t("cart.total")}
          </span>
          <span className="text-[10px] text-slate-400">شامل ضريبة القيمة المضافة والشحن</span>
        </div>
        <span className="text-xl font-extrabold text-teal-700 dark:text-teal-400">
          {formatCurrency(total, locale)}
        </span>
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && (
        <Link href="/checkout" className="block w-full pt-2">
          <Button
            variant="medical"
            size="lg"
            className="w-full text-sm font-bold shadow-md shadow-teal-600/20"
            disabled={items.length === 0}
          >
            <span>{t("cart.proceedToCheckout")}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      )}

      {/* Trust Guarantee */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
        <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
        <span>دفع مؤمن بتشفير 256-bit وفاتورة ضريبية معتمدة</span>
      </div>
    </div>
  );
}
