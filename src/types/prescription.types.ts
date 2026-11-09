export type PrescriptionStatus = "pending" | "approved" | "rejected";

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  userId: string;
  patientName: string;
  patientPhone: string;
  patientNationalId?: string;
  doctorName: string;
  doctorLicenseNumber?: string;
  clinicOrHospital?: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  issueDate: string;
  status: PrescriptionStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  associatedProducts?: string[]; // Product IDs
  createdAt: string;
}
