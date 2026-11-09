"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";
import { useCartStore } from "@/stores/use-cart-store";
import { useWishlistStore } from "@/stores/use-wishlist-store";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import {
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  Activity,
  FileUp,
  FileSpreadsheet,
  ShieldAlert,
  Menu,
  ChevronDown,
  Building,
  LogOut,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { t, locale } = useTranslation();
  const { items, setDrawerOpen, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { setSearchModalOpen, setMobileNavOpen } = useUIStore();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const cartCount = getItemCount();
  const wishlistCount = wishlistItems.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between gap-1 sm:gap-4 px-2 sm:px-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="xl:hidden min-h-11 min-w-11 shrink-0 p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex min-w-0 shrink items-center gap-1.5 sm:gap-2.5 group">
          <div className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform">
            <Activity className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse-subtle" />
          </div>
          <div className="min-w-0">
            <span className="block truncate font-bold text-sm sm:text-xl tracking-tight text-slate-900 dark:text-white leading-tight">
              {locale === "ar" ? "كيورلاين الطبية" : "CureLine Medical"}
            </span>
            <span className="hidden sm:block text-xs font-medium text-teal-600 dark:text-teal-400">
              {locale === "ar"
                ? "مستلزمات وأجهزة طبية معتمدة"
                : "Certified Medical Supplies & Equipment"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
          <Link
            href="/products"
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            {t("nav.catalog")}
          </Link>

          <Link
            href="/rfq"
            className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <FileSpreadsheet className="h-4 w-4 text-teal-600" />
            <span>{t("nav.rfq")}</span>
          </Link>

          <Link
            href="/prescriptions/upload"
            className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <FileUp className="h-4 w-4 text-rose-500" />
            <span>{t("nav.prescriptions")}</span>
          </Link>

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 font-semibold text-teal-700 dark:text-teal-300 hover:text-teal-900 bg-teal-50 dark:bg-teal-950/60 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800 transition-all"
            >
              <ShieldAlert className="h-4 w-4 text-teal-600" />
              <span>{t("nav.admin")}</span>
            </Link>
          )}
        </nav>

        {/* Search Bar Trigger Button */}
        <div className="hidden 2xl:flex flex-1 max-w-xs lg:max-w-sm">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2.5 text-xs text-slate-500 hover:border-teal-500 transition-all text-start group shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
              <span className="truncate">{t("nav.searchPlaceholder")}</span>
            </span>
            <kbd className="hidden xl:inline-block rounded bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-300">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Action Icons: Search mobile, Wishlist, Cart Drawer, User */}
        <div className="flex shrink-0 items-center gap-0 sm:gap-2 lg:gap-3">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="2xl:hidden min-h-11 min-w-10 p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Search medical catalog"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Wishlist */}
          <Link
            href="/account/wishlist"
            className="relative hidden sm:inline-flex min-h-11 min-w-11 items-center justify-center p-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 end-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex min-h-11 min-w-10 items-center justify-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-teal-50 hover:bg-teal-100/80 dark:bg-teal-950/50 dark:hover:bg-teal-900/50 text-teal-800 dark:text-teal-200 transition-all border border-teal-200/60 dark:border-teal-800 shadow-sm active:scale-95"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-teal-700 dark:text-teal-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -end-2 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden 2xl:inline text-xs font-semibold">
              {t("nav.cart")}
            </span>
          </button>

          {/* User Account / Auth Dropdown */}
          <div className="relative">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex min-h-11 min-w-10 items-center justify-center gap-2 p-1.5 sm:pe-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-start"
                >
                  <div className="h-8 w-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden 2xl:block text-xs leading-tight">
                    <span className="block font-semibold text-slate-800 dark:text-slate-100 max-w-[120px] truncate">
                      {user.name}
                    </span>
                    <span className="block text-[10px] text-teal-600 dark:text-teal-400 capitalize">
                      {user.role === "wholesale"
                        ? "عيادة / مستشفى"
                        : user.role === "admin"
                        ? "مدير نظام"
                        : "حساب شخصي"}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden 2xl:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute end-0 mt-2 w-56 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl z-50 animate-in fade-in-0 zoom-in-95"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/account"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <UserIcon className="h-4 w-4 text-teal-600" />
                      <span>{t("nav.account")}</span>
                    </Link>

                    <Link
                      href="/account/orders"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Package className="h-4 w-4 text-teal-600" />
                      <span>{t("nav.orders")}</span>
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/50 transition-colors"
                      >
                        <ShieldAlert className="h-4 w-4 text-teal-600" />
                        <span>{t("nav.admin")}</span>
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-start mt-1 border-t border-slate-100 dark:border-slate-800"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("nav.logout")}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" variant="medical" className="min-h-11 px-2 sm:px-3.5 text-xs">
                  <UserIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t("nav.login")}</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
