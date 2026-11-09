"use client";

import React, { useState, useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/i18n/provider";
import { productService } from "@/services/product-service";
import { Product } from "@/types/product.types";
import { useCartStore } from "@/stores/use-cart-store";
import { useWishlistStore } from "@/stores/use-wishlist-store";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import { formatCurrency, calculateEffectivePrice } from "@/lib/utils";
import { ProductGallery } from "@/components/product/product-gallery";
import { BulkPricingTable } from "@/components/product/bulk-pricing-table";
import { ProductCard } from "@/components/product/product-card";
import { RatingStars } from "@/components/ui/rating-stars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Heart,
  FileText,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  Building2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ProductDetailPage() {
  const { t, locale } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const isWholesale = user?.role === "wholesale";

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const prod = await productService.getProductBySlug(slug);
        if (prod) {
          setProduct(prod);
          if (prod.variants && prod.variants.length > 0) {
            setSelectedVariantId(prod.variants[0].id);
          }
          // Load related products from same category
          const related = await productService.getProducts({
            category: prod.categorySlug,
            limit: 4,
          });
          setRelatedProducts(related.data.filter((p) => p.id !== prod.id));
        }
      } catch (err) {
        console.error("Error fetching product", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-slate-500">
        جارِ تحميل تفاصيل المنتج الطبي والشهادات المعتمدة...
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const inWishlist = isInWishlist(product.id);
  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);
  const priceDelta = selectedVariant?.priceDelta || 0;

  // Calculate effective price given quantity and bulk tiers
  const { unitPrice, discountPercent, isBulkTierApplied } = calculateEffectivePrice(
    product,
    quantity,
    isWholesale
  );
  const finalUnitPrice = unitPrice + priceDelta;
  const totalPrice = finalUnitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariantId, isWholesale);
    addToast({
      title: t("product.addedToCart"),
      description: `${product.name[locale]} (الكمية: ${quantity})`,
      type: "success",
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariantId, isWholesale);
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
        <Link href="/" className="hover:text-teal-600">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-teal-600">
          دليل المنتجات
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="hover:text-teal-600 capitalize"
        >
          {product.categorySlug.replace(/-/g, " ")}
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-xs">
          {product.name[locale]}
        </span>
      </nav>

      {/* Main Grid: Gallery + Details Purchase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery product={product} />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-lg border border-teal-200/60 dark:border-teal-800">
                {product.brand}
              </span>
              <span className="font-mono text-xs text-slate-400">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {product.name[locale]}
            </h1>

            <div className="mt-2.5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">
                {product.stock > 0 ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>متوفر في المستودع ({product.stock} قطعة)</span>
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold">غير متوفر حالياً</span>
                )}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-5 space-y-3">
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-3xl font-black text-teal-700 dark:text-teal-400">
                {formatCurrency(finalUnitPrice, locale)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(product.originalPrice, locale)}
                </span>
              )}
              {isBulkTierApplied && (
                <Badge variant="success" className="text-xs font-bold">
                  وفرت {discountPercent}% بفضل خصم الكمية!
                </Badge>
              )}
            </div>

            {isWholesale ? (
              <p className="text-xs font-semibold text-emerald-600">
                ✓ سعر الجملة المعتمد للعيادات والمستشفيات المسجلة.
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                الأسعار شاملة ضريبة القيمة المضافة (14%). خصومات كمية خاصة للمستشفيات والطلبات المجمعة.
              </p>
            )}
          </div>

          {/* Prescription Warning */}
          {product.requiresPrescription && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 dark:bg-rose-950/40 p-4 text-rose-900 dark:text-rose-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-700 dark:text-rose-300">
                <FileText className="h-4 w-4" />
                <span>منتج يستلزم وصفة طبية صالحة (صنف مقيد)</span>
              </div>
              <p className="leading-relaxed">
                {t("product.prescriptionWarning")}
              </p>
              <Link
                href="/prescriptions/upload"
                className="inline-block text-xs font-bold text-rose-700 dark:text-rose-300 underline mt-1"
              >
                اضغط هنا لرفع الوصفة الطبية الآن مسبقاً
              </Link>
            </div>
          )}

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                المقاس / حجم العبوة:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariantId === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? "border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 ring-2 ring-teal-500/30"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {v.name[locale]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-14 text-center font-bold text-sm bg-transparent focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="text-start">
                <span className="text-[11px] text-slate-400 block">الإجمالي للكمية:</span>
                <span className="text-lg font-bold text-teal-700 dark:text-teal-400">
                  {formatCurrency(totalPrice, locale)}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                variant="medical"
                disabled={product.stock <= 0}
                className="w-full text-sm font-bold shadow-lg shadow-teal-600/20"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{t("product.addToCart")}</span>
              </Button>

              <Button
                onClick={handleBuyNow}
                size="lg"
                variant="secondary"
                disabled={product.stock <= 0}
                className="w-full text-sm font-bold"
              >
                <span>{t("product.buyNow")}</span>
              </Button>
            </div>

            <Button
              onClick={() => toggleItem(product)}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              <Heart
                className={`h-4 w-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`}
              />
              <span>
                {inWishlist ? t("product.removeFromWishlist") : t("product.addToWishlist")}
              </span>
            </Button>
          </div>

          {/* Wholesale Bulk Pricing Tiers Table */}
          <BulkPricingTable
            product={product}
            selectedQuantity={quantity}
            onSelectTierQuantity={(qty) => setQuantity(qty)}
          />
        </div>
      </div>

      {/* Tabs: Specifications, Usage Instructions, Reviews */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <Tabs defaultValue="specs">
          <TabsList className="w-full max-w-full overflow-x-auto sm:w-auto">
            <TabsTrigger value="specs">{t("product.specifications")}</TabsTrigger>
            <TabsTrigger value="instructions">{t("product.usageInstructions")}</TabsTrigger>
            <TabsTrigger value="reviews">
              {t("product.reviews")} ({product.reviewCount})
            </TabsTrigger>
          </TabsList>

          {/* Specifications Content */}
          <TabsContent value="specs" className="pt-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
                المواصفات الفنية والمطابقة القياسية
              </h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                <div className="grid grid-cols-2 py-3">
                  <span className="font-semibold text-slate-500">رقم التشغيلة (Lot Number)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {product.lotNumber}
                  </span>
                </div>
                <div className="grid grid-cols-2 py-3">
                  <span className="font-semibold text-slate-500">تاريخ الصلاحية (Expiry Date)</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {product.expiryDate}
                  </span>
                </div>
                <div className="grid grid-cols-2 py-3">
                  <span className="font-semibold text-slate-500">التعقيم الطبي</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {product.isSterile ? "معقم بالكامل (Sterile)" : "غير معقم"}
                  </span>
                </div>
                <div className="grid grid-cols-2 py-3">
                  <span className="font-semibold text-slate-500">شروط التخزين</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {product.storageCondition[locale]}
                  </span>
                </div>
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="grid grid-cols-2 py-3">
                    <span className="font-semibold text-slate-500">{spec.key[locale]}</span>
                    <span className="text-slate-800 dark:text-slate-200">{spec.value[locale]}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Usage Instructions Content */}
          <TabsContent value="instructions" className="pt-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                دليل الاستخدام السريري والتخزين
              </h3>
              <p>{product.usageInstructions[locale]}</p>
              <p>{product.description[locale]}</p>
            </div>
          </TabsContent>

          {/* Reviews Content */}
          <TabsContent value="reviews" className="pt-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    تقييمات الأطباء والعملاء
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <RatingStars rating={product.rating} />
                    <span className="text-xs font-semibold text-slate-600">
                      متوسط {product.rating} من 5 ({product.reviewCount} مراجعة)
                    </span>
                  </div>
                </div>
              </div>

              {product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="rounded-xl border border-slate-100 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/40 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-100">
                          {rev.userName}
                        </span>
                        <span className="text-slate-400">{rev.date}</span>
                      </div>
                      <RatingStars rating={rev.rating} showScore={false} />
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {rev.comment[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 text-center py-6">
                  لا توجد مراجعات مضافة بعد لهذا المنتج.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("product.relatedProducts")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
