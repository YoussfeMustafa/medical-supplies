"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { useTranslation } from "@/i18n/provider";
import { useCartStore } from "@/stores/use-cart-store";
import { useWishlistStore } from "@/stores/use-wishlist-store";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import { formatCurrency, calculateEffectivePrice } from "@/lib/utils";
import {
  ShoppingCart,
  Heart,
  Check,
  FileText,
  Sparkles,
  Shield,
  Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/ui/rating-stars";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { t, locale } = useTranslation();
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const isWholesale = user?.role === "wholesale";
  const inWishlist = isInWishlist(product.id);

  // Compute pricing
  const { unitPrice } = calculateEffectivePrice(product, 1, isWholesale);
  const displayPrice = unitPrice;
  const originalPrice = product.originalPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, undefined, isWholesale);
    addToast({
      title: t("product.addedToCart"),
      description: product.name[locale],
      type: "success",
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  if (viewMode === "list") {
    return (
      <div className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-all duration-200 hover:shadow-lg hover:border-teal-500/50">
        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          className="relative h-48 sm:h-44 sm:w-48 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800"
        >
          <img
            src={product.images[0]}
            alt={product.name[locale]}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-2 start-2 flex flex-col gap-1">
            {product.requiresPrescription && (
              <Badge variant="prescription" className="text-[10px]">
                <FileText className="h-2.5 w-2.5" />
                <span>بوصفة</span>
              </Badge>
            )}
            {product.isSterile && (
              <Badge variant="sterile" className="text-[10px]">
                <Shield className="h-2.5 w-2.5" />
                <span>معقم</span>
              </Badge>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">
                {product.brand}
              </span>
              <button
                onClick={handleWishlist}
                className={`p-1.5 rounded-full border transition-colors ${
                  inWishlist
                    ? "bg-rose-50 border-rose-200 text-rose-500"
                    : "border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:bg-slate-50"
                }`}
              >
                <Heart className={`h-4 w-4 ${inWishlist ? "fill-rose-500" : ""}`} />
              </button>
            </div>

            <Link href={`/products/${product.slug}`}>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-teal-600 transition-colors line-clamp-2">
                {product.name[locale]}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {product.shortDescription[locale]}
            </p>

            <div className="mt-2.5 flex items-center gap-4 text-xs text-slate-400">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <span>•</span>
              <span className="font-mono">SKU: {product.sku}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-teal-700 dark:text-teal-400">
                  {formatCurrency(displayPrice, locale)}
                </span>
                {originalPrice && originalPrice > displayPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrency(originalPrice, locale)}
                  </span>
                )}
              </div>
              {isWholesale && (
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  سعر العيادات والمستشفيات المعتمد
                </span>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              size="sm"
              variant="medical"
              disabled={product.stock <= 0}
              className="text-xs font-semibold"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>{product.stock > 0 ? t("product.addToCart") : t("product.outOfStock")}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/5 hover:border-teal-500/60">
      {/* Top badges & Wishlist */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/80 mb-3.5">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name[locale]}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges Stack */}
        <div className="absolute top-2.5 start-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.onSale && (
            <Badge variant="destructive" className="font-bold text-[10px]">
              خصم خاص
            </Badge>
          )}
          {product.requiresPrescription && (
            <Badge variant="prescription" className="text-[10px]">
              <FileText className="h-2.5 w-2.5" />
              <span>بوصفة</span>
            </Badge>
          )}
          {product.isSterile && (
            <Badge variant="sterile" className="text-[10px]">
              <Shield className="h-2.5 w-2.5" />
              <span>معقم</span>
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 end-2.5 z-10 min-h-11 min-w-11 flex items-center justify-center p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            inWishlist
              ? "bg-rose-50 text-rose-500 border border-rose-200"
              : "bg-white/80 dark:bg-slate-900/80 text-slate-500 hover:text-rose-500 hover:scale-110"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`h-4 w-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Low Stock Pill */}
        {product.stock > 0 && product.stock <= 15 && (
          <div className="absolute bottom-2 start-2 end-2 bg-amber-500/95 text-white text-[10px] font-bold py-1 px-2 rounded-lg text-center backdrop-blur-sm">
            متبقي {product.stock} قطع فقط في المستودع
          </div>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold text-teal-700 dark:text-teal-400">
              {product.brand}
            </span>
            <span className="font-mono text-[10px]">{product.sku}</span>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-teal-600 transition-colors">
              {product.name[locale]}
            </h3>
          </Link>

          <div className="mt-2 flex items-center justify-between">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-teal-700 dark:text-teal-400">
                  {formatCurrency(displayPrice, locale)}
                </span>
                {originalPrice && originalPrice > displayPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrency(originalPrice, locale)}
                  </span>
                )}
              </div>
              {isWholesale ? (
                <span className="text-[10px] text-emerald-600 font-semibold block">
                  سعر العيادات والمستشفيات
                </span>
              ) : (
                product.bulkTiers &&
                product.bulkTiers.length > 0 && (
                  <span className="text-[10px] text-slate-400 block">
                    خصم كميات حتى {product.bulkTiers[product.bulkTiers.length - 1].discountPercentage}%
                  </span>
                )
              )}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="medical"
            disabled={product.stock <= 0}
            className="w-full text-xs font-semibold h-10 shadow-sm"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>
              {product.stock > 0 ? t("product.addToCart") : t("product.outOfStock")}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
