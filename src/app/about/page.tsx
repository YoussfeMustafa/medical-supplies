"use client";

import React from "react";
import { useTranslation } from "@/i18n/provider";
import {
  ShieldCheck,
  Award,
  Truck,
  HeartPulse,
  Building2,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const { t, locale } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-10 sm:space-y-16 max-w-5xl">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200">
          <Award className="h-3.5 w-3.5" />
          <span>تأسست عام 2018 | ترخيص وزارة الصحة EGY-MOH-8891</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          نبني منظومة الرعاية الصحية بسلاسل إمداد طبية موثوقة
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          تعتبر شركة كيورلاين (CureLine Medical) الشريك الاستراتيجي الأول للمستشفيات، المراكز الجراحية التخصصية، ومعامل التحاليل الطبية في توريد الأجهزة الدقيقة والمستهلكات المعقمة.
        </p>
      </div>

      {/* Accreditations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
          <div className="h-12 w-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            شهادة ISO 13485:2016
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            المعيار الدولي الأرفع في نظم إدارة جودة الأجهزة والمستلزمات الطبية، والذي يضمن سلامة دورة حياة المنتج من التخزين وحتى التسليم السريري.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
          <div className="h-12 w-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center">
            <Truck className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            سلسلة التبريد المعتمدة (Cold Chain)
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            مستودعات مركزية وشاحنات مجهزة بحساسات رقمية ترصد درجة الحرارة (2-8°C) على مدار الساعة لضمان عدم تلف الكواشف المعملية ومستهلكات التحاليل.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-sm">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
            <HeartPulse className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            إشراف صيدلاني وطبي متكامل
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            طاقم متكامل من الصيادلة والاستشاريين لفحص تواريخ الصلاحية، شهادات التعقيم، ومراجعة الوصفات الطبية للمستلزمات المقيدة قبل اعتماد الصرف.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="rounded-3xl border border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/20 p-5 sm:p-12 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          رؤيتنا ورسالتنا للقطاع الطبي
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-base text-teal-800 dark:text-teal-300">
              رسالتنا
            </h4>
            <p>
              تمكين الكوادر الطبية والمستشفيات من الحصول على أعلى المنتجات الطبية جودة بأسرع وقت وأقل تكلفة، وسد الفجوة في سلاسل الإمداد الطبية الحرجة لضمان عدم توقف العمليات الجراحية أو أسرة الرعاية المركزة.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-base text-teal-800 dark:text-teal-300">
              رؤيتنا
            </h4>
            <p>
              أن نكون المنصة الرقمية والتوزيعية الأكثر موثوقية في الشرق الأوسط وشمال أفريقيا للتجهيزات الطبية، من خلال دمج التكنولوجيا اللوجستية الحديثة بالمعايير الرقابية الصارمة للصحة العامة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
