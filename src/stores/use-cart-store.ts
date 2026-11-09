import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product.types";
import { calculateEffectivePrice } from "@/lib/utils";
import { VALID_COUPONS, VAT_RATE, SHIPPING_OPTIONS } from "@/lib/constants";
import { ShippingMethod } from "@/types/order.types";

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
  variantName?: { en: string; ar: string };
  priceAtAddition: number; // Unit price
}

interface CartStore {
  items: CartItem[];
  couponCode: string | null;
  discountPercentage: number;
  discountAmount: number;
  shippingMethod: ShippingMethod;
  isDrawerOpen: boolean;

  // Actions
  addItem: (product: Product, quantity?: number, variantId?: string, isWholesale?: boolean) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string, isWholesale?: boolean) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string, isWholesale?: boolean) => { success: boolean; message: string };
  removeCoupon: () => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setDrawerOpen: (open: boolean) => void;

  // Calculations
  getItemCount: () => number;
  hasPrescriptionItems: () => boolean;
  getSubtotal: (isWholesale?: boolean) => number;
  getDiscount: (isWholesale?: boolean) => number;
  getShippingCost: (isWholesale?: boolean) => number;
  getTax: (isWholesale?: boolean) => number;
  getTotal: (isWholesale?: boolean) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountPercentage: 0,
      discountAmount: 0,
      shippingMethod: "standard",
      isDrawerOpen: false,

      addItem: (product, quantity = 1, variantId, isWholesale = false) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.product.id === product.id && item.variantId === variantId
        );

        let newItems: CartItem[];
        if (existingIndex > -1) {
          const newQty = currentItems[existingIndex].quantity + quantity;
          const { unitPrice } = calculateEffectivePrice(product, newQty, isWholesale);
          newItems = [...currentItems];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newQty,
            priceAtAddition: unitPrice,
          };
        } else {
          const variant = variantId
            ? product.variants?.find((v) => v.id === variantId)
            : undefined;
          const { unitPrice } = calculateEffectivePrice(product, quantity, isWholesale);
          newItems = [
            ...currentItems,
            {
              product,
              quantity,
              variantId,
              variantName: variant?.name,
              priceAtAddition: unitPrice,
            },
          ];
        }

        set({ items: newItems, isDrawerOpen: true });
      },

      updateQuantity: (productId, quantity, variantId, isWholesale = false) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        const newItems = get().items.map((item) => {
          if (item.product.id === productId && item.variantId === variantId) {
            const { unitPrice } = calculateEffectivePrice(item.product, quantity, isWholesale);
            return {
              ...item,
              quantity,
              priceAtAddition: unitPrice,
            };
          }
          return item;
        });

        set({ items: newItems });
      },

      removeItem: (productId, variantId) => {
        const newItems = get().items.filter(
          (item) => !(item.product.id === productId && item.variantId === variantId)
        );
        set({ items: newItems });
      },

      clearCart: () => {
        set({
          items: [],
          couponCode: null,
          discountPercentage: 0,
          discountAmount: 0,
        });
      },

      applyCoupon: (code, isWholesale = false) => {
        const cleanCode = code.trim().toUpperCase();
        const coupon = VALID_COUPONS[cleanCode];

        if (!coupon) {
          return { success: false, message: "كود الخصم غير صحيح أو منتهي الصلاحية" };
        }

        const subtotal = get().getSubtotal(isWholesale);
        if (subtotal < coupon.minSpend) {
          return {
            success: false,
            message: `الحد الأدنى لتفعيل هذا الكود هو ${coupon.minSpend} ج.م`,
          };
        }

        if (coupon.forWholesaleOnly && !isWholesale) {
          return {
            success: false,
            message: "هذا الكود مخصص حصرياً للمنشآت والعيادات المعتمدة",
          };
        }

        set({
          couponCode: cleanCode,
          discountPercentage: coupon.discountPercent || 0,
          discountAmount: coupon.discountAmount || 0,
        });

        return { success: true, message: "تم تفعيل كود الخصم بنجاح!" };
      },

      removeCoupon: () => {
        set({ couponCode: null, discountPercentage: 0, discountAmount: 0 });
      },

      setShippingMethod: (method) => {
        set({ shippingMethod: method });
      },

      setDrawerOpen: (open) => {
        set({ isDrawerOpen: open });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      hasPrescriptionItems: () => {
        return get().items.some((item) => item.product.requiresPrescription);
      },

      getSubtotal: (isWholesale = false) => {
        return get().items.reduce((sum, item) => {
          const { unitPrice } = calculateEffectivePrice(
            item.product,
            item.quantity,
            isWholesale
          );
          return sum + unitPrice * item.quantity;
        }, 0);
      },

      getDiscount: (isWholesale = false) => {
        const subtotal = get().getSubtotal(isWholesale);
        const { discountPercentage, discountAmount, couponCode } = get();
        let discount = 0;

        if (discountPercentage > 0) {
          discount += (subtotal * discountPercentage) / 100;
        }
        if (discountAmount > 0) {
          discount += discountAmount;
        }

        // Handle FREESHIP coupon logic if set
        if (couponCode === "FREESHIP") {
          // shipping is zeroed in getShippingCost
        }

        return discount;
      },

      getShippingCost: (isWholesale = false) => {
        const { shippingMethod, couponCode } = get();
        if (couponCode === "FREESHIP") return 0;

        const subtotal = get().getSubtotal(isWholesale);
        const opt = SHIPPING_OPTIONS[shippingMethod];

        if (subtotal >= opt.freeThreshold) {
          return 0; // Free shipping threshold met
        }
        return opt.cost;
      },

      getTax: (isWholesale = false) => {
        const subtotal = get().getSubtotal(isWholesale);
        const discount = get().getDiscount(isWholesale);
        const taxableAmount = Math.max(0, subtotal - discount);
        return taxableAmount * VAT_RATE;
      },

      getTotal: (isWholesale = false) => {
        const subtotal = get().getSubtotal(isWholesale);
        const discount = get().getDiscount(isWholesale);
        const tax = get().getTax(isWholesale);
        const shipping = get().getShippingCost(isWholesale);
        return Math.max(0, subtotal - discount + tax + shipping);
      },
    }),
    {
      name: "cureline_cart_storage",
    }
  )
);
