export const SITE_NAME = {
  ar: "كيورلاين للمستلزمات الطبية",
  en: "CureLine Medical Supplies",
};

export const SITE_TAGLINE = {
  ar: "بوابتك الموثوقة للمستلزمات والأجهزة الطبية المعتمدة للمؤسسات والأفراد",
  en: "Your trusted gateway for certified medical supplies and hospital equipment",
};

export const SUPPORTED_LOCALES = ["ar", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ar";

export const VAT_RATE = 0.14; // 14% VAT

export const SHIPPING_OPTIONS = {
  standard: {
    id: "standard",
    cost: 50,
    freeThreshold: 1000,
    estimatedDays: {
      ar: "خلال 2-4 أيام عمل",
      en: "2-4 business days",
    },
    name: {
      ar: "شحن قياسي سريع",
      en: "Standard Delivery",
    },
    description: {
      ar: "توصيل للمستشفيات والعيادات والمنازل",
      en: "Delivery for clinics, hospitals, and residences",
    },
  },
  express: {
    id: "express",
    cost: 120,
    freeThreshold: 3000,
    estimatedDays: {
      ar: "خلال 24 ساعة (نفس اليوم في القاهرة والجيزة)",
      en: "Within 24 hours (Same-day in Cairo & Giza)",
    },
    name: {
      ar: "شحن إسعافي فوري (Express)",
      en: "Express Medical Courier",
    },
    description: {
      ar: "توصيل للحالات الطارئة والعمليات العاجلة",
      en: "Emergency delivery for urgent cases and surgeries",
    },
  },
  cold_chain: {
    id: "cold_chain",
    cost: 250,
    freeThreshold: 5000,
    estimatedDays: {
      ar: "خلال 24-48 ساعة في ثلاجات مراقبة حرارياً (2-8°C)",
      en: "24-48 hours in temp-monitored refrigerated vehicles (2-8°C)",
    },
    name: {
      ar: "شحن سلسلة التبريد المعتمدة (Cold Chain)",
      en: "Certified Cold Chain Logistics",
    },
    description: {
      ar: "خاص بالمحاليل الحساسة، مستلزمات المعامل، واللقاحات",
      en: "For temperature-sensitive reagents, lab supplies, and biologics",
    },
  },
};

export const DEMO_ACCOUNTS = [
  {
    role: "admin" as const,
    name: "Dr. Tarek Mansour (Head Pharmacist)",
    email: "admin@cureline.com",
    password: "admin123",
    badge: "System Administrator",
  },
  {
    role: "wholesale" as const,
    name: "Al Noor Specialized Hospital & Clinics",
    email: "wholesale@alnoorclinic.com",
    password: "wholesale123",
    badge: "Verified Hospital Account",
  },
  {
    role: "customer" as const,
    name: "Sarah Ahmed",
    email: "customer@example.com",
    password: "customer123",
    badge: "Retail Patient",
  },
];

export const VALID_COUPONS: Record<
  string,
  {
    discountPercent?: number;
    discountAmount?: number;
    freeShipping?: boolean;
    minSpend: number;
    forWholesaleOnly?: boolean;
    name: { en: string; ar: string };
  }
> = {
  CURE10: {
    discountPercent: 10,
    minSpend: 200,
    name: {
      en: "10% Welcome Medical Discount",
      ar: "خصم الترحيب الطبي 10%",
    },
  },
  BULK20: {
    discountPercent: 20,
    minSpend: 5000,
    forWholesaleOnly: true,
    name: {
      en: "20% Clinic Wholesale Super Discount",
      ar: "خصم العيادات والمستشفيات المميز 20%",
    },
  },
  FREESHIP: {
    freeShipping: true,
    minSpend: 500,
    name: {
      en: "Free Medical Courier Shipping",
      ar: "شحن مجاني لكافة المستلزمات",
    },
  },
};
