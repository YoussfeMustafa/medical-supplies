import { RFQRequest } from "@/types/rfq.types";
import { mockDb } from "./mock-db";

export class RFQService {
  async getRFQs(): Promise<RFQRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockDb.getRFQs();
  }

  async submitRFQ(data: Partial<RFQRequest>): Promise<RFQRequest> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return mockDb.createRFQ(data);
  }
}

export const rfqService = new RFQService();
