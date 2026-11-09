export type UserRole = "customer" | "wholesale" | "admin";

export interface Address {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  building: string;
  street: string;
  city: string;
  governorate: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  // B2B Wholesale specific fields
  organizationName?: string;
  taxRegistrationNumber?: string;
  medicalLicenseNumber?: string;
  wholesaleStatus?: "pending" | "verified" | "rejected";
  commercialRegistryDocUrl?: string;
  addresses: Address[];
  createdAt: string;
}

export interface AuthSession {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
