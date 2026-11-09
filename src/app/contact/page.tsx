"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/provider";
import { useUIStore } from "@/stores/use-ui-store";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const { t } = useTranslation();
  const { addToast } = useUIStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        title: "تم استلام رسالتك بنجاح",
        description: "سيتواصل معك أحد المستشارين الطبيين أو فريق المبيعات خلال ساعات عمل اليوم.",
        type: "success",
      });
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 space-y-8 sm:space-y-12 max-w-5xl">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          تواصل مع فريق الدعم الطبي والمبيعات
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          فريق الاستشارات الصيدلانية وخدمة العملاء المؤسسية متواجد لمساعدتك في توريدات المستشفيات والطلبات الفردية على مدار الساعة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 min-w-0 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              قنوات الاتصال المباشرة
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    الخط الساخن للأفراد والطوارئ
                  </span>
                  <span className="text-teal-700 dark:text-teal-400 font-bold text-sm">
                    19876 (على مدار الساعة)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    مبيعات المستشفيات والمناقصات
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    tenders@cureline-medical.com
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    المستودع الرئيسي والإدارة
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    برج الأطباء الطبي - شارع مصطفى النحاس، مدينة نصر، القاهرة
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    مواعيد صرف المستودع
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    السبت إلى الخميس: 8:00 صباحاً - 10:00 مساءً
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            أرسل استفسارك الطبي أو طلبك التجاري
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1">الاسم الكامل *</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="د. سامح كمال"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">رقم الهاتف *</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 123 4567"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1">البريد الإلكتروني *</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">موضوع الرسالة</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="استفسار عن جهاز / طلب توريد"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">نص الرسالة والاستفسار *</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="تفاصيل المنتجات المطلوبة أو مواصفات الشحنة..."
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              variant="medical"
              size="lg"
              disabled={isSubmitting}
              className="w-full text-xs sm:text-sm font-bold shadow-md shadow-teal-600/20"
            >
              {isSubmitting ? "جارِ إرسال الرسالة..." : "إرسال الرسالة"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
