"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/use-auth-store";
import { useTranslation } from "@/i18n/provider";
import {
  User,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  Package,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AccountOverviewPage() {
  const { user } = useAuthStore();
  const { locale } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              الملف الشخصي والبيانات الطبية
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              إدارة بيانات الحساب واعتمادات المنشأة الطبية المسجلة.
            </p>
          </div>

          <Badge variant="success" className="text-xs font-semibold gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>حساب نشط ومفعل</span>
          </Badge>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="min-w-0 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">الاسم الكامل</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {user?.name}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">البريد الإلكتروني</span>
            <p className="break-all text-sm font-bold text-slate-900 dark:text-white">
              {user?.email}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">رقم الهاتف</span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {user?.phone || "+20 100 123 4567"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">نوع الحساب</span>
            <p className="text-sm font-bold text-teal-700 dark:text-teal-400 capitalize">
              {user?.role === "wholesale"
                ? "عيادة / مستشفى معتمد (Wholesale B2B)"
                : user?.role === "admin"
                ? "مدير نظام"
                : "حساب أفراد تجزئة"}
            </p>
          </div>
        </div>

        {/* B2B Wholesale Info Card if applicable */}
        {user?.role === "wholesale" && (
          <div className="rounded-xl border border-teal-200 bg-teal-50/50 dark:bg-teal-950/30 p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-teal-800 dark:text-teal-300">
              <Building2 className="h-4 w-4" />
              <span>بيانات المنشأة الطبية المعتمدة</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
              <div>المنشأة: {user.organizationName}</div>
              <div>الرقم الضريبي: {user.taxRegistrationNumber}</div>
              <div>ترخيص وزارة الصحة: {user.medicalLicenseNumber}</div>
              <div className="text-emerald-700 font-bold">
                حالة الاعتماد: موثق ومعتمد لأسعار الجملة الرسمية
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Orders Box */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            الوصول السريع للطلبات الأخيرة
          </h3>
          <Link
            href="/account/orders"
            className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
          >
            عرض سجل كافة الطلبات والفواتير
          </Link>
        </div>
        <p className="text-xs text-slate-500">
          يمكنك تتبع الشحنات المبردة، إعادة طلب نفس المستلزمات بنقرة واحدة، وتحميل الفواتير الضريبية.
        </p>
      </div>
    </div>
  );
}
