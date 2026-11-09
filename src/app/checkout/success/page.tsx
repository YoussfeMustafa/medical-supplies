"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/provider";
import {
  CheckCircle2,
  Printer,
  Package,
  Truck,
  ShieldCheck,
  ArrowRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "MED-884920";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 max-w-2xl text-center space-y-6 sm:space-y-8">
      {/* Success Badge */}
      <div className="space-y-4">
        <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="h-10 w-10 animate-pulse-subtle" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {t("checkout.orderSuccessTitle")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          {t("checkout.orderSuccessSubtitle", { orderNumber })}
        </p>
      </div>

      {/* Order Card & Tracking Stepper */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm text-start space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block">رقم أمر التوريد الطبي:</span>
            <span className="text-lg font-mono font-bold text-teal-700 dark:text-teal-400">
              {orderNumber}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>تم التأكيد والتوجيه للمستودع</span>
          </span>
        </div>

        {/* Tracking Timeline Stepper */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            مراحل تجهيز الشحنة الطبية
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200">
              <Package className="h-5 w-5 mx-auto mb-1 text-teal-600" />
              <span className="block text-xs font-bold">1. تسجيل الطلب</span>
              <span className="text-[10px] text-teal-600 font-semibold">مكتمل</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
              <ShieldCheck className="h-5 w-5 mx-auto mb-1 text-slate-400" />
              <span className="block text-xs font-bold">2. فحص الجودة والتشغيلة</span>
              <span className="text-[10px] text-slate-400">جارِ الفحص</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
              <Truck className="h-5 w-5 mx-auto mb-1 text-slate-400" />
              <span className="block text-xs font-bold">3. الشحن المبرد</span>
              <span className="text-[10px] text-slate-400">قريباً</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-slate-400" />
              <span className="block text-xs font-bold">4. الاستلام النهائي</span>
              <span className="text-[10px] text-slate-400">خلال 48 ساعة</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-xs"
          >
            <Printer className="h-4 w-4" />
            <span>{t("checkout.downloadInvoice")}</span>
          </Button>

          <Link href="/account/orders">
            <Button variant="secondary" size="sm" className="text-xs font-semibold">
              <span>{t("checkout.trackOrder")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <Link href="/products">
          <Button variant="medical" size="lg" className="text-xs sm:text-sm font-bold">
            {t("checkout.backToHome")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">جارِ تحميل تأكيد الطلب...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
