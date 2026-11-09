"use client";

import React from "react";
import { AdminSidebar } from "@/features/admin/admin-sidebar";
import { useAuthStore } from "@/stores/use-auth-store";
import { useTranslation } from "@/i18n/provider";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, switchDemoRole } = useAuthStore();
  const { t } = useTranslation();

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {!isAdmin && (
          <div className="bg-amber-500 text-slate-950 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-semibold shadow-md">
            <div className="flex items-start sm:items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span>
                تنبيه أمني: أنت تتصفح لوحة التحكم بحساب غير إداري ({user?.role || "زائر"}). بعض العمليات تتطلب صلاحيات المشرف.
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="min-h-11 self-start sm:self-auto bg-white text-slate-900 border-none hover:bg-slate-100 text-xs py-1 font-bold shadow-sm"
              onClick={() => switchDemoRole("admin")}
            >
              <ShieldCheck className="h-3.5 w-3.5 me-1 text-teal-600" />
              التبديل إلى حساب المشرف (Admin)
            </Button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
