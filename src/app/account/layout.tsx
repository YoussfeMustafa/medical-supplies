"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/provider";
import { useAuthStore } from "@/stores/use-auth-store";
import {
  User,
  Package,
  Heart,
  MapPin,
  FileText,
  Building2,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const links = [
    {
      href: "/account",
      label: "الملف التعريفي",
      icon: <User className="h-4 w-4" />,
      exact: true,
    },
    {
      href: "/account/orders",
      label: "سجل الطلبات والفواتير",
      icon: <Package className="h-4 w-4" />,
    },
    {
      href: "/account/addresses",
      label: "عناوين التوصيل والعيادات",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      href: "/account/wishlist",
      label: "قائمة المستلزمات المفضلة",
      icon: <Heart className="h-4 w-4" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-5 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-6">
          {/* User Card */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="h-12 w-12 rounded-xl bg-teal-600 text-white flex items-center justify-center text-lg font-bold uppercase shadow-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {user?.name || "Customer"}
              </h3>
              <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold block capitalize">
                {user?.role === "wholesale"
                  ? "حساب عيادة / مستشفى"
                  : user?.role === "admin"
                  ? "مدير نظام"
                  : "حساب شخصي"}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="grid grid-cols-2 gap-1 sm:grid-cols-1 sm:space-y-1">
            {links.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex min-h-11 items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold border border-teal-200/80 dark:border-teal-800"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <button
              onClick={logout}
              className="col-span-2 sm:col-span-1 w-full min-h-11 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-start mt-1 sm:mt-3"
            >
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
