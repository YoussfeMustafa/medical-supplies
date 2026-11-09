import { Product, Category, Brand } from "@/types/product.types";
import { Order, OrderStatus } from "@/types/order.types";
import { Prescription, PrescriptionStatus } from "@/types/prescription.types";
import { RFQRequest } from "@/types/rfq.types";
import { User } from "@/types/user.types";
import { mockProducts } from "./mock-data/products.data";
import { mockCategories } from "./mock-data/categories.data";
import { mockBrands } from "./mock-data/brands.data";
import { mockOrders } from "./mock-data/orders.data";
import { mockPrescriptions } from "./mock-data/prescriptions.data";
import { mockRFQs } from "./mock-data/rfq.data";
import { mockUsers } from "./mock-data/users.data";
import { AdminStatsResponse, ProductFilters, PaginatedResponse } from "@/types/api.types";

// In-memory persistent state during session
class MockDatabase {
  private products: Product[] = [...mockProducts];
  private categories: Category[] = [...mockCategories];
  private brands: Brand[] = [...mockBrands];
  private orders: Order[] = [...mockOrders];
  private prescriptions: Prescription[] = [...mockPrescriptions];
  private rfqs: RFQRequest[] = [...mockRFQs];
  private users: User[] = [...mockUsers];

  // Products
  getProducts(filters?: ProductFilters): PaginatedResponse<Product> {
    let result = [...this.products];

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.ar.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters?.category) {
      result = result.filter((p) => p.categorySlug === filters.category);
    }

    if (filters?.brand) {
      result = result.filter(
        (p) => p.brand.toLowerCase() === filters.brand?.toLowerCase()
      );
    }

