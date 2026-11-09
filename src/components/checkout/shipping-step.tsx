"use client";

import React from "react";
import { useTranslation } from "@/i18n/provider";
import { ShippingMethod } from "@/types/order.types";
import { SHIPPING_OPTIONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Truck, Zap, Snowflake, CheckCircle2 } from "lucide-react";

interface ShippingStepProps {
  selectedMethod: ShippingMethod;
  onSelect: (method: ShippingMethod) => void;
  subtotal: number;
}

export function ShippingStep({
  selectedMethod,
  onSelect,
  subtotal,
}: ShippingStepProps) {
  const { t, locale } = useTranslation();

  const methods: {
    id: ShippingMethod;
    icon: React.ReactNode;
    title: string;
    desc: string;
    time: string;
    cost: number;
    freeThreshold: number;
  }[] = [
    {
      id: "standard",
      icon: <Truck className="h-5 w-5 text-teal-600" />,
      title: SHIPPING_OPTIONS.standard.name[locale],
      desc: SHIPPING_OPTIONS.standard.description[locale],
      time: SHIPPING_OPTIONS.standard.estimatedDays[locale],
      cost: SHIPPING_OPTIONS.standard.cost,
      freeThreshold: SHIPPING_OPTIONS.standard.freeThreshold,
    },
    {
      id: "express",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      title: SHIPPING_OPTIONS.express.name[locale],
      desc: SHIPPING_OPTIONS.express.description[locale],
      time: SHIPPING_OPTIONS.express.estimatedDays[locale],
      cost: SHIPPING_OPTIONS.express.cost,
      freeThreshold: SHIPPING_OPTIONS.express.freeThreshold,
    },
    {
      id: "cold_chain",
      icon: <Snowflake className="h-5 w-5 text-cyan-500" />,
      title: SHIPPING_OPTIONS.cold_chain.name[locale],
      desc: SHIPPING_OPTIONS.cold_chain.description[locale],
      time: SHIPPING_OPTIONS.cold_chain.estimatedDays[locale],
      cost: SHIPPING_OPTIONS.cold_chain.cost,
      freeThreshold: SHIPPING_OPTIONS.cold_chain.freeThreshold,
    },
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="h-8 w-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 font-bold text-sm">
          2
        </div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {t("checkout.step2")}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {methods.map((method) => {
          const isSelected = selectedMethod === method.id;
          const isFree = subtotal >= method.freeThreshold;

          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-teal-600 bg-teal-50/40 dark:bg-teal-950/30 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  }`}
                >
                  {method.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{method.title}</span>
                    {isSelected && (
                      <CheckCircle2 className="h-4 w-4 text-teal-600 inline" />
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {method.desc}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                    {method.time}
                  </span>
                </div>
              </div>

              <div className="text-start sm:text-end">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {isFree ? (
                    <span className="text-emerald-600 font-bold">مجاني</span>
                  ) : (
                    formatCurrency(method.cost, locale)
                  )}
                </span>
                {!isFree && (
                  <span className="block text-[10px] text-slate-400">
                    مجاني عند الشراء بأكثر من {method.freeThreshold} ج.م
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
