import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "@/types/product.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  locale: "ar" | "en" = "ar",
  currency: string = "EGP"
): string {
  const formattedNumber = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (locale === "ar") {
    return `${formattedNumber} ج.م`;
  }
  return `${currency} ${formattedNumber}`;
}

export function formatDate(
  dateString: string | Date,
  locale: "ar" | "en" = "ar"
): string {
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function calculateEffectivePrice(
  product: Product,
  quantity: number,
  isWholesaleUser: boolean = false
): { unitPrice: number; discountPercent: number; isBulkTierApplied: boolean } {
  // If user is wholesale, start from wholesale base price
  let basePrice = isWholesaleUser ? product.wholesalePrice : product.price;
  let discountPercent = 0;
  let isBulkTierApplied = false;

  // Check bulk tiers sorted descending by minQuantity
  if (product.bulkTiers && product.bulkTiers.length > 0) {
    const sortedTiers = [...product.bulkTiers].sort((a, b) => b.minQuantity - a.minQuantity);
    for (const tier of sortedTiers) {
      if (quantity >= tier.minQuantity) {
        discountPercent = tier.discountPercentage;
        isBulkTierApplied = true;
        break;
      }
    }
  }

  const unitPrice = basePrice * (1 - discountPercent / 100);
  return { unitPrice, discountPercent, isBulkTierApplied };
}

export function isExpiringSoon(expiryDateStr: string): {
  isExpired: boolean;
  isCritical: boolean; // < 30 days
  isWarning: boolean; // < 90 days
  daysRemaining: number;
} {
  const expiry = new Date(expiryDateStr);
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    isExpired: daysRemaining <= 0,
    isCritical: daysRemaining > 0 && daysRemaining <= 30,
    isWarning: daysRemaining > 30 && daysRemaining <= 90,
    daysRemaining,
  };
}

export function generateOrderNumber(): string {
  const prefix = "MED";
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
}

export function truncateText(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
