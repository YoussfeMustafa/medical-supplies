"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/provider";
import { productService } from "@/services/product-service";
import { Product, Category, Brand } from "@/types/product.types";
import { ProductFilters } from "@/types/api.types";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductFilterSidebar } from "@/components/product/product-filter-sidebar";
import {
  Grid,
  List,
  Filter,
  ArrowUpDown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

function ProductsContent() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Parse filters from URL
  const activeFilters: ProductFilters = {
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    brand: searchParams.get("brand") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    inStockOnly: searchParams.get("inStockOnly") === "true",
    requiresPrescription: searchParams.has("requiresPrescription")
      ? searchParams.get("requiresPrescription") === "true"
      : undefined,
    sortBy: (searchParams.get("sortBy") as any) || "featured",
    page: Number(searchParams.get("page") || 1),
    limit: 12,
  };

  // Sync state to URL
  const updateURLFilters = (newFilters: Partial<ProductFilters>) => {
    const merged = { ...activeFilters, ...newFilters };
    const params = new URLSearchParams();

    if (merged.search) params.set("search", merged.search);
    if (merged.category) params.set("category", merged.category);
    if (merged.brand) params.set("brand", merged.brand);
    if (merged.minPrice) params.set("minPrice", String(merged.minPrice));
    if (merged.maxPrice) params.set("maxPrice", String(merged.maxPrice));
    if (merged.inStockOnly) params.set("inStockOnly", "true");
    if (merged.requiresPrescription !== undefined) {
      params.set("requiresPrescription", String(merged.requiresPrescription));
    }
    if (merged.sortBy && merged.sortBy !== "featured") {
      params.set("sortBy", merged.sortBy);
    }
    if (merged.page && merged.page > 1) {
      params.set("page", String(merged.page));
    }

    router.push(`/products?${params.toString()}`);
  };

  // Reset filters
  const handleReset = () => {
    router.push("/products");
  };

  // Load Categories & Brands once
  useEffect(() => {
    async function loadMeta() {
      try {
        const [cats, brs] = await Promise.all([
          productService.getCategories(),
          productService.getBrands(),
        ]);
        setCategories(cats);
        setBrands(brs);
      } catch (err) {
        console.error("Meta loading error", err);
      }
    }
    loadMeta();
  }, []);

  // Fetch products when activeFilters change
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await productService.getProducts(activeFilters);
        setProducts(res.data);
        setTotalCount(res.total);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error("Product fetching error", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [
    searchParams.toString(),
  ]);

  const activeCategoryObj = categories.find((c) => c.slug === activeFilters.category);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top Title & Active filter chips */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeCategoryObj ? activeCategoryObj.name[locale] : t("catalog.title")}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {t("catalog.showingResults", {
                count: products.length,
                total: totalCount,
              })}
            </p>
          </div>

          {/* Controls: View Mode & Sort */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden min-h-11 text-xs"
            >
              <Filter className="h-4 w-4" />
              <span>{t("catalog.filters")}</span>
            </Button>

            {/* Sort Dropdown */}
            <div className="w-full min-w-0 flex-1 sm:w-48">
              <Select
                value={activeFilters.sortBy || "featured"}
                onChange={(e) =>
                  updateURLFilters({ sortBy: e.target.value as any, page: 1 })
                }
              >
                <option value="featured">{t("catalog.sortFeatured")}</option>
                <option value="price-asc">{t("catalog.sortPriceLow")}</option>
                <option value="price-desc">{t("catalog.sortPriceHigh")}</option>
                <option value="rating">{t("catalog.sortRating")}</option>
                <option value="newest">{t("catalog.sortNewest")}</option>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-1 bg-slate-100/60 dark:bg-slate-800/60">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-900 shadow-sm text-teal-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white dark:bg-slate-900 shadow-sm text-teal-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Pills */}
        {(activeFilters.search ||
          activeFilters.category ||
          activeFilters.brand ||
          activeFilters.requiresPrescription ||
          activeFilters.inStockOnly) && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-400">الفلاتر النشطة:</span>
            {activeFilters.search && (
              <Badge variant="secondary" className="gap-1 text-xs py-1">
                <span>بحث: {activeFilters.search}</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateURLFilters({ search: undefined, page: 1 })}
                />
              </Badge>
            )}
            {activeFilters.category && (
              <Badge variant="secondary" className="gap-1 text-xs py-1">
                <span>القسم: {activeCategoryObj?.name[locale] || activeFilters.category}</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateURLFilters({ category: undefined, page: 1 })}
                />
              </Badge>
            )}
            {activeFilters.brand && (
              <Badge variant="secondary" className="gap-1 text-xs py-1">
                <span>الشركة: {activeFilters.brand}</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateURLFilters({ brand: undefined, page: 1 })}
                />
              </Badge>
            )}
            {activeFilters.requiresPrescription && (
              <Badge variant="prescription" className="gap-1 text-xs py-1">
                <span>بوصفة طبية فقط</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    updateURLFilters({ requiresPrescription: undefined, page: 1 })
                  }
                />
              </Badge>
            )}
            {activeFilters.inStockOnly && (
              <Badge variant="success" className="gap-1 text-xs py-1">
                <span>المتوفر بالمستودع فقط</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateURLFilters({ inStockOnly: undefined, page: 1 })}
                />
              </Badge>
            )}

            <button
              onClick={handleReset}
              className="text-xs font-semibold text-rose-600 hover:underline ms-2"
            >
              إلغاء الكل
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <ProductFilterSidebar
            categories={categories}
            brands={brands}
            filters={activeFilters}
            onFilterChange={updateURLFilters}
            onReset={handleReset}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="fixed inset-y-0 start-0 z-50 w-full max-w-[min(20rem,100vw)] bg-white dark:bg-slate-900 p-4 sm:p-5 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="font-bold text-base">تصفية المنتجات</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ProductFilterSidebar
                categories={categories}
                brands={brands}
                filters={activeFilters}
                onFilterChange={(f) => {
                  updateURLFilters(f);
                  setMobileFilterOpen(false);
                }}
                onReset={() => {
                  handleReset();
                  setMobileFilterOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-8">
          <ProductGrid
            products={products}
            isLoading={isLoading}
            viewMode={viewMode}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                disabled={activeFilters.page === 1}
                onClick={() =>
                  updateURLFilters({ page: (activeFilters.page || 1) - 1 })
                }
                className="text-xs"
              >
                <ChevronRight className="h-4 w-4" />
                <span>السابق</span>
              </Button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = (activeFilters.page || 1) === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => updateURLFilters({ page: pageNum })}
                    className={`h-9 w-9 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-teal-600 text-white shadow-sm"
                        : "border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                disabled={activeFilters.page === totalPages}
                onClick={() =>
                  updateURLFilters({ page: (activeFilters.page || 1) + 1 })
                }
                className="text-xs"
              >
                <span>التالي</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center text-slate-400">
          جارِ تحميل دليل المستلزمات الطبية...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
