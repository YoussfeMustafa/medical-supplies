"use client";

import React from "react";
import { useAuthStore } from "@/stores/use-auth-store";
import { useTranslation } from "@/i18n/provider";
import { ShieldCheck, Bell, User as UserIcon } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function AdminHeader({ title }: { title: string }) {
  const { user } = useAuthStore();
  const { locale } = useTranslation();

  return (
    <header className="min-h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-2.5 py-0.5 text-[10px] font-bold text-teal-700 dark:text-teal-300">
          <ShieldCheck className="h-3 w-3" />
          <span>حساب إدارة موثق</span>
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <LanguageSwitcher />

        <div className="flex items-center gap-2.5 ps-3 border-s border-slate-200 dark:border-slate-800">
          <div className="h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="hidden md:block text-xs leading-tight">
            <span className="block font-bold text-slate-800 dark:text-slate-100">
              {user?.name || "Dr. Tarek Mansour"}
            </span>
            <span className="block text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              رئيس الصيادلة وإدارة العمليات
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
