"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/provider";
import { useUIStore } from "@/stores/use-ui-store";
import { productService } from "@/services/product-service";
import { Product } from "@/types/product.types";
import { Search, X, Loader2, ArrowRight, FileText, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function SearchModal() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const { searchModalOpen, setSearchModalOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === "Escape" && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  // Focus input on open
  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [searchModalOpen]);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await productService.getProducts({ search: query, limit: 6 });
        setResults(res.data);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchModalOpen(false);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!searchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSearchModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative flex max-h-[calc(100dvh-6rem)] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 sm:max-h-[calc(100dvh-8rem)]">
        {/* Search Input Box */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3.5 bg-slate-50/50 dark:bg-slate-900/50"
        >
          <Search className="h-5 w-5 text-teal-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("nav.searchPlaceholder")}
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-teal-600" />}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="min-h-11 min-w-11 flex items-center justify-center rounded text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setSearchModalOpen(false)}
            className="min-h-11 rounded-lg bg-slate-200 dark:bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-300"
          >
            ESC
          </button>
        </form>

        {/* Results Area */}
        <div className="min-h-0 max-h-[60vh] overflow-y-auto p-3 sm:p-4">
          {query.trim() === "" ? (
            <div className="space-y-4 py-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                عمليات بحث شائعة في المستلزمات الطبية
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "قفازات نيتريل",
                  "جهاز ضغط أومرون",
                  "سماعة ليتمان",
                  "سرنجات 3 مل",
                  "كانيولا 20G",
                  "شرائط أكيو-تشيك",
                  "أكسجين فيليبس",
                  "كرسي متحرك",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/70 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-teal-50 hover:border-teal-300 transition-colors"
                  >
                    <Sparkles className="h-3 w-3 text-teal-600" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-400 mb-2">
                نتائج مطابقة ({results.length})
              </div>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setSearchModalOpen(false)}
                  className="flex items-center justify-between gap-3 rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name[locale]}
                      className="h-12 w-12 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors line-clamp-1">
                        {product.name[locale]}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500">{product.brand}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-mono text-slate-400">
                          {product.sku}
                        </span>
                        {product.requiresPrescription && (
                          <Badge variant="prescription" className="text-[10px] py-0">
                            <FileText className="h-2.5 w-2.5" />
                            <span>بوصفة</span>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="text-sm font-bold text-teal-700 dark:text-teal-400">
                      {formatCurrency(product.price, locale)}
                    </span>
                  </div>
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline"
                >
                  <span>عرض جميع النتائج لـ &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400">
              <Search className="h-8 w-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">لم نجد أي مستلزمات طبية تطابق بحثك</p>
              <p className="text-xs mt-1">تأكد من كتابة الكلمات بشكل صحيح أو ابحث برقم الـ SKU</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
