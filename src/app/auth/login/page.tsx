"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { useTranslation } from "@/i18n/provider";
import { useUIStore } from "@/stores/use-ui-store";
import { DEMO_ACCOUNTS } from "@/lib/constants";
import {
  Activity,
  Lock,
  Mail,
  ShieldCheck,
  Building2,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login, switchRole } = useAuthStore();
  const { addToast } = useUIStore();

  const [email, setEmail] = useState("admin@cureline.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        addToast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحباً بك مجدداً في منصة كيورلاين الطبية.`,
          type: "success",
        });
        if (email.includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/account");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = (role: "admin" | "wholesale" | "customer") => {
    switchRole(role);
    addToast({
      title: "تم التبديل للحساب التجريبي",
      description: `الدور الحالي: ${role}`,
      type: "info",
    });
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 max-w-md">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-8 shadow-xl space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md shadow-teal-500/20">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            تسجيل الدخول لبوابة كيورلاين
          </h1>
          <p className="text-xs text-slate-400">
            منظومة التوريدات والأجهزة الطبية المعتمدة
          </p>
        </div>

        {/* 1-Click Demo Login Box (For Evaluators) */}
        <div className="rounded-2xl border border-teal-200 bg-teal-50/60 dark:bg-teal-950/30 p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 dark:text-teal-300">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>تجربة المنظومة بنقرة واحدة (أدوار تجريبية):</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("admin")}
              className="flex min-h-20 flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 hover:border-teal-500 hover:shadow-sm transition-all text-center"
            >
              <Lock className="h-4 w-4 text-teal-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">
                أدمن
              </span>
              <span className="text-[9px] text-slate-400">رئيس صيادلة</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin("wholesale")}
              className="flex min-h-20 flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 hover:border-teal-500 hover:shadow-sm transition-all text-center"
            >
              <Building2 className="h-4 w-4 text-teal-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">
                مستشفى
              </span>
              <span className="text-[9px] text-slate-400">سعر جملة</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin("customer")}
              className="flex min-h-20 flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 hover:border-teal-500 hover:shadow-sm transition-all text-center"
            >
              <User className="h-4 w-4 text-teal-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">
                مريض
              </span>
              <span className="text-[9px] text-slate-400">فرد عادي</span>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
              البريد الإلكتروني
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              icon={<Mail className="h-4 w-4" />}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                كلمة المرور
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-[11px] font-medium text-teal-600 hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>

          <Button
            type="submit"
            variant="medical"
            size="lg"
            disabled={isLoading}
            className="w-full text-xs sm:text-sm font-bold shadow-md shadow-teal-600/20"
          >
            {isLoading ? "جارِ تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>
        </form>

        {/* Bottom register link */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <span>ليس لديك حساب بعد؟</span>{" "}
          <Link
            href="/auth/register"
            className="font-bold text-teal-700 dark:text-teal-400 hover:underline"
          >
            إنشاء حساب أفراد أو منشأة طبية
          </Link>
        </div>
      </div>
    </div>
  );
}
