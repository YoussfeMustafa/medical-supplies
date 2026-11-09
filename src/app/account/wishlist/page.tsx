"use client";

import React from "react";
import Link from "next/link";
import { useWishlistStore } from "@/stores/use-wishlist-store";
import { useCartStore } from "@/stores/use-cart-store";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import { useTranslation } from "@/i18n/provider";
import { ProductCard } from "@/components/product/product-card";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountWishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const { addItem, setDrawerOpen } = useCartStore();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();
  const { t } = useTranslation();

  const handleAddAllToCart = () => {
    items.forEach((product) => {
      addItem(product, 1, undefined, user?.role === "wholesale");
    });
    setDrawerOpen(true);
    addToast({
      title: "تمت إضافة كافة الأصناف إلى السلة",
      description: `${items.length} أصناف أضيفت بنجاح`,
      type: "success",
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900">
        <Heart className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          قائمة المستلزمات الطبية المفضلة فارغة
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          احفظ الأجهزة والمستهلكات التي تطلبها بانتظام لسرعة الوصول إليها وتكرار طلبها.
        </p>
        <div className="pt-4">
          <Link href="/products">
            <Button variant="medical" size="sm">
              استعراض دليل المنتجات
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            قائمة المستلزمات المفضلة ({items.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            الوصول السريع للأجهزة والمستهلكات الطبية المحفوظة.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleAddAllToCart}
            variant="medical"
            size="sm"
            className="text-xs font-semibold gap-1.5"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>إضافة الكل إلى السلة</span>
          </Button>

          <Button
            onClick={clearWishlist}
            variant="outline"
            size="sm"
            className="text-xs text-rose-600 hover:text-rose-700"
          >
            تفريغ القائمة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
