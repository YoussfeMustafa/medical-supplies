import { Order } from "./order.types";
import { Product } from "./product.types";

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  requiresPrescription?: boolean;
  search?: string;
  sortBy?: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface AdminStatsResponse {
  totalRevenue: number;
  revenueGrowthMoM: number;
  totalOrders: number;
  ordersGrowthMoM: number;
  activeWholesaleAccounts: number;
  pendingPrescriptions: number;
  lowStockItemsCount: number;
  expiringItemsCount: number;
  revenueChart: {
    month: string;
    revenue: number;
    orders: number;
  }[];
  orderStatusDistribution: {
    name: string;
    value: number;
    color: string;
  }[];
  recentOrders: Order[];
  topSellingProducts: {
    product: Product;
    soldCount: number;
    totalRevenue: number;
  }[];
}
