"use client";

import React, { useState } from "react";
import { useTranslation } from "@/i18n/provider";
import { rfqService } from "@/services/rfq-service";
import { RFQItem } from "@/types/rfq.types";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import { rfqSchema } from "@/lib/validations";
import {
  FileSpreadsheet,
  Building2,
  Plus,
  Trash2,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function RFQPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [orgName, setOrgName] = useState(
    user?.organizationName || "مستشفى الأمل التخصصي"
  );
  const [orgType, setOrgType] = useState<
    "hospital" | "clinic" | "pharmacy" | "government" | "distributor"
  >("hospital");
  const [crNumber, setCrNumber] = useState(
    user?.taxRegistrationNumber || "CR-44910-EGY"
  );
  const [contactPerson, setContactPerson] = useState(
    user?.name || "د. أيمن رضوان"
  );
  const [email, setEmail] = useState(user?.email || "procurement@hospital.org");
  const [phone, setPhone] = useState(user?.phone || "+20 101 222 8899");
  const [city, setCity] = useState("القاهرة");
  const [deliveryDate, setDeliveryDate] = useState("2024-12-15");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<RFQItem[]>([
    {
      id: "1",
      productName: "سرير عناية مركزة كهربائي 5 حركات",
      sku: "MED-FUR-001",
      quantity: 10,
      unit: "unit",
      targetUnitPrice: 38000,
      specifications: "محركات Linak دنماركية وضمان شامل",
    },
    {
      id: "2",
      productName: "قفازات فحص طبية نيتريل زرقاء (علبة 100)",
      sku: "MED-PPE-001",
      quantity: 200,
      unit: "box",
      targetUnitPrice: 140,
      specifications: "مقاس وسط ولارج خالي من البودرة",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRfqNumber, setSubmittedRfqNumber] = useState<string | null>(
    null
  );

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        productName: "",
        quantity: 10,
        unit: "box",
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof RFQItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = rfqSchema.safeParse({
      organizationName: orgName,
      organizationType: orgType,
      commercialRegistrationNumber: crNumber,
      contactPerson,
      email,
      phone,
      city,
      requiredDeliveryDate: deliveryDate,
      notes,
    });

    if (!validation.success) {
      addToast({
        title: "بيانات ناقصة",
        description: validation.error.errors[0]?.message || "يرجى تعبئة الحقول",
        type: "error",
      });
      return;
    }

    if (items.some((i) => !i.productName || i.quantity <= 0)) {
      addToast({
        title: "قائمة الأصناف غير مكتملة",
        description: "يرجى كتابة اسم الصنف والكمية المطلوبة لكل بند",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const rfq = await rfqService.submitRFQ({
        organizationName: orgName,
        organizationType: orgType,
        commercialRegistrationNumber: crNumber,
        contactPerson,
        email,
        phone,
        city,
        items,
        requiredDeliveryDate: deliveryDate,
        notes,
      });

      setSubmittedRfqNumber(rfq.rfqNumber);
      addToast({
        title: "تم استلام طلب التسعير بنجاح",
        description: `رقم المناقصة: ${rfq.rfqNumber}`,
        type: "success",
      });
    } catch (err) {
      console.error("RFQ submission failed", err);
      addToast({
        title: "فشل الإرسال",
        description: "حدث خطأ أثناء معالجة الطلب",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-5xl">
      {/* Header */}
      <div className="text-start space-y-2 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200">
          <Building2 className="h-3.5 w-3.5" />
          <span>بوابة التوريدات والمناقصات الحكومية والخاصة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          طلب عرض أسعار وتوريد مستشفيات (RFQ / Tender Quote)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          نقدم للمستشفيات، المراكز الطبية، الصيدليات وسلاسل المعامل عروض أسعار رسمية بخصومات تجارية تصل إلى 30% مع شروط سداد ميسرة وفواتير ضريبية معتمدة.
        </p>
      </div>

      {submittedRfqNumber ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/30 p-8 sm:p-12 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            تم تسجيل طلب التسعير بنجاح برقم {submittedRfqNumber}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            سيقوم فريق المبيعات المؤسسية والتوريدات الطبية بمراجعة قائمة الأصناف وإرسال عرض السعر الفني والمالي المعتمد إلى بريدك الإلكتروني خلال 24 ساعة عمل.
          </p>
          <div className="pt-2">
            <Button
              onClick={() => setSubmittedRfqNumber(null)}
              variant="outline"
              size="sm"
            >
              تقديم طلب تسعير جديد
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Organization Data */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              1. بيانات المنشأة الطبية وجهة الاتصال
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold block mb-1">
                  اسم المستشفى / المركز الطبي *
                </label>
                <Input
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="مستشفى دار الشفاء التخصصي"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">
                  نوع المنشأة *
                </label>
                <Select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value as any)}
                >
                  <option value="hospital">مستشفى عام / خاص</option>
                  <option value="clinic">مجمع عيادات تخصصية</option>
                  <option value="pharmacy">سلسلة صيدليات</option>
                  <option value="government">جهة حكومية / تأمين صحي</option>
                  <option value="distributor">موزع ومورد طبي</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold block mb-1">
                  رقم السجل التجاري / البطاقة الضريبية *
                </label>
                <Input
                  value={crNumber}
                  onChange={(e) => setCrNumber(e.target.value)}
                  placeholder="CR-12048-EGY"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">
                  مسؤول المشتريات / الاتصال *
                </label>
                <Input
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="د. أحمد مصطفى"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">
                  المدينة / المحافظة *
                </label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="القاهرة"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold block mb-1">
                  البريد الإلكتروني المؤسسي *
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="procurement@hospital.org"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">
                  رقم هاتف مسؤول التوريد *
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 123 4567"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">
                  تاريخ التوريد المطلوب *
                </label>
                <Input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Items Multi-row table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="min-w-0 font-bold text-base text-slate-900 dark:text-white">
                2. قائمة الأصناف والمعدات الطبية المطلوبة ({items.length})
              </h3>
              <Button
                type="button"
                onClick={handleAddItem}
                variant="outline"
                size="sm"
                className="min-h-11 shrink-0 text-xs font-semibold"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>إضافة بند جديد</span>
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-5">
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                        اسم الصنف / الجهاز الطبي *
                      </label>
                      <Input
                        value={item.productName}
                        onChange={(e) =>
                          handleItemChange(item.id, "productName", e.target.value)
                        }
                        placeholder="مثال: سرير عناية مركزة 5 حركات"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                        كود SKU (إن وجد)
                      </label>
                      <Input
                        value={item.sku || ""}
                        onChange={(e) =>
                          handleItemChange(item.id, "sku", e.target.value)
                        }
                        placeholder="MED-FUR-001"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                        الكمية المطلوبة *
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                        الوحدة
                      </label>
                      <Select
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(item.id, "unit", e.target.value)
                        }
                      >
                        <option value="unit">قطعة / جهاز</option>
                        <option value="box">علبة</option>
                        <option value="carton">كرتونة</option>
                        <option value="pack">مجموعة (Pack)</option>
                      </Select>
                    </div>

                    <div className="sm:col-span-1 text-center pt-5">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={items.length <= 1}
                        className="text-slate-400 hover:text-rose-600 disabled:opacity-30 p-2"
                        title="حذف البند"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <Input
                      value={item.specifications || ""}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          "specifications",
                          e.target.value
                        )
                      }
                      placeholder="مواصفات إضافية (الماركة المفضلة، مدة الضمان المطلوبة، المعايير الفنية)..."
                      className="text-xs h-9 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Notes & Submit */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              3. شروط التوريد والملاحظات التعاقدية
            </h3>

            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي اشتراطات خاصة بالدفع (شيكات بنكية / تحويلات)، مواعيد التسليم بالأدوار، أو استلام سلسلة التبريد..."
              rows={3}
            />

            <Button
              type="submit"
              variant="medical"
              size="lg"
              disabled={isSubmitting}
              className="w-full text-sm font-bold shadow-lg shadow-teal-600/20 h-12"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جارِ تسجيل المناقصة وإرسالها لإدارة التسعير...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>إرسال طلب التسعير الرسمي (RFQ)</span>
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
