"use client";

import React from "react";
import { FileText, AlertCircle } from "lucide-react";
import { Badge } from "./badge";
import { useTranslation } from "@/i18n/provider";

export function PrescriptionBadge({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <Badge
      variant="prescription"
      className={`inline-flex items-center gap-1 font-semibold text-[11px] ${className || ""}`}
      title={t("product.prescriptionWarning")}
    >
      <FileText className="h-3 w-3 text-rose-600" />
      <span>{t("product.prescriptionRequired")}</span>
    </Badge>
  );
}

export function PrescriptionWarningBanner() {
  const { t } = useTranslation();

  return (
    <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/80 dark:bg-rose-950/30 dark:border-rose-900/60 p-4 text-rose-800 dark:text-rose-200 text-xs sm:text-sm">
      <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="block font-semibold mb-0.5">
          {t("product.prescriptionRequired")}
        </strong>
        {t("product.prescriptionWarning")}
      </div>
    </div>
  );
}
