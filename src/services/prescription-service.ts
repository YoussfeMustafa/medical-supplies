import { Prescription, PrescriptionStatus } from "@/types/prescription.types";
import { mockDb } from "./mock-db";

export class PrescriptionService {
  async getPrescriptions(): Promise<Prescription[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockDb.getPrescriptions();
  }

  async uploadPrescription(data: Partial<Prescription>): Promise<Prescription> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return mockDb.createPrescription(data);
  }

  async reviewPrescription(
    id: string,
    status: PrescriptionStatus,
    reason?: string
  ): Promise<Prescription> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const updated = mockDb.updatePrescriptionStatus(id, status, reason);
    if (!updated) throw new Error("Prescription not found");
    return updated;
  }
}

export const prescriptionService = new PrescriptionService();
