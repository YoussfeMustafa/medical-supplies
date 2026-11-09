import { AdminStatsResponse } from "@/types/api.types";
import { User } from "@/types/user.types";
import { mockDb } from "./mock-db";

export class AdminService {
  async getDashboardStats(): Promise<AdminStatsResponse> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return mockDb.getAdminStats();
  }

  async getUsers(): Promise<User[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockDb.getUsers();
  }

  async updateUserWholesaleStatus(
    userId: string,
    status: "verified" | "rejected" | "pending"
  ): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return mockDb.updateUserWholesaleStatus(userId, status);
  }

  async getCoupons(): Promise<any[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockDb.getCoupons();
  }

  async createCoupon(coupon: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return mockDb.createCoupon(coupon);
  }

  async toggleCouponActive(code: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return mockDb.toggleCouponActive(code);
  }

  async deleteCoupon(code: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return mockDb.deleteCoupon(code);
  }

  async getReviews(): Promise<any[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockDb.getReviews();
  }

  async updateReviewStatus(
    id: string,
    status: "approved" | "rejected"
  ): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 60));
    return mockDb.updateReviewStatus(id, status);
  }
}

export const adminService = new AdminService();

