"use client";

import React from "react";
import { useTranslation } from "@/i18n/provider";
import { Address } from "@/types/user.types";
import { useAuthStore } from "@/stores/use-auth-store";
import { Input } from "@/components/ui/input";
import { MapPin, Building, Phone, User as UserIcon } from "lucide-react";

interface AddressStepProps {
  address: Partial<Address>;
  onChange: (field: keyof Address, value: string) => void;
  errors?: Record<string, string>;
}

export function AddressStep({ address, onChange, errors }: AddressStepProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const isWholesale = user?.role === "wholesale";

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="h-8 w-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 font-bold text-sm">
          1
        </div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {t("checkout.step1")}
        </h3>
      </div>

      {isWholesale && (
        <div className="rounded-xl border border-teal-200 bg-teal-50/50 dark:bg-teal-950/30 p-3.5 text-xs text-teal-800 dark:text-teal-300">
          <strong>تنبيه المنشآت الطبية:</strong> سيتم إصدار الفاتورة الضريبية باسم المنشأة ورقمها الضريبي المسجل.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t("checkout.fullName")} *
          </label>
          <Input
            value={address.recipientName || ""}
            onChange={(e) => onChange("recipientName", e.target.value)}
            placeholder="د. أحمد مصطفى"
            icon={<UserIcon className="h-4 w-4" />}
            error={errors?.recipientName}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t("checkout.phone")} *
          </label>
          <Input
            value={address.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+20 100 123 4567"
            icon={<Phone className="h-4 w-4" />}
            error={errors?.phone}
          />
        </div>

        {/* Building / Clinic */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t("checkout.building")} *
          </label>
          <Input
            value={address.building || ""}
            onChange={(e) => onChange("building", e.target.value)}
            placeholder="مستشفى النور - عمارة 12 - الدور 3"
            icon={<Building className="h-4 w-4" />}
            error={errors?.building}
          />
        </div>

        {/* Street */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t("checkout.street")} *
          </label>
          <Input
            value={address.street || ""}
            onChange={(e) => onChange("street", e.target.value)}
            placeholder="شارع الثورة - متفرع من شارع النزهة"
            icon={<MapPin className="h-4 w-4" />}
            error={errors?.street}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t("checkout.city")} *
          </label>
          <Input
            value={address.city || ""}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="مصر الجديدة / مدينة نصر"
            error={errors?.city}
          />
        </div>

        {/* Governorate */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {t("checkout.governorate")} *
          </label>
          <Input
            value={address.governorate || ""}
            onChange={(e) => onChange("governorate", e.target.value)}
            placeholder="القاهرة / الجيزة / الإسكندرية"
            error={errors?.governorate}
          />
        </div>
      </div>
    </div>
  );
}
