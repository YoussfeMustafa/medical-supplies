"use client";

import React, { useState } from "react";
import { Product, ProductCategorySlug } from "@/types/product.types";
import { productService } from "@/services/product-service";
import { mockCategories } from "@/services/mock-data/categories.data";
import { mockBrands } from "@/services/mock-data/brands.data";
import { useUIStore } from "@/stores/use-ui-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSuccess?: () => void;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductFormDialogProps) {
  const { addToast } = useUIStore();
  const isEditing = !!product;

  const [nameAr, setNameAr] = useState(product?.name.ar || "");
  const [nameEn, setNameEn] = useState(product?.name.en || "");
  const [sku, setSku] = useState(product?.sku || "");
  const [category, setCategory] = useState<ProductCategorySlug>(
    product?.categorySlug || "personal-protective-equipment"
  );
  const [brand, setBrand] = useState(product?.brand || "Paul Hartmann");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [wholesalePrice, setWholesalePrice] = useState(
    product?.wholesalePrice?.toString() || ""
  );
  const [stock, setStock] = useState(product?.stock?.toString() || "50");
  const [lotNumber, setLotNumber] = useState(product?.lotNumber || "LOT-2024-MED01");
  const [expiryDate, setExpiryDate] = useState(
    product?.expiryDate || "2028-12-31"
  );
  const [imageUrl, setImageUrl] = useState(
    product?.images[0] ||
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
  );
  const [requiresPrescription, setRequiresPrescription] = useState(
    !!product?.requiresPrescription
  );
  const [isSterile, setIsSterile] = useState(product?.isSterile ?? true);
  const [descAr, setDescAr] = useState(product?.description.ar || "");
  const [descEn, setDescEn] = useState(product?.description.en || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr || !price) {
      addToast({
        title: "بيانات ناقصة",
        description: "يرجى إدخال اسم المنتج والسعر على الأقل",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: Partial<Product> = {
        name: { ar: nameAr, en: nameEn || nameAr },
        sku: sku || `MED-${Math.floor(1000 + Math.random() * 9000)}`,
        categorySlug: category,
        brand,
        price: Number(price),
        wholesalePrice: wholesalePrice ? Number(wholesalePrice) : Number(price) * 0.8,
        stock: Number(stock),
        lotNumber,
        expiryDate,
        images: [imageUrl],
        requiresPrescription,
        isSterile,
        description: { ar: descAr || nameAr, en: descEn || nameEn || nameAr },
        shortDescription: { ar: descAr.slice(0, 100) || nameAr, en: descEn.slice(0, 100) || nameEn },
      };

      if (isEditing && product) {
        await productService.updateProduct(product.id, payload);
        addToast({ title: "تم تحديث المنتج", description: nameAr, type: "success" });
      } else {
        await productService.createProduct(payload);
        addToast({ title: "تمت إضافة المنتج بنجاح", description: nameAr, type: "success" });
      }

      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      console.error("Save product error", err);
      addToast({ title: "فشل الحفظ", description: "حدث خطأ أثناء حفظ المنتج", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "تعديل بيانات الصنف الطبي" : "إضافة منتج / صنف طبي جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold block mb-1">الاسم بالعربية *</label>
              <Input
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: قفازات فحص طبية نيتريل"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">Name in English</label>
              <Input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Nitrile Exam Gloves"
              />
            </div>
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold block mb-1">القسم الطبي</label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategorySlug)}
              >
                {mockCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name.ar}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">الشركة المصنعة</label>
              <Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                {mockBrands.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold block mb-1">سعر التجزئة (ج.م) *</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="250"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">سعر الجملة للعيادات (ج.م)</label>
              <Input
                type="number"
                value={wholesalePrice}
                onChange={(e) => setWholesalePrice(e.target.value)}
                placeholder="200"
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">رصيد المخزون (قطع)</label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="100"
              />
            </div>
          </div>

          {/* Clinical Tracking: Lot, Expiry, SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold block mb-1">رقم التشغيلة (Lot)</label>
              <Input
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                placeholder="LOT-2024-X"
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">تاريخ الصلاحية</label>
              <Input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1">كود SKU</label>
              <Input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="MED-PPE-001"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-xs font-semibold block mb-1">رابط صورة المنتج (URL)</label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Flags */}
          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={requiresPrescription}
                onChange={(e) => setRequiresPrescription(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-teal-600"
              />
              <span>يتطلب وصفة طبية (صنف مقيد)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isSterile}
                onChange={(e) => setIsSterile(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-teal-600"
              />
              <span>منتج معقم بالكامل (Sterile)</span>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold block mb-1">الوصف والمواصفات الطبية</label>
            <Textarea
              value={descAr}
              onChange={(e) => setDescAr(e.target.value)}
              placeholder="وصف تفصيلي واستخدامات المنتج..."
              rows={3}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              variant="medical"
              size="sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جارِ الحفظ...</span>
                </>
              ) : (
                <span>{isEditing ? "حفظ التعديلات" : "إضافة الصنف للمستودع"}</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
