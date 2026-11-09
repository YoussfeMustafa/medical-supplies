"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 max-w-md">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md shadow-teal-500/20">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            استعادة كلمة المرور
          </h1>
          <p className="text-xs text-slate-400">
            أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 dark:bg-emerald-950/30 p-5 text-center space-y-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              تم إرسال الرابط بنجاح
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              إذا كان البريد ({email}) مسجلاً لدينا، ستتلقى رابطاً آمناً لإعادة تعيين كلمة المرور خلال دقائق.
            </p>
            <Link href="/auth/login" className="inline-block pt-2">
              <Button variant="outline" size="sm" className="text-xs">
                العودة لتسجيل الدخول
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                البريد الإلكتروني المسجل
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@hospital.org"
                icon={<Mail className="h-4 w-4" />}
                required
              />
            </div>

            <Button
              type="submit"
              variant="medical"
              size="lg"
              className="w-full text-xs sm:text-sm font-bold shadow-md shadow-teal-600/20"
            >
              إرسال رابط الاستعادة
            </Button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 font-bold text-teal-700 dark:text-teal-400 hover:underline"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            <span>العودة لصفحة تسجيل الدخول</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
