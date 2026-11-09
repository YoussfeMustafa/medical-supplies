"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/provider";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  FileCheck,
  CalendarClock,
  Users,
  Tag,
  MessageSquare,
  ArrowRight,
  Activity,
  Layers,
} from "lucide-react";

export function AdminSidebar() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin",
      label: t("admin.dashboard"),
      icon: <LayoutDashboard className="h-4 w-4" />,
      exact: true,
    },
    {
      href: "/admin/products",
      label: t("admin.products"),
      icon: <Package className="h-4 w-4" />,
    },
    {
      href: "/admin/orders",
      label: t("admin.orders"),
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      href: "/admin/prescriptions",
      label: t("admin.prescriptions"),
      icon: <FileCheck className="h-4 w-4" />,
    },
    {
      href: "/admin/inventory",
      label: t("admin.inventory"),
      icon: <CalendarClock className="h-4 w-4" />,
    },
    {
      href: "/admin/customers",
      label: t("admin.customers"),
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/admin/coupons",
      label: t("admin.coupons"),
      icon: <Tag className="h-4 w-4" />,
    },
    {
      href: "/admin/reviews",
      label: t("admin.reviews"),
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  return (
    <aside className="w-full lg:w-64 lg:shrink-0 border-b lg:border-b-0 lg:border-e border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 lg:flex lg:flex-col lg:justify-between p-2 lg:p-4 lg:min-h-screen">
      <div className="space-y-6">
        {/* Brand */}
        <Link href="/" className="hidden lg:flex items-center gap-2.5 px-2 py-1">
          <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white block">
              لوحة الإدارة الطبية
            </span>
            <span className="text-[10px] text-teal-600 font-semibold block">
              CureLine Operations
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-11 shrink-0 items-center gap-2 lg:gap-3 px-3 lg:px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all lg:w-full ${
                  isActive
                    ? "bg-teal-600 text-white shadow-sm shadow-teal-600/30 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Store */}
      <div className="hidden lg:block pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span>العودة لمتجر المرضى</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
