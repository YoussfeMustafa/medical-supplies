export type RFQStatus = "submitted" | "under_review" | "quoted" | "accepted" | "declined";

export interface RFQItem {
  id: string;
  productName: string;
  sku?: string;
  quantity: number;
  unit: string; // "box", "carton", "unit", "pack"
  targetUnitPrice?: number;
  specifications?: string;
}

export interface RFQRequest {
  id: string;
  rfqNumber: string;
  userId?: string;
  organizationName: string;
  organizationType: "hospital" | "clinic" | "pharmacy" | "government" | "distributor";
  commercialRegistrationNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  items: RFQItem[];
  requiredDeliveryDate: string;
  tenderDocumentUrl?: string;
  notes?: string;
  status: RFQStatus;
  quotedTotal?: number;
  adminNotes?: string;
  createdAt: string;
}
