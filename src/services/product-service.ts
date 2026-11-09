import { Product, Category, Brand } from "@/types/product.types";
import { ProductFilters, PaginatedResponse } from "@/types/api.types";
import { mockDb } from "./mock-db";

export class ProductService {
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    // Simulating realistic network latency for queries (50ms)
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockDb.getProducts(filters);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockDb.getProductBySlug(slug);
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 30));
    return mockDb.getProductById(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const res = mockDb.getProducts({ limit: 8, sortBy: "featured" });
    return res.data;
  }

  async getBestSellers(): Promise<Product[]> {
    const res = mockDb.getProducts({ limit: 6, sortBy: "rating" });
    return res.data;
  }

  async getCategories(): Promise<Category[]> {
    return mockDb.getCategories();
  }

  async getBrands(): Promise<Brand[]> {
    return mockDb.getBrands();
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockDb.createProduct(data);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const updated = mockDb.updateProduct(id, data);
    if (!updated) throw new Error("Product not found");
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockDb.deleteProduct(id);
  }
}

export const productService = new ProductService();
