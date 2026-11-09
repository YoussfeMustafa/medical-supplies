"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/features/admin/admin-header";
import { StatCard } from "@/features/admin/stat-card";
import { RevenueChart } from "@/features/admin/revenue-chart";
import { OrderDistributionChart } from "@/features/admin/order-distribution-chart";
import { ExpiryAlertBanner } from "@/features/admin/expiry-alert-banner";
import { adminService } from "@/services/admin-service";
import { productService } from "@/services/product-service";
import { AdminStatsResponse } from "@/types/api.types";
import { Product } from "@/types/product.types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  DollarSign,
  ShoppingBag,
  Building2,
  FileCheck,
  Package,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStatsResponse | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, productsData] = await Promise.all([
          adminService.getDashboardStats(),
          productService.getProducts({ limit: 100 }),
        ]);
        setStats(statsData);
        setProducts(productsData.data);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="p-8">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const statusBadgeVariants: Record<string, "default" | "success" | "warning" | "destructive" | "secondary"> = {
    pending: "warning",
    confirmed: "default",
    shipped: "default",
    delivered: "success",
    cancelled: "destructive",
  };

  const statusLabels: Record<string, string> = {
    pending: "قيد المراجعة",
    confirmed: "مؤكد / تجهيز",
    shipped: "خرج للشحن",
    delivered: "تم التسليم",
    cancelled: "ملغي",
  };

  return (
    <div>
      <AdminHeader title="نظرة عامة على العمليات والمبيعات" />

      <div className="p-3 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        {/* Expiry Alerts Banner */}
        <ExpiryAlertBanner products={products} />

        {/* KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="إجمالي الإيرادات"
            value={formatCurrency(stats.totalRevenue, "ar")}
            change={`+${stats.revenueGrowthMoM}%`}
            isPositive={true}
            subtitle="مقارنة بالشهر السابق"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <StatCard
            title="إجمالي الطلبات"
            value={stats.totalOrders}
            change={`+${stats.ordersGrowthMoM}%`}
            isPositive={true}
            subtitle="طلبيات التجزئة والتوريد الطبي"
            icon={<ShoppingBag className="h-5 w-5" />}
          />
          <StatCard
            title="حسابات الجملة المعتمدة"
            value={stats.activeWholesaleAccounts}
            subtitle="عيادات ومستشفيات معتمدة"
            icon={<Building2 className="h-5 w-5" />}
          />
          <StatCard
            title="وصفات طبية تنتظر المراجعة"
            value={stats.pendingPrescriptions}
            subtitle="تتطلب موافقة الصيدلي المسؤول"
            variant={stats.pendingPrescriptions > 0 ? "warning" : "default"}
            icon={<FileCheck className="h-5 w-5" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <div className="lg:col-span-2 min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="min-w-0">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  منحنى الإيرادات والطلبات الشهرية
                </h3>
                <p className="text-xs text-slate-500">
                  تحليل نمو المبيعات خلال الـ 6 أشهر الماضية
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-1 rounded-full">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+18.4% نمو إجمالي</span>
              </span>
            </div>
            <RevenueChart data={stats.revenueChart} />
          </div>

          {/* Order Distribution */}
          <div className="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              توزيع حالات الشحنات
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              متابعة تدفق الشحنات الطبية الميدانية
            </p>
            <OrderDistributionChart data={stats.orderStatusDistribution} />
          </div>
        </div>

        {/* Two Column Section: Recent Orders & Top Selling Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders (2 Columns) */}
          <div className="lg:col-span-2 min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  أحدث الطلبيات الطبية
                </h3>
                <p className="text-xs text-slate-500">
                  طلبات الشراء الواردة حديثاً من العيادات والعملاء
                </p>
              </div>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <span>عرض جميع الطلبات</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                    <th className="py-2.5 px-3 text-start">رقم الطلب</th>
                    <th className="py-2.5 px-3 text-start">العميل / المؤسسة</th>
                    <th className="py-2.5 px-3 text-start">القيمة</th>
                    <th className="py-2.5 px-3 text-start">الحالة</th>
                    <th className="py-2.5 px-3 text-start">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {stats.recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-teal-700 dark:text-teal-400">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-900 dark:text-white block">
                          {order.customerName}
                        </span>
                        {order.organizationName && (
                          <span className="text-[10px] text-slate-500 block">
                            {order.organizationName}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                        {formatCurrency(order.total, "ar")}
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={statusBadgeVariants[order.status] || "default"}
                          className="text-[10px]"
                        >
                          {statusLabels[order.status] || order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-slate-500">
                        {formatDate(order.createdAt, "ar")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Selling Products (1 Column) */}
          <div className="min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-5">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  الأكثر مبيعاً
                </h3>
                <p className="text-xs text-slate-500">
                  المستلزمات ذات الإقبال العالي
                </p>
              </div>
              <Link href="/admin/products">
                <Button variant="ghost" size="sm" className="text-xs p-1">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {stats.topSellingProducts.map(({ product, soldCount, totalRevenue }, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="h-6 w-6 rounded-lg bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {product.name.ar}
                    </h4>
                    <span className="text-[11px] text-slate-400 block">
                      {soldCount} قطعة مباعة
                    </span>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {formatCurrency(totalRevenue, "ar")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
