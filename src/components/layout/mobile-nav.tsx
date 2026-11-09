"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";
import { useUIStore } from "@/stores/use-ui-store";
import { useAuthStore } from "@/stores/use-auth-store";
import {
  X,
  Activity,
  Package,
  FileSpreadsheet,
  FileUp,
  ShieldAlert,
  User,
  Heart,
  PhoneCall,
  Info,
  HelpCircle,
} from "lucide-react";
import { mockCategories } from "@/services/mock-data/categories.data";

export function MobileNav() {
  const { t, locale } = useTranslation();
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();
  const { user } = useAuthStore();

  if (!mobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setMobileNavOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 start-0 z-50 w-full max-w-xs bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-start duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
            <Link
              href="/"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                {locale === "ar" ? "كيورلاين الطبية" : "CureLine Medical"}
              </span>
            </Link>
            <button
              onClick={() => setMobileNavOpen(false)}
              className="min-h-11 min-w-11 rounded-full p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="py-6 space-y-1">
            <Link
              href="/products"
              onClick={() => setMobileNavOpen(false)}
              className="flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 transition-colors"
            >
              <Package className="h-5 w-5 text-teal-600" />
              <span>{t("nav.catalog")}</span>
            </Link>

            <Link
              href="/rfq"
              onClick={() => setMobileNavOpen(false)}
              className="flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:text-teal-600 transition-colors"
            >
              <FileSpreadsheet className="h-5 w-5 text-teal-600" />
              <span>{t("nav.rfq")}</span>
            </Link>

            <Link
              href="/prescriptions/upload"
              onClick={() => setMobileNavOpen(false)}
              className="flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition-colors"
            >
              <FileUp className="h-5 w-5 text-rose-500" />
              <span>{t("nav.prescriptions")}</span>
            </Link>

            <Link
              href="/account/wishlist"
              onClick={() => setMobileNavOpen(false)}
              className="flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Heart className="h-5 w-5 text-rose-500" />
              <span>{t("nav.wishlist")}</span>
            </Link>

            <Link
              href="/account"
              onClick={() => setMobileNavOpen(false)}
              className="flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <User className="h-5 w-5 text-teal-600" />
              <span>{t("nav.account")}</span>
            </Link>

            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileNavOpen(false)}
                className="flex min-h-11 items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800"
              >
                <ShieldAlert className="h-5 w-5 text-teal-600" />
                <span>{t("nav.admin")}</span>
              </Link>
            )}
          </nav>

          {/* Quick Categories List */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              {t("nav.categories")}
            </h4>
            <div className="space-y-1">
              {mockCategories.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  onClick={() => setMobileNavOpen(false)}
                  className="flex min-h-10 items-center px-3 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-teal-600"
                >
                  {cat.name[locale]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer in Drawer */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <PhoneCall className="h-4 w-4 text-teal-600" />
            <span>19876 (طوارئ واستشارات)</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <Link href="/about" onClick={() => setMobileNavOpen(false)}>
              عن الشركة
            </Link>
            <span>•</span>
            <Link href="/contact" onClick={() => setMobileNavOpen(false)}>
              اتصل بنا
            </Link>
            <span>•</span>
            <Link href="/faq" onClick={() => setMobileNavOpen(false)}>
              الأسئلة الشائعة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
