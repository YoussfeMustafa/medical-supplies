import React from "react";
import Link from "next/link";
import { AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { Product } from "@/types/product.types";
import { isExpiringSoon } from "@/lib/utils";

interface ExpiryAlertBannerProps {
  products: Product[];
}

export function ExpiryAlertBanner({ products }: ExpiryAlertBannerProps) {
  const expiringProducts = products
    .map((p) => ({
      product: p,
      expiryInfo: isExpiringSoon(p.expiryDate),
    }))
    .filter((item) => item.expiryInfo.isCritical || item.expiryInfo.isWarning);

  if (expiringProducts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              تنبيه إدارة الصيدليات: مستلزمات طبية تقترب من انتهاء الصلاحية ({expiringProducts.length} أصناف)
            </h4>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">
              المعايير الطبية الدولية تلزم بإيقاف صرف المستلزمات الطبية المعقمة قبل 30 يوماً من انتهاء الصلاحية أو تطبيق خطة تخفيضات عاجلة.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {expiringProducts.slice(0, 3).map(({ product, expiryInfo }) => (
                <div
                  key={product.id}
                  className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 px-3 py-1.5 text-xs"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {product.name.ar}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    ({product.lotNumber})
                  </span>
                  <span
                    className={`font-bold ${
                      expiryInfo.isCritical ? "text-rose-600" : "text-amber-600"
                    }`}
                  >
                    متبقي {expiryInfo.daysRemaining} يوماً
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/admin/inventory"
          className="flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-300 hover:underline flex-shrink-0"
        >
          <span>عرض جدول التشغيلات</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
