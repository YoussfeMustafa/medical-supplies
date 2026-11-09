"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "ما هي المستلزمات الطبية التي تستلزم رفع وصفة طبية (روشتة)؟",
      a: "المستلزمات المقيدة قانوناً من وزارة الصحة تشمل: إبر أقلام الإنسولين، الكانيولات الجراحية الدقيقة، مشارط العمليات الحادة، وبعض محاليل المعامل المتخصصة. يتم فحص الوصفة المرفوعة من قبل رئيس الصيادلة لدينا واعتمادها خلال أقل من ساعتين.",
    },
    {
      q: "كيف تضمنون جودة وسلامة شحن المستلزمات الحساسة للحرارة؟",
      a: "نمتلك أسطول شاحنات مجهزة بنظام تبريد سلسلة التوريد (Cold Chain) مع أجهزة تسجيل حراري إلكترونية تسجل درجات الحرارة بين 2°C إلى 8°C طوال مسار الشحنة حتى تسليمها لصيدلية المستشفى أو العيادة.",
    },
    {
      q: "كيف تحصل عيادتي أو المستشفى على أسعار الجملة المعتمدة؟",
      a: "بمجرد إنشاء حساب منشأة طبية وإرفاق رقم السجل التجاري والبطاقة الضريبية أو ترخيص العيادة، يتم تفعيل كوتة الجملة تلقائياً لتظهر لك أسعار الجملة المخفضة وجداول الخصم التصاعدي على كافة الأصناف.",
    },
    {
      q: "هل تصدرون فواتير إلكترونية ضريبية معتمدة؟",
      a: "نعم، كافة فواتيرنا تصدر متضمنة الرقم الضريبي، كود الصنف الدولي، رقم التشغيلة (Lot Number)، وتاريخ الصلاحية، ومتوافقة تماماً مع منظومة الفاتورة الإلكترونية لمصلحة الضرائب المصرية.",
    },
    {
      q: "ما هي سياسة إرجاع المستلزمات والأجهزة الطبية؟",
      a: "حرصاً على سلامة المرضى والتعقيم، يقبل إرجاع الأجهزة الطبية غير المستخدمة في عبوتها الأصلية خلال 14 يوماً من الاستلام. أما المستهلكات المعقمة فيشترط عدم فتح غلاف الحماية أو كسر الختم المعقم.",
    },
    {
      q: "كم يستغرق التوصيل العاجل في حالات الطوارئ؟",
      a: "توفر خدمة (Express Medical Courier) توصيل الحالات الطارئة ومستهلكات العمليات العاجلة في نطاق القاهرة والجيزة خلال أقل من 24 ساعة، مع إمكانية التوصيل الفوري لنفس اليوم للمستشفيات المسجلة.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-10 max-w-3xl">
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center mx-auto">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          الأسئلة الشائعة حول التوريد الطبي
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          إجابات شاملة حول متطلبات الوصفات الطبية، سلسلة التبريد، وأسعار الجملة للمستشفيات.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full min-h-14 flex items-center justify-between gap-3 p-4 sm:p-5 text-start font-bold text-sm text-slate-900 dark:text-white hover:text-teal-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-teal-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
