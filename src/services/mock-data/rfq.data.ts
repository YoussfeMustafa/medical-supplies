import { RFQRequest } from "@/types/rfq.types";

export const mockRFQs: RFQRequest[] = [
  {
    id: "rfq-501",
    rfqNumber: "RFQ-2024-0051",
    userId: "usr-wholesale-1",
    organizationName: "مستشفى الأمل لجراحات القلب المفتوح",
    organizationType: "hospital",
    commercialRegistrationNumber: "CR-99210-CAIRO",
    contactPerson: "د. أيمن رضوان (مدير المشتريات الطبية)",
    email: "procurement@alamal-hospital.org",
    phone: "+20 101 222 8899",
    city: "القاهرة",
    items: [
      {
        id: "rfq-item-1",
        productName: "سرير عناية مركزة كهربائي 5 حركات مع خاصية CPR وميزان",
        sku: "MED-FUR-001",
        quantity: 12,
        unit: "unit",
        targetUnitPrice: 38000,
        specifications: "محركات Linak دنماركية وضمان شامل 3 سنوات",
      },
      {
        id: "rfq-item-2",
        productName: "خيوط جراحية ممتصة فايكريل مقاس 3-0 إيثيكون",
        sku: "MED-SUR-003",
        quantity: 100,
        unit: "box",
        targetUnitPrice: 1500,
        specifications: "تاريخ صلاحية لا يقل عن 3 سنوات",
      },
    ],
    requiredDeliveryDate: "2024-12-01",
    notes: "مناقصة توريد ربع سنوية لأقسام الرعاية المركزة والعمليات مع الدفع بشيكات حكومية.",
    status: "under_review",
    quotedTotal: 606000,
    adminNotes: "تم فحص السجل التجاري وجارِ إعداد عرض السعر الرسمي بتخفيض 18%.",
    createdAt: "2024-10-22T10:00:00Z",
  },
];