    if (filters?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (filters.minPrice || 0));
    }

    if (filters?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= (filters.maxPrice || Infinity));
    }

    if (filters?.minRating !== undefined) {
      result = result.filter((p) => p.rating >= (filters.minRating || 0));
    }

    if (filters?.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    if (filters?.requiresPrescription !== undefined) {
      result = result.filter(
        (p) => p.requiresPrescription === filters.requiresPrescription
      );
    }

    // Sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          result.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "featured":
        default:
          result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
    }

    const total = result.length;
    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = result.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      total,
      page,
      totalPages,
      limit,
    };
  }

  getProductBySlug(slug: string): Product | null {
    return this.products.find((p) => p.slug === slug) || null;
  }

  getProductById(id: string): Product | null {
    return this.products.find((p) => p.id === id) || null;
  }

  createProduct(data: Partial<Product>): Product {
    const id = `prod-custom-${Date.now()}`;
    const slug =
      data.slug ||
      (data.name?.en || "product")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newProduct: Product = {
      id,
      slug,
      sku: data.sku || `MED-CUS-${Math.floor(100 + Math.random() * 900)}`,
      barcode: data.barcode || `622100${Date.now().toString().slice(-7)}`,
      name: data.name || { ar: "منتج طبي جديد", en: "New Medical Product" },
      shortDescription: data.shortDescription || {
        ar: "وصف موجز للمنتج",
        en: "Short product description",
      },
      description: data.description || {
        ar: "وصف تفصيلي للمنتج والمواصفات",
        en: "Detailed product description",
      },
      categorySlug: data.categorySlug || "personal-protective-equipment",
      brand: data.brand || "Paul Hartmann",
      price: data.price || 100,
      originalPrice: data.originalPrice,
      wholesalePrice: data.wholesalePrice || (data.price ? data.price * 0.8 : 80),
      bulkTiers: data.bulkTiers || [
        {
          minQuantity: 10,
          discountPercentage: 10,
          unitPrice: (data.price || 100) * 0.9,
        },
      ],
      images:
        data.images && data.images.length > 0
          ? data.images
          : ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"],
      stock: data.stock ?? 50,
      minOrderQuantity: data.minOrderQuantity || 1,
      requiresPrescription: !!data.requiresPrescription,
      isSterile: !!data.isSterile,
      lotNumber: data.lotNumber || `LOT-${new Date().getFullYear()}-001`,
      expiryDate: data.expiryDate || "2028-12-31",
      storageCondition: data.storageCondition || {
        ar: "مكان جاف في درجة حرارة الغرفة",
        en: "Dry place at room temperature",
      },
      certifications: data.certifications || [
        { name: "CE Mark", issuedBy: "TUV", validUntil: "2029-01-01" },
      ],
      variants: data.variants || [],
      specifications: data.specifications || [],
      usageInstructions: data.usageInstructions || {
        ar: "يستخدم وفق الإرشادات الطبية المعتمدة",
        en: "Use per clinical guidelines",
      },
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      tags: data.tags || ["medical", "supplies"],
      createdAt: new Date().toISOString(),
    };

    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // Categories & Brands
  getCategories(): Category[] {
    return this.categories;
  }

  getBrands(): Brand[] {
    return this.brands;
  }

  // Orders
  getOrders(userId?: string): Order[] {
    if (userId) {
      return this.orders.filter((o) => o.userId === userId);
    }
    return [...this.orders];
  }

  getOrderById(id: string): Order | null {
    return this.orders.find((o) => o.id === id || o.orderNumber === id) || null;
  }

  createOrder(orderData: Partial<Order>): Order {
    const id = `ord-${Date.now()}`;
    const orderNumber = `MED-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id,
      orderNumber,
      userId: orderData.userId || "usr-customer-1",
      customerName: orderData.customerName || "Customer",
      customerEmail: orderData.customerEmail || "customer@example.com",
      customerPhone: orderData.customerPhone || "+20 100 000 0000",
      organizationName: orderData.organizationName,
      userRole: orderData.userRole || "customer",
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      discount: orderData.discount || 0,
      couponCode: orderData.couponCode,
      tax: orderData.tax || 0,
      shippingCost: orderData.shippingCost || 0,
      total: orderData.total || 0,
      status: "pending",
      shippingAddress: orderData.shippingAddress!,
      shippingMethod: orderData.shippingMethod || "standard",
      paymentMethod: orderData.paymentMethod || "credit_card",
      paymentStatus: orderData.paymentMethod === "cash_on_delivery" ? "unpaid" : "paid",
      prescriptionId: orderData.prescriptionId,
      timeline: [
        {
          status: "pending",
          timestamp: new Date().toISOString(),
          title: { ar: "تم تسجيل الطلب", en: "Order Placed" },
          description: {
            ar: "تم استلام الطلب وبانتظار التجهيز في المستودع الطبي",
            en: "Order received and queued for clinical fulfillment",
          },
        },
      ],
      notes: orderData.notes,
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    };

    // Deduct stock for items
    newOrder.items.forEach((item) => {
      const prod = this.products.find((p) => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return null;

    order.status = status;
    const titles: Record<OrderStatus, { ar: string; en: string }> = {
      pending: { ar: "قيد المراجعة", en: "Under Review" },
      confirmed: { ar: "تم تأكيد الطلب وجارِ التجهيز", en: "Confirmed & In Packing" },
      shipped: { ar: "خرج للشحن مع المندوب الطبي", en: "Shipped & Out for Delivery" },
      delivered: { ar: "تم تسليم الطلب بنجاح", en: "Successfully Delivered" },
      cancelled: { ar: "تم إلغاء الطلب", en: "Order Cancelled" },
      returned: { ar: "تم إرجاع الطلب للمستودع", en: "Order Returned" },
    };

    order.timeline.push({
      status,
      timestamp: new Date().toISOString(),
      title: titles[status],
      description: {
        ar: `تم تحديث حالة الشحنة إلى ${titles[status].ar}`,
        en: `Shipment status updated to ${titles[status].en}`,
      },
    });

    return order;
  }

  // Prescriptions
  getPrescriptions(): Prescription[] {
    return [...this.prescriptions];
  }

  createPrescription(data: Partial<Prescription>): Prescription {
    const id = `rx-${Date.now()}`;
    const prescriptionNumber = `RX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPrescription: Prescription = {
      id,
      prescriptionNumber,
      userId: data.userId || "usr-customer-1",
      patientName: data.patientName || "Patient Name",
      patientPhone: data.patientPhone || "+20 100 000 0000",
      patientNationalId: data.patientNationalId,
      doctorName: data.doctorName || "Dr. Medical Provider",
      doctorLicenseNumber: data.doctorLicenseNumber,
      clinicOrHospital: data.clinicOrHospital,
      fileUrl: data.fileUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      fileName: data.fileName || "prescription_upload.pdf",
      fileSize: data.fileSize || "1.2 MB",
      issueDate: data.issueDate || new Date().toISOString().split("T")[0],
      status: "pending",
      notes: data.notes,
      associatedProducts: data.associatedProducts || [],
      createdAt: new Date().toISOString(),
    };

    this.prescriptions.unshift(newPrescription);
    return newPrescription;
  }

  updatePrescriptionStatus(
    id: string,
    status: PrescriptionStatus,
    reason?: string
  ): Prescription | null {
    const rx = this.prescriptions.find((p) => p.id === id);
    if (!rx) return null;

    rx.status = status;
    rx.reviewedBy = "Dr. Tarek Mansour (Head Pharmacist)";
    rx.reviewedAt = new Date().toISOString();
    if (reason) rx.rejectionReason = reason;

    return rx;
  }

  // RFQ
  getRFQs(): RFQRequest[] {
    return [...this.rfqs];
  }

  createRFQ(data: Partial<RFQRequest>): RFQRequest {
    const id = `rfq-${Date.now()}`;
    const rfqNumber = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRFQ: RFQRequest = {
      id,
      rfqNumber,
      userId: data.userId,
      organizationName: data.organizationName || "Healthcare Provider",
      organizationType: data.organizationType || "clinic",
      commercialRegistrationNumber: data.commercialRegistrationNumber || "CR-12345",
      contactPerson: data.contactPerson || "Contact Person",
      email: data.email || "info@healthcare.org",
      phone: data.phone || "+20 100 000 0000",
      city: data.city || "Cairo",
      items: data.items || [],
      requiredDeliveryDate: data.requiredDeliveryDate || "2025-01-01",
      notes: data.notes,
      status: "submitted",
      createdAt: new Date().toISOString(),
    };

    this.rfqs.unshift(newRFQ);
    return newRFQ;
  }

  // Admin Dashboard Statistics
  getAdminStats(): AdminStatsResponse {
    const totalRevenue = this.orders.reduce(
      (acc, ord) => (ord.status !== "cancelled" ? acc + ord.total : acc),
      0
    );
    const totalOrders = this.orders.length;
    const activeWholesaleAccounts = this.users.filter(
      (u) => u.role === "wholesale" && u.wholesaleStatus === "verified"
    ).length;
    const pendingPrescriptions = this.prescriptions.filter(
      (p) => p.status === "pending"
    ).length;

    // Check low stock and expiring items
    const lowStockItemsCount = this.products.filter((p) => p.stock < 20).length;
    const now = new Date();
    const expiringItemsCount = this.products.filter((p) => {
      const exp = new Date(p.expiryDate);
      const diffDays = Math.ceil(
        (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffDays <= 90;
    }).length;

    const revenueChart = [
      { month: "مايو", revenue: 145000, orders: 42 },
      { month: "يونيو", revenue: 198000, orders: 58 },
      { month: "يوليو", revenue: 235000, orders: 71 },
      { month: "أغسطس", revenue: 310000, orders: 89 },
      { month: "سبتمبر", revenue: 385000, orders: 114 },
      { month: "أكتوبر", revenue: 472000, orders: 138 },
    ];

    const orderStatusDistribution = [
      { name: "تم التسليم", value: this.orders.filter((o) => o.status === "delivered").length, color: "#10B981" },
      { name: "قيد الشحن", value: this.orders.filter((o) => o.status === "shipped").length, color: "#06B6D4" },
      { name: "مؤكد / تجهيز", value: this.orders.filter((o) => o.status === "confirmed").length, color: "#0D9488" },
      { name: "قيد المراجعة", value: this.orders.filter((o) => o.status === "pending").length, color: "#F59E0B" },
      { name: "ملغي", value: this.orders.filter((o) => o.status === "cancelled").length, color: "#EF4444" },
    ];

    const topSellingProducts = this.products.slice(0, 5).map((p, idx) => ({
      product: p,
      soldCount: 140 - idx * 22,
      totalRevenue: (140 - idx * 22) * p.price,
    }));

    return {
      totalRevenue,
      revenueGrowthMoM: 18.4,
      totalOrders,
      ordersGrowthMoM: 12.5,
      activeWholesaleAccounts: Math.max(activeWholesaleAccounts, 34),
      pendingPrescriptions,
      lowStockItemsCount,
      expiringItemsCount,
      revenueChart,
      orderStatusDistribution,
      recentOrders: this.orders.slice(0, 5),
      topSellingProducts,
    };
  }

  // Users & Wholesale Management
  getUsers(): User[] {
    return [...this.users];
  }

  updateUserWholesaleStatus(
    userId: string,
    status: "verified" | "rejected" | "pending"
  ): User | null {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return null;
    user.wholesaleStatus = status;
    return user;
  }

  // Coupons
  private coupons = [
    {
      code: "CURE10",
      discountPercentage: 10,
      description: "خصم 10% لجميع العملاء بمناسبة التدشين",
      minOrderAmount: 300,
      usageCount: 142,
      maxUses: 500,
      expiresAt: "2026-12-31",
      active: true,
    },
    {
      code: "BULK20",
      discountPercentage: 20,
      description: "خصم حصري للطلبات الطبية المجمعة فوق 5000 ج.م",
      minOrderAmount: 5000,
      usageCount: 38,
      maxUses: 100,
      expiresAt: "2026-11-30",
      active: true,
    },
    {
      code: "FREESHIP",
      discountPercentage: 0,
      freeShipping: true,
      description: "شحن قياسي مجاني للطلبيات فوق 1000 ج.م",
      minOrderAmount: 1000,
      usageCount: 89,
      maxUses: 300,
      expiresAt: "2026-12-15",
      active: true,
    },
    {
      code: "CLINIC15",
      discountPercentage: 15,
      description: "خصم خاص للعيادات والمراكز الطبية المعتمدة",
      minOrderAmount: 2000,
      usageCount: 24,
      maxUses: 200,
      expiresAt: "2026-12-31",
      active: true,
    },
  ];

  getCoupons() {
    return [...this.coupons];
  }

  createCoupon(coupon: any) {
    this.coupons.unshift(coupon);
    return coupon;
  }

  toggleCouponActive(code: string) {
    const c = this.coupons.find((item) => item.code === code);
    if (c) c.active = !c.active;
    return c;
  }

  deleteCoupon(code: string) {
    this.coupons = this.coupons.filter((c) => c.code !== code);
    return true;
  }

  // Reviews Moderation
  private reviews = [
    {
      id: "rev-1",
      productName: "سماعة طبيب رقمية ماستر كارديولوجي - 3M Littmann",
      productId: "prod-3m-littmann-stethoscope",
      authorName: "د. أحمد سامي - استشاري قلب",
      rating: 5,
      comment: "دقة استماع استثنائية ونقاء صوت لا يضاهى في فحص أصوات الصمامات الدقيقة. ممتازة في العناية المركزة.",
      status: "approved" as const,
      createdAt: "2024-03-24T10:00:00Z",
    },
    {
      id: "rev-2",
      productName: "جهاز قياس ضغط الدم الرقمي الاحترافي M3 Comfort - Omron",
      productId: "prod-omron-m3-comfort",
      authorName: "مروة حسن",
      rating: 5,
      comment: "سوار القياس سهل الاستخدام جداً ومريح لكبار السن، والقراءات دقيقة مقارنة بالجهاز الزئبقي بالمستشفى.",
      status: "approved" as const,
      createdAt: "2024-03-25T14:30:00Z",
    },
    {
      id: "rev-3",
      productName: "قفازات فحص طبية من النتريل خالية من البودرة - B. Braun",
      productId: "prod-bbraun-nitrile-gloves",
      authorName: "مشتريات عيادات الشفاء",
      rating: 4,
      comment: "جودة ممتازة ومقاومة عالية للتمزق، نتمنى توفير مقاس XL بكميات أكبر دائماً.",
      status: "pending" as const,
      createdAt: "2024-03-28T09:15:00Z",
    },
    {
      id: "rev-4",
      productName: "مشرط جراحي معقم مع مقبض كربوني مقاس 11 - Swann-Morton",
      productId: "prod-swann-scalpel-11",
      authorName: "د. طارق مصطفى - جراحة عامة",
      rating: 5,
      comment: "شفرة فائقة الحدة، التغليف المعقم عالي الكفاءة وسهل الفتح في بيئة العمليات.",
      status: "approved" as const,
      createdAt: "2024-03-29T16:40:00Z",
    },
  ];

  getReviews() {
    return [...this.reviews];
  }

  updateReviewStatus(id: string, status: "approved" | "rejected") {
    const rev = this.reviews.find((r) => r.id === id);
    if (rev) rev.status = status;
    return rev;
  }
}

// Global Singleton for mock database
export const mockDb = new MockDatabase();

