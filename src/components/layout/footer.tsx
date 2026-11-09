"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";
import { useUIStore } from "@/stores/use-ui-store";
import {
  Activity,
  ShieldCheck,
  Truck,
  FileCheck2,
  Clock,
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const { t, locale } = useTranslation();
  const { addToast } = useUIStore();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast({
      title: locale === "ar" ? "شكراً لاشتراكك في النشرة الطبية" : "Thank you for subscribing",
      description:
        locale === "ar"
          ? "ستصلك أحدث التقارير حول توفر المخزون وشهادات الأجهزة الطبية."
          : "You will receive regular healthcare product reports and clearances.",
      type: "success",
    });
    setNewsletterEmail("");
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-300">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800 py-8 bg-slate-950/60">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {t("hero.certifiedQuality")}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                ISO 13485 & CE Mark
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {t("hero.coldChainDelivery")}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                شاحنات مبردة 2-8°C
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <FileCheck2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {t("hero.genuineWarranty")}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                أرقام تشغيلات وتواريخ معتمدة
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {t("hero.support247")}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                صيادلة متخصصون على مدار الساعة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {locale === "ar" ? "كيورلاين للمستلزمات الطبية" : "CureLine Medical"}
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              المنصة المتكاملة الرائدة في توريد الأجهزة الطبية والمستهلكات المعقمة للمستشفيات، المراكز الجراحية، معامل التحاليل، والعيادات التخصصية بأعلى معايير الأمان الدولي.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex min-w-0 items-start gap-2">
                <MapPin className="h-4 w-4 text-teal-400" />
                <span className="min-w-0 break-words">برج الأطباء الطبي - شارع مصطفى النحاس، مدينة نصر، القاهرة</span>
              </div>
              <div className="flex min-w-0 items-center gap-2">
                <PhoneCall className="h-4 w-4 text-teal-400" />
                <span className="min-w-0 break-words">الخط الساخن: 19876 | +20 2 2456 7890</span>
              </div>
              <div className="flex min-w-0 items-center gap-2">
                <Mail className="h-4 w-4 text-teal-400" />
                <span className="min-w-0 break-all">orders@cureline-medical.com</span>
              </div>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {t("home.categoriesTitle")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/products?category=personal-protective-equipment" className="hover:text-teal-400">
                  مهمات الوقاية (PPE)
                </Link>
              </li>
              <li>
                <Link href="/products?category=diagnostic-equipment" className="hover:text-teal-400">
                  أجهزة التشخيص والضغط
                </Link>
              </li>
              <li>
                <Link href="/products?category=surgical-consumables" className="hover:text-teal-400">
                  المستهلكات الجراحية والكانيولات
                </Link>
              </li>
              <li>
                <Link href="/products?category=respiratory-care" className="hover:text-teal-400">
                  أجهزة الأكسجين والتنفس
                </Link>
              </li>
              <li>
                <Link href="/products?category=hospital-furniture" className="hover:text-teal-400">
                  أسرة وأثاث المستشفيات
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              الخدمات المؤسسية
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/rfq" className="hover:text-teal-400 font-semibold text-teal-400">
                  طلب تسعير مستشفيات (RFQ)
                </Link>
              </li>
              <li>
                <Link href="/prescriptions/upload" className="hover:text-teal-400">
                  رفع وصفة طبية للأصناف المقيدة
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-teal-400">
                  سياسة الشحن بسلسلة التبريد
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400">
                  شهادات الاعتماد والجودة
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-teal-400">
                  الأسئلة الشائعة للعيادات
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              النشرة الطبية الدورية
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              اشترك لتلقي تحديثات توفر المخزون الطبي والعروض المخصصة للأطقم الطبية.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <Input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="بريدك الإلكتروني..."
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 text-xs h-10"
                required
              />
              <Button type="submit" variant="medical" size="sm" className="w-full text-xs">
                {t("home.newsletterButton")}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="break-words">
            © {new Date().getFullYear()} CureLine Medical Supplies S.A.E. جميع الحقوق محفوظة. ترخيص وزارة الصحة رقم EGY-MOH-8891.
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Link href="/privacy" className="hover:text-slate-300">
              الخصوصية الطبية
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300">
              شروط البيع والتوريد
            </Link>
            <span>•</span>
            <span className="text-teal-400 font-medium">دفع آمن: فيزا | ميزة | ماستركارد | تحويل بنكي</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
