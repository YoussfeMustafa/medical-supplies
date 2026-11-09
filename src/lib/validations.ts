import { z } from "zod";

export const checkoutAddressSchema = z.object({
  recipientName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().regex(/^[0-9+() -]{10,15}$/, "Please enter a valid phone number"),
  building: z.string().min(1, "Building number / name is required"),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  governorate: z.string().min(2, "Governorate / Region is required"),
  postalCode: z.string().optional(),
  organizationName: z.string().optional(),
  taxRegistrationNumber: z.string().optional(),
  notes: z.string().optional(),
});

export const checkoutPaymentSchema = z.object({
  paymentMethod: z.enum(["credit_card", "cash_on_delivery", "bank_transfer"]),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

export const prescriptionUploadSchema = z.object({
  patientName: z.string().min(3, "Patient name must be at least 3 characters"),
  patientPhone: z.string().regex(/^[0-9+() -]{10,15}$/, "Please enter a valid phone number"),
  patientNationalId: z.string().optional(),
  doctorName: z.string().min(3, "Doctor name is required"),
  doctorLicenseNumber: z.string().optional(),
  clinicOrHospital: z.string().optional(),
  issueDate: z.string().min(1, "Prescription date is required"),
  notes: z.string().optional(),
  file: z.any().optional(),
});

export const rfqSchema = z.object({
  organizationName: z.string().min(3, "Organization / Hospital name is required"),
  organizationType: z.enum(["hospital", "clinic", "pharmacy", "government", "distributor"]),
  commercialRegistrationNumber: z.string().min(5, "Commercial registration / tax number is required"),
  contactPerson: z.string().min(3, "Contact person name is required"),
  email: z.string().email("Valid institutional email is required"),
  phone: z.string().regex(/^[0-9+() -]{10,15}$/, "Valid phone number is required"),
  city: z.string().min(2, "City is required"),
  requiredDeliveryDate: z.string().min(1, "Target delivery date is required"),
  notes: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().regex(/^[0-9+() -]{10,15}$/, "Valid phone number is required"),
  accountType: z.enum(["customer", "wholesale"]),
  // Wholesale specific
  organizationName: z.string().optional(),
  commercialRegistrationNumber: z.string().optional(),
  medicalLicenseNumber: z.string().optional(),
});

export type CheckoutAddressFormData = z.infer<typeof checkoutAddressSchema>;
export type CheckoutPaymentFormData = z.infer<typeof checkoutPaymentSchema>;
export type PrescriptionUploadFormData = z.infer<typeof prescriptionUploadSchema>;
export type RFQFormData = z.infer<typeof rfqSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
