import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/i18n/provider";
import { ToastContainer } from "@/components/ui/toast";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/search/search-modal";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TopBanner } from "@/components/layout/top-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "كيورلاين للمستلزمات الطبية | CureLine Medical Supplies",
  description:
    "بوابتك الموثوقة للمستلزمات والأجهزة الطبية المعتمدة للمستشفيات والعيادات والأفراد في مصر والشرق الأوسط مع النقل المبرد المعتمد.",
  keywords: [
    "مستلزمات طبية",
    "أجهزة طبية",
    "سماعات ليتمان",
    "أجهزة ضغط أومرون",
    "قفازات نيتريل",
    "توريد مستشفيات",
    "Medical Supplies",
    "Hospital Equipment",
  ],
  authors: [{ name: "CureLine Healthcare Systems" }],
  openGraph: {
    title: "كيورلاين للمستلزمات والأجهزة الطبية المعتمدة",
    description:
      "المورد الطبي رقم #1 للأجهزة والمستهلكات المعقمة للمستشفيات والأفراد.",
    url: "https://cureline-medical.com",
    siteName: "CureLine Medical",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans bg-slate-50/50 dark:bg-slate-950`}>
        <TranslationProvider initialLocale="ar">
          <TopBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <SearchModal />
          <MobileNav />
          <ToastContainer />
        </TranslationProvider>
      </body>
    </html>
  );
}
