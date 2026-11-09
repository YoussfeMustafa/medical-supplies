"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";
import { productService } from "@/services/product-service";
import { Product, Category, Brand } from "@/types/product.types";
import { ProductCard } from "@/components/product/product-card";
import {
  ShieldCheck,
  Truck,
  Activity,
  FileSpreadsheet,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Building2,
  Stethoscope,
  Scissors,
  Accessibility,
  HeartPulse,
  Wind,
  Cross,
  Bed,
  Sparkles,
  Smile,
  HeartHandshake,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const { t, locale } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Category Icon mapper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert":
        return <ShieldCheck className="h-6 w-6 text-teal-600" />;
      case "Stethoscope":
        return <Stethoscope className="h-6 w-6 text-teal-600" />;
      case "Scissors":
        return <Scissors className="h-6 w-6 text-teal-600" />;
      case "Accessibility":
        return <Accessibility className="h-6 w-6 text-teal-600" />;
      case "Activity":
        return <HeartPulse className="h-6 w-6 text-teal-600" />;
      case "Wind":
        return <Wind className="h-6 w-6 text-teal-600" />;
      case "Cross":
        return <Cross className="h-6 w-6 text-teal-600" />;
      case "Bed":
        return <Bed className="h-6 w-6 text-teal-600" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-teal-600" />;
      case "Smile":
        return <Smile className="h-6 w-6 text-teal-600" />;
      case "HeartHandshake":
        return <HeartHandshake className="h-6 w-6 text-teal-600" />;
      case "FlaskConical":
      default:
        return <FlaskConical className="h-6 w-6 text-teal-600" />;
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [feat, cats, brs] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getCategories(),
          productService.getBrands(),
        ]);
        setFeaturedProducts(feat);
        setCategories(cats);
        setBrands(brs);
      } catch (err) {
        console.error("Home data loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-950 to-slate-950 text-white py-16 sm:py-24">
        {/* Subtle background glow */}
        <div className="absolute top-0 start-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 end-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Start Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                <span>{t("hero.badge")}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                {t("hero.title")}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {t("hero.subtitle")}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 active:scale-95"
                  >
                    <span>{t("hero.exploreCatalog")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/rfq">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 hover:border-slate-400 text-white hover:bg-white/10 text-sm font-semibold"
                  >
                    <FileSpreadsheet className="h-4 w-4 text-teal-400" />
                    <span>{t("hero.requestQuote")}</span>
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
                <div>
                  <span className="block text-xl font-extrabold text-teal-400">
                    +10,000
                  </span>
                  <span className="text-slate-400">عيادة ومستشفى معتمد</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-teal-400">
                    100%
                  </span>
                  <span className="text-slate-400">مطابقة CE و ISO</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-teal-400">
                    24h
                  </span>
                  <span className="text-slate-400">توصيل إسعافي مبرد</span>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-teal-400">
                    +60
                  </span>
                  <span className="text-slate-400">صنف طبي مسجل</span>
                </div>
              </div>
            </div>

            {/* Right/End Column: Interactive Hero Feature Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-teal-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        بوابة التوريد الفوري للمستشفيات
                      </h4>
                      <p className="text-[11px] text-teal-400">
                        متاح الآن طلبات التجهيز السريع
                      </p>
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px]">
                    متاح بالمستودع
                  </Badge>
                </div>

                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-slate-800/60 p-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-teal-400" />
                      <span className="text-slate-200">التعقيم الجراحي المزدوج</span>
                    </div>
                    <span className="text-emerald-400 font-bold">معتمد</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-800/60 p-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Truck className="h-4 w-4 text-cyan-400" />
                      <span className="text-slate-200">سلسلة التبريد المراقبة</span>
                    </div>
                    <span className="text-cyan-400 font-bold">2°C - 8°C</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-800/60 p-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="h-4 w-4 text-amber-400" />
                      <span className="text-slate-200">فواتير ضريبية للمؤسسات</span>
                    </div>
                    <span className="text-amber-400 font-bold">14% VAT</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/products?inStockOnly=true" className="block">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-xs font-semibold h-11"
                    >
                      تصفح المخزون الفوري الجاهز للشحن
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Medical Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("home.categoriesTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t("home.categoriesSubtitle")}
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
          >
            <span>{t("home.viewAll")}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group flex flex-col items-center justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center transition-all duration-300 hover:shadow-lg hover:border-teal-500 hover:-translate-y-1"
            >
              <div className="relative h-14 w-14 rounded-2xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center transition-transform group-hover:scale-110 mb-3 shadow-sm">
                {getCategoryIcon(category.iconName)}
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors line-clamp-2">
                  {category.name[locale]}
                </h3>
                <span className="mt-1 block text-[11px] text-slate-400">
                  {category.productCount} منتج
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured & Top Demanded Products */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>أصناف طبية معتمدة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("home.featuredTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t("home.featuredSubtitle")}
            </p>
          </div>

          <Link
            href="/products?sortBy=featured"
            className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
          >
            <span>عرض كافة الأصناف ({featuredProducts.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Special Deals / Institutional Bundles Banner */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-700 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-xl space-y-4 text-start">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold backdrop-blur-md">
              <Flame className="h-4 w-4 text-amber-300" />
              <span>عروض خاصة للمنشآت والعيادات</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {t("home.dealsTitle")}
            </h3>

            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              {t("home.dealsSubtitle")}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link href="/products?onSale=true">
                <Button
                  size="lg"
                  className="bg-white text-teal-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md"
                >
                  <span>تصفح العروض المخفضة</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/rfq">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10 text-xs sm:text-sm"
                >
                  طلب كوتة مستشفيات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brand Partners Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("home.brandsTitle")}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            وكلاء معتمدون لكبرى مصانع الأجهزة والمستهلكات الطبية العالمية
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-center transition-all hover:border-teal-500 hover:shadow-md group"
            >
              <span className="font-extrabold text-sm text-slate-800 dark:text-slate-200 group-hover:text-teal-600 transition-colors">
                {brand.name}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {brand.country} • {brand.productCount} منتج
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Medical Safety & Cold Chain Notice */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border border-teal-200 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/20 p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                أرقام تشغيلات وتواريخ صلاحية مؤكدة
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                كل شحنة تخرج من مستودعاتنا تتضمن باركود ورقم Lot موثق في الفاتورة الضريبية الرسمية لسهولة التتبع الطبي.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-sm">
                <Truck className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                شاحنات نقل مبردة (Cold Chain)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                أسطول سيارات إسعافية مجهز بثلاجات مراقبة إلكترونياً (2-8°C) لنقل الكواشف المعملية ومستهلكات التحاليل بأمان تام.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                فحص الوصفات الطبية المقيدة
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                يراجع رئيس الصيادلة كافة الوصفات المرفوعة للأصناف المقيدة قبل الصرف لضمان الالتزام بقوانين وزارة الصحة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
