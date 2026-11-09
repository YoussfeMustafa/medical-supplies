"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";
import { orderService } from "@/services/order-service";
import { productService } from "@/services/product-service";
import { Order, OrderStatus } from "@/types/order.types";
import { useAuthStore } from "@/stores/use-auth-store";
import { useCartStore } from "@/stores/use-cart-store";
import { useUIStore } from "@/stores/use-ui-store";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Package,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AccountOrdersPage() {
  const { t, locale } = useTranslation();
  const { user } = useAuthStore();
  const { addItem, setDrawerOpen } = useCartStore();
  const { addToast } = useUIStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);
      try {
        const data = await orderService.getOrders(user?.id);
        setOrders(data);
      } catch (err) {
        console.error("Load orders error", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, [user?.id]);

  const toggleExpand = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  // Reorder 1-click handler
  const handleReorder = async (order: Order) => {
    for (const item of order.items) {
      const prod = await productService.getProductById(item.productId);
      if (prod) {
        addItem(prod, item.quantity, item.variantId, user?.role === "wholesale");
      }
    }
    setDrawerOpen(true);
    addToast({
      title: "تمت إضافة أصناف الطلب السابق إلى السلة",
      description: `أمر توريد رقم ${order.orderNumber}`,
      type: "success",
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return (
          <Badge variant="success" className="text-xs font-semibold gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>تم الاستلام بنجاح</span>
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="coldChain" className="text-xs font-semibold gap-1">
            <Truck className="h-3 w-3" />
            <span>قيد الشحن والتوصيل</span>
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="default" className="text-xs font-semibold gap-1">
            <Clock className="h-3 w-3" />
            <span>مؤكد وجارِ التجهيز بالمستودع</span>
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive" className="text-xs font-semibold gap-1">
            <XCircle className="h-3 w-3" />
            <span>تم الإلغاء</span>
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="warning" className="text-xs font-semibold gap-1">
            <Clock className="h-3 w-3" />
            <span>قيد المراجعة</span>
          </Badge>
        );
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500">جارِ تحميل سجل الطلبات...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
        <Package className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          لا توجد طلبات سابقة مسجلة
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          تصفح دليل المنتجات الطبية واطلب المستلزمات التي تحتاجها عيادتك.
        </p>
        <div className="pt-4">
          <Link href="/products">
            <Button variant="medical" size="sm">
              بدء التسوق والتوريد
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            سجل الطلبات والتوريدات ({orders.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            تتبع شحناتك الطبية، إعادة الطلب بنقرة واحدة، واستخراج الفواتير الضريبية.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.id;

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4 transition-all"
            >
              {/* Card Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-sm text-teal-700 dark:text-teal-400">
                      {order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    تاريخ الطلب: {formatDate(order.createdAt, locale)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    onClick={() => handleReorder(order)}
                    variant="outline"
                    size="sm"
                    className="min-h-11 text-xs gap-1.5 font-semibold"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>إعادة الطلب (Reorder)</span>
                  </Button>

                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="min-h-11 min-w-11 flex items-center justify-center p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Items Thumbnails Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex min-w-0 items-center gap-2 overflow-x-auto py-1">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative h-12 w-12 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden flex-shrink-0"
                      title={item.name[locale]}
                    >
                      <img
                        src={item.image}
                        alt={item.name[locale]}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-0 end-0 bg-slate-900/80 text-white text-[9px] px-1 font-bold rounded-tl">
                        ×{item.quantity}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <span className="text-xs text-slate-400 font-semibold ps-2">
                      +{order.items.length - 4} أصناف أخرى
                    </span>
                  )}
                </div>

                <div className="text-end">
                  <span className="text-xs text-slate-400 block">الإجمالي النهائي:</span>
                  <span className="text-base font-bold text-teal-700 dark:text-teal-400">
                    {formatCurrency(order.total, locale)}
                  </span>
                </div>
              </div>

              {/* Collapsible Details & Timeline */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-5 animate-in fade-in-0 duration-200 text-xs">
                  {/* Detailed Items Table */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">
                      بيانات الأصناف المسعرة
                    </h4>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {order.items.map((item, i) => (
                        <div key={i} className="py-2 flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-100">
                              {item.name[locale]}
                            </span>
                            <span className="text-slate-400 text-[11px] block">
                              كود SKU: {item.sku} | تشغيلة: {item.lotNumber || "LOT-2024"}
                            </span>
                          </div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {item.quantity} × {formatCurrency(item.price, locale)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Stepper */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">
                      تتبع مسار الشحنة الطبية
                    </h4>
                    <div className="space-y-2 ps-3 border-s-2 border-teal-500">
                      {order.timeline.map((event, eIdx) => (
                        <div key={eIdx} className="space-y-0.5">
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {event.title[locale]}
                          </span>
                          <span className="text-slate-500 text-[11px] block">
                            {event.description[locale]} - {formatDate(event.timestamp, locale)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Print Invoice Action */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.print()}
                      className="text-xs gap-1.5"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      <span>طباعة الفاتورة الضريبية الرسمية</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
