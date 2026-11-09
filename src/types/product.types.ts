export type ProductCategorySlug =
  | "personal-protective-equipment"
  | "diagnostic-equipment"
  | "surgical-consumables"
  | "mobility-rehabilitation"
  | "diabetes-care"
  | "respiratory-care"
  | "first-aid-emergency"
  | "hospital-furniture"
  | "sterilization-disinfection"
  | "dental-supplies"
  | "mother-child-care"
  | "laboratory-supplies";

export interface BulkPricingTier {
  minQuantity: number;
  discountPercentage: number;
  unitPrice: number;
}

export interface ProductVariant {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  sku: string;
  priceDelta: number;
  stock: number;
}

export interface ProductSpecification {
  key: {
    en: string;
    ar: string;
  };
  value: {
    en: string;
    ar: string;
  };
}

export interface ProductReview {
  id: string;
  userName: string;
  userType: "individual" | "clinic" | "hospital";
  rating: number; // 1 to 5
  date: string;
  comment: {
    en: string;
    ar: string;
  };
  verifiedPurchase: boolean;
}

export interface MedicalCertification {
  name: string; // "CE", "FDA", "ISO 13485", "SFDA"
  issuedBy: string;
  validUntil: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  barcode: string;
  name: {
    en: string;
    ar: string;
  };
  shortDescription: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  categorySlug: ProductCategorySlug;
  brand: string;
  price: number;
  originalPrice?: number;
  wholesalePrice: number;
  bulkTiers: BulkPricingTier[];
  images: string[];
  stock: number;
  minOrderQuantity: number;
  requiresPrescription: boolean;
  isSterile: boolean;
  lotNumber: string;
  expiryDate: string; // ISO string e.g. "2027-05-31"
  storageCondition: {
    en: string;
    ar: string;
  };
  certifications: MedicalCertification[];
  variants?: ProductVariant[];
  specifications: ProductSpecification[];
  usageInstructions: {
    en: string;
    ar: string;
  };
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  featured?: boolean;
  bestSeller?: boolean;
  onSale?: boolean;
  tags: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  slug: ProductCategorySlug;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image: string;
  iconName: string;
  productCount: number;
  featured?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  country: string;
  productCount: number;
}
