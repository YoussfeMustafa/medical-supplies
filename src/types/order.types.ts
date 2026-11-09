import { Address } from "./user.types";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type ShippingMethod = "standard" | "express" | "cold_chain";

export type PaymentMethod = "credit_card" | "cash_on_delivery" | "bank_transfer";

export interface OrderItem {
  productId: string;
  slug: string;
  name: {
    en: string;
    ar: string;
  };
  image: string;
  sku: string;
  price: number;
  quantity: number;
  variantId?: string;
  variantName?: {
    en: string;
    ar: string;
  };
  requiresPrescription: boolean;
  lotNumber?: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  organizationName?: string;
  userRole: "customer" | "wholesale";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number; // 14% VAT
  shippingCost: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  paymentStatus: "paid" | "unpaid" | "refunded";
  prescriptionId?: string;
  timeline: OrderTimelineEvent[];
  notes?: string;
  createdAt: string;
  estimatedDeliveryDate: string;
}
