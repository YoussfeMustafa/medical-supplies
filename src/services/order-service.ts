import { Order, OrderStatus } from "@/types/order.types";
import { mockDb } from "./mock-db";

export class OrderService {
  async getOrders(userId?: string): Promise<Order[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockDb.getOrders(userId);
  }

  async getOrderById(id: string): Promise<Order | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockDb.getOrderById(id);
  }

  async createOrder(data: Partial<Order>): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return mockDb.createOrder(data);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const updated = mockDb.updateOrderStatus(id, status);
    if (!updated) throw new Error("Order not found");
    return updated;
  }
}

export const orderService = new OrderService();
