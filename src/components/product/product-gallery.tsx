"use client";

import React, { useState } from "react";
import { Product } from "@/types/product.types";
import { useTranslation } from "@/i18n/provider";
import { ShieldCheck, Snowflake, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const { t, locale } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const activeImage = product.images[activeImageIndex] || product.images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image View with Zoom on Hover */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={activeImage}
          alt={product.name[locale]}
          className={`h-full w-full object-cover transition-transform duration-200 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }
              : undefined
          }
        />

        {/* Overlay Badges */}
        <div className="absolute top-4 start-4 flex flex-col gap-2 pointer-events-none z-10">
          {product.requiresPrescription && (
            <Badge variant="prescription" className="text-xs px-3 py-1 font-semibold shadow-sm">
              <FileText className="h-3.5 w-3.5" />
              <span>{t("product.prescriptionRequired")}</span>
            </Badge>
          )}

          {product.isSterile && (
            <Badge variant="sterile" className="text-xs px-3 py-1 font-semibold shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              <span>{t("product.sterile")}</span>
            </Badge>
          )}

          {product.storageCondition &&
            product.storageCondition.en.toLowerCase().includes("cool") && (
              <Badge variant="coldChain" className="text-xs px-3 py-1 font-semibold shadow-sm">
                <Snowflake className="h-3.5 w-3.5 text-cyan-600" />
                <span>شحن مبرد 2-8°C</span>
              </Badge>
            )}
        </div>
      </div>

      {/* Thumbnails Row */}
      {product.images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                activeImageIndex === idx
                  ? "border-teal-600 ring-2 ring-teal-500/30 scale-105"
                  : "border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${product.name[locale]} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Trust Guarantee Note */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800">
        <span className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-medium">
          <CheckCircle2 className="h-4 w-4" />
          <span>مطابق لشهادات CE / ISO 13485</span>
        </span>
        <span className="font-mono text-[11px]">تشغيلة: {product.lotNumber}</span>
      </div>
    </div>
  );
}
