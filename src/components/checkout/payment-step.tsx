"use client";

import React from "react";
import { useTranslation } from "@/i18n/provider";
import { PaymentMethod } from "@/types/order.types";
import { CreditCard, Banknote, Landmark, CheckCircle2, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PaymentStepProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  cardData: {
    number: string;
    holder: string;
    expiry: string;
    cvv: string;
  };
  onCardChange: (field: string, value: string) => void;
}

export function PaymentStep({
  selectedMethod,
  onSelect,
  cardData,
  onCardChange,
}: PaymentStepProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="h-8 w-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 font-bold text-sm">
          3
        </div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {t("checkout.step3")}
        </h3>
      </div>

      {/* Payment Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card */}
        <div
          onClick={() => onSelect("credit_card")}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedMethod === "credit_card"
              ? "border-teal-600 bg-teal-50/40 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
          }`}
        >
          <CreditCard className="h-5 w-5 text-teal-600 mb-2" />
          <h4 className="font-bold text-xs">{t("checkout.creditCard")}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">فيزا / ماستركارد / ميزة</p>
        </div>

        {/* Cash on Delivery */}
        <div
          onClick={() => onSelect("cash_on_delivery")}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedMethod === "cash_on_delivery"
              ? "border-teal-600 bg-teal-50/40 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
          }`}
        >
          <Banknote className="h-5 w-5 text-emerald-600 mb-2" />
          <h4 className="font-bold text-xs">{t("checkout.cashOnDelivery")}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">الدفع عند استلام الشحنة</p>
        </div>

        {/* Bank Wire */}
        <div
          onClick={() => onSelect("bank_transfer")}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedMethod === "bank_transfer"
              ? "border-teal-600 bg-teal-50/40 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200"
              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
          }`}
        >
          <Landmark className="h-5 w-5 text-cyan-600 mb-2" />
          <h4 className="font-bold text-xs">{t("checkout.bankTransfer")}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">تحويل للمستشفيات (IBAN)</p>
        </div>
      </div>

      {/* Credit Card Details Inputs */}
      {selectedMethod === "credit_card" && (
        <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in-0 duration-200">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {t("checkout.cardNumber")}
            </label>
            <Input
              type="text"
              placeholder="4123 •••• •••• 9874"
              value={cardData.number}
              onChange={(e) => onCardChange("number", e.target.value)}
              icon={<CreditCard className="h-4 w-4" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t("checkout.cardHolder")}
              </label>
              <Input
                type="text"
                placeholder="AHMED M ALI"
                value={cardData.holder}
                onChange={(e) => onCardChange("holder", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t("checkout.cardExpiry")}
              </label>
              <Input
                type="text"
                placeholder="10/28"
                value={cardData.expiry}
                onChange={(e) => onCardChange("expiry", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bank Wire Details (Wholesale) */}
      {selectedMethod === "bank_transfer" && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/60 dark:bg-cyan-950/30 p-3 sm:p-4 text-xs space-y-2 text-cyan-950 dark:text-cyan-200 animate-in fade-in-0">
          <p className="font-bold">بيانات الحساب البنكي الرسمي لشركة كيورلاين الطبية:</p>
          <div className="space-y-1 font-mono text-[11px] break-words bg-white dark:bg-slate-900 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <div>البنك: البنك الأهلي المصري (NBE) - فرع الأطباء</div>
            <div>اسم الحساب: شركة كيورلاين لتجارة وتوزيع المستلزمات الطبية ش.م.م</div>
            <div>رقم الحساب: 1044-8891-2093-01</div>
            <div>رقم الآيبان (IBAN): EG3800030104488912093010001</div>
          </div>
          <p className="text-[11px] text-slate-500">
            * يرجى إدراج رقم الطلب في خانة وصف التحويل وإرسال إشعار السداد لتأكيد الصرف.
          </p>
        </div>
      )}
    </div>
  );
}
