"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/provider";
import { useCartStore } from "@/stores/use-cart-store";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import { orderService } from "@/services/order-service";
import { Address } from "@/types/user.types";
import { ShippingMethod, PaymentMethod, Order } from "@/types/order.types";
import { AddressStep } from "@/components/checkout/address-step";
import { ShippingStep } from "@/components/checkout/shipping-step";
import { PaymentStep } from "@/components/checkout/payment-step";
import { OrderSummarySidebar } from "@/components/checkout/order-summary-sidebar";
import { checkoutAddressSchema } from "@/lib/validations";
import { CheckCircle2, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const {
    items,
    shippingMethod,
    setShippingMethod,
    getSubtotal,
    getDiscount,
    getShippingCost,
    getTax,
    getTotal,
    couponCode,
    clearCart,
  } = useCartStore();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const isWholesale = user?.role === "wholesale";

  // Step state: 1 (Address), 2 (Shipping), 3 (Payment)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Address State (prefilled with user's saved default address if any)
  const [address, setAddress] = useState<Partial<Address>>({
    recipientName: user?.name || "",
    phone: user?.phone || "+20 100 123 4567",
    building: user?.addresses[0]?.building || "عمارة 14",
    street: user?.addresses[0]?.street || "شارع الثورة",
    city: user?.addresses[0]?.city || "القاهرة",
    governorate: user?.addresses[0]?.governorate || "القاهرة",
  });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [cardData, setCardData] = useState({
    number: "4123 8891 0023 9874",
    holder: user?.name || "Dr. Tarek Mansour",
    expiry: "12/28",
    cvv: "341",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate address before advancing
  const handleNextFromAddress = () => {
    const result = checkoutAddressSchema.safeParse(address);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setAddressErrors(fieldErrors);
      addToast({
        title: "بيانات العنوان غير مكتملة",
        description: "يرجى استكمال الحقول المطلوبة للمتابعة",
        type: "error",
      });
      return;
    }
    setAddressErrors({});
    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    // Validate address again
    const addressCheck = checkoutAddressSchema.safeParse(address);
    if (!addressCheck.success) {
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      const subtotal = getSubtotal(isWholesale);
      const discount = getDiscount(isWholesale);
      const tax = getTax(isWholesale);
      const shippingCost = getShippingCost(isWholesale);
      const total = getTotal(isWholesale);

      const orderPayload: Partial<Order> = {
        userId: user?.id || "usr-guest",
        customerName: address.recipientName || user?.name || "Customer",
        customerEmail: user?.email || "customer@example.com",
        customerPhone: address.phone || "+20 100 000 0000",
        organizationName: user?.organizationName,
        userRole: user?.role === "wholesale" ? "wholesale" : "customer",
        items: items.map((item) => ({
          productId: item.product.id,
          slug: item.product.slug,
          name: item.product.name,
          image: item.product.images[0],
          sku: item.product.sku,
          price: item.priceAtAddition,
          quantity: item.quantity,
          variantId: item.variantId,
          variantName: item.variantName,
          requiresPrescription: item.product.requiresPrescription,
          lotNumber: item.product.lotNumber,
        })),
        subtotal,
        discount,
        couponCode: couponCode || undefined,
        tax,
        shippingCost,
        total,
        shippingAddress: address as Address,
        shippingMethod,
        paymentMethod,
        notes: "تم تأكيد الطلب إلكترونياً عبر بوابة كيورلاين الطبية",
      };

      const created = await orderService.createOrder(orderPayload);
      clearCart();
      router.push(`/checkout/success?orderNumber=${created.orderNumber}`);
    } catch (err) {
      console.error("Order creation failed", err);
      addToast({
        title: "فشل تأكيد الطلب",
        description: "حدث خطأ غير متوقع أثناء معالجة الطلب، يرجى المحاولة ثانية",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getSubtotal(isWholesale);

  return (
    <div className="container mx-auto px-4 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Checkout Stepper Bar */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 start-0 end-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

          {/* Step 1 */}
          <div
            onClick={() => setCurrentStep(1)}
            className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep >= 1
                  ? "bg-teal-600 text-white shadow-md ring-4 ring-teal-500/20"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              1
            </div>
            <span
              className={`max-w-24 text-center text-[10px] sm:max-w-none sm:text-xs font-semibold ${
                currentStep === 1
                  ? "text-teal-700 dark:text-teal-400 font-bold"
                  : "text-slate-500"
              }`}
            >
              العنوان والمستلم
            </span>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => currentStep > 1 && setCurrentStep(2)}
            className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep >= 2
                  ? "bg-teal-600 text-white shadow-md ring-4 ring-teal-500/20"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              2
            </div>
            <span
              className={`max-w-24 text-center text-[10px] sm:max-w-none sm:text-xs font-semibold ${
                currentStep === 2
                  ? "text-teal-700 dark:text-teal-400 font-bold"
                  : "text-slate-500"
              }`}
            >
              طريقة التوصيل
            </span>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => currentStep > 2 && setCurrentStep(3)}
            className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep >= 3
                  ? "bg-teal-600 text-white shadow-md ring-4 ring-teal-500/20"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              3
            </div>
            <span
              className={`max-w-24 text-center text-[10px] sm:max-w-none sm:text-xs font-semibold ${
                currentStep === 3
                  ? "text-teal-700 dark:text-teal-400 font-bold"
                  : "text-slate-500"
              }`}
            >
              وسيلة الدفع
            </span>
          </div>
        </div>
      </div>

      {/* Main Form + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Forms */}
        <div className="lg:col-span-8 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <AddressStep
                address={address}
                onChange={(field, val) =>
                  setAddress((prev) => ({ ...prev, [field]: val }))
                }
                errors={addressErrors}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleNextFromAddress}
                  variant="medical"
                  size="lg"
                  className="text-xs font-bold px-8"
                >
                  <span>متابعة لاختيار طريقة الشحن</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <ShippingStep
                selectedMethod={shippingMethod}
                onSelect={setShippingMethod}
                subtotal={subtotal}
              />
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>العودة لبيانات العنوان</span>
                </Button>
                <Button
                  variant="medical"
                  size="lg"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs font-bold px-8"
                >
                  <span>متابعة لوسيلة الدفع</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <PaymentStep
                selectedMethod={paymentMethod}
                onSelect={setPaymentMethod}
                cardData={cardData}
                onCardChange={(field, val) =>
                  setCardData((prev) => ({ ...prev, [field]: val }))
                }
              />
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>العودة لخيارات الشحن</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary & Final Place Button */}
        <div className="lg:col-span-4 sticky top-24">
          <OrderSummarySidebar
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
