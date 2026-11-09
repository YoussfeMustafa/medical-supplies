"use client";

import React from "react";
import { useTranslation } from "@/i18n/provider";
import { useAuthStore } from "@/stores/use-auth-store";
import { PhoneCall, ShieldCheck, Building2, User, Lock } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";

export function TopBanner() {
  const { t } = useTranslation();
  const { user, switchRole } = useAuthStore();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 transition-colors">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Hotline & Quality guarantee */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
            <PhoneCall className="h-3.5 w-3.5" />
            <span>{t("nav.emergencyHotline")}</span>
          </div>
          <span className="hidden sm:inline text-slate-500">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>توريد طبي معتمد ومطابق للمواصفات القياسية (ISO 13485)</span>
          </div>
        </div>

        {/* Right: Demo Role Switcher & Language Switcher */}
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-1 bg-slate-800/90 rounded-lg p-0.5 border border-slate-700">
            <span className="text-[11px] text-slate-400 px-2 hidden lg:inline">
              دور المستخدم التجريبي:
            </span>
            <button
              onClick={() => switchRole("admin")}
              className={`flex min-h-9 items-center gap-1 px-2 sm:px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                user?.role === "admin"
                  ? "bg-teal-600 text-white font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
              title="دخول كمدير نظام ورئيس صيادلة"
            >
              <Lock className="h-3 w-3" />
              <span>أدمن</span>
            </button>
            <button
              onClick={() => switchRole("wholesale")}
              className={`flex min-h-9 items-center gap-1 px-2 sm:px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                user?.role === "wholesale"
                  ? "bg-teal-600 text-white font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
              title="دخول كمستشفى أو عيادة لرؤية أسعار الجملة"
            >
              <Building2 className="h-3 w-3" />
              <span>مستشفى / عيادة</span>
            </button>
            <button
              onClick={() => switchRole("customer")}
              className={`flex min-h-9 items-center gap-1 px-2 sm:px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                user?.role === "customer"
                  ? "bg-teal-600 text-white font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
              title="دخول كعميل أفراد عادي"
            >
              <User className="h-3 w-3" />
              <span>فرد / مريض</span>
            </button>
          </div>

          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
