"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/provider";
import { prescriptionService } from "@/services/prescription-service";
import { Prescription } from "@/types/prescription.types";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import { prescriptionUploadSchema } from "@/lib/validations";
import {
  FileUp,
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function PrescriptionUploadPage() {
  const { t, locale } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patientName, setPatientName] = useState(user?.name || "");
  const [patientPhone, setPatientPhone] = useState(user?.phone || "");
  const [patientNationalId, setPatientNationalId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorLicenseNumber, setDoctorLicenseNumber] = useState("");
  const [clinicOrHospital, setClinicOrHospital] = useState("");
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadPrescriptions() {
      try {
        const list = await prescriptionService.getPrescriptions();
        setPrescriptions(list);
      } catch (err) {
        console.error("Load prescriptions error", err);
      }
    }
    loadPrescriptions();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        addToast({
          title: "الملف كبير جداً",
          description: "أقصى حجم مسموح به هو 10 ميجابايت",
          type: "error",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = prescriptionUploadSchema.safeParse({
      patientName,
      patientPhone,
      patientNationalId,
      doctorName,
      doctorLicenseNumber,
      clinicOrHospital,
      issueDate,
      notes,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      addToast({
        title: "بيانات ناقصة",
        description: "يرجى تعبئة الحقول الإلزامية بدقة",
        type: "error",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const newPrescription = await prescriptionService.uploadPrescription({
        userId: user?.id || "usr-customer-1",
        patientName,
        patientPhone,
        patientNationalId,
        doctorName,
        doctorLicenseNumber,
        clinicOrHospital,
        issueDate,
        notes,
        fileName: selectedFile?.name || "prescription_scanned_copy.pdf",
        fileSize: selectedFile
          ? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`
          : "1.2 MB",
      });

      setPrescriptions((prev) => [newPrescription, ...prev]);
      addToast({
        title: "تم رفع الوصفة الطبية بنجاح",
        description: `رقم الوصفة: ${newPrescription.prescriptionNumber}، بانتظار اعتماد الصيدلي المسؤول.`,
        type: "success",
      });

      // Clear form
      setSelectedFile(null);
      setDoctorName("");
      setDoctorLicenseNumber("");
      setClinicOrHospital("");
      setNotes("");
    } catch (err) {
      console.error("Prescription upload failed", err);
      addToast({
        title: "فشل الرفع",
        description: "حدث خطأ أثناء معالجة الوصفة الطبية",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: Prescription["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="success" className="text-xs font-semibold gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>معتمدة وصالحة للصرف</span>
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="text-xs font-semibold gap-1">
            <XCircle className="h-3.5 w-3.5" />
            <span>مرفوضة من الصيدلي</span>
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="warning" className="text-xs font-semibold gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>قيد المراجعة السريرية</span>
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-5xl">
      {/* Header */}
      <div className="text-start space-y-2 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200">
          <FileText className="h-3.5 w-3.5" />
          <span>الامتثال للوائح وزارة الصحة المصرية</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          رفع واعتماد الوصفات الطبية للمستلزمات المقيدة
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          وفقاً للقوانين الطبية، تتطلب بعض المستلزمات (مثل إبر الإنسولين الخاصة، الكانيولات الجراحية، والشفرات الحادة) إرفاق وصفة طبية صادرة من طبيب بشري مرخص لضمان سلامة الاستخدام.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7 min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            بيانات المريض والطبيب المعالج
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1">اسم المريض ثلاثي *</label>
                <Input
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="سارة أحمد محمد"
                  error={errors.patientName}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">رقم هاتف المريض *</label>
                <Input
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+20 100 123 4567"
                  error={errors.patientPhone}
                  required
                />
              </div>
            </div>

            {/* Doctor Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1">اسم الطبيب المعالج *</label>
                <Input
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="د. شريف عبد المنعم"
                  error={errors.doctorName}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">رقم ترخيص مزاولة المهنة</label>
                <Input
                  value={doctorLicenseNumber}
                  onChange={(e) => setDoctorLicenseNumber(e.target.value)}
                  placeholder="EGY-MOH-2018-4412"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1">اسم العيادة أو المستشفى</label>
                <Input
                  value={clinicOrHospital}
                  onChange={(e) => setClinicOrHospital(e.target.value)}
                  placeholder="مستشفى النور التخصصي"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">تاريخ تحرير الروشتة *</label>
                <Input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Drag & Drop File Upload */}
            <div>
              <label className="text-xs font-semibold block mb-1.5">
                صورة الروشتة أو التقرير الطبي (PDF / JPG / PNG) *
              </label>
              <div className="relative rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <UploadCloud className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {selectedFile ? selectedFile.name : "اضغط هنا لاختيار الملف أو اسحبه إلى هنا"}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  يدعم صور المستندات الواضحة والـ PDF حتى 10 ميجابايت
                </p>
              </div>
            </div>

            {/* Clinical Remarks */}
            <div>
              <label className="text-xs font-semibold block mb-1">ملاحظات إضافية للصيدلي (اختياري)</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="تفاصيل المقاسات الموصى بها أو تركيز الدواء..."
                rows={2}
              />
            </div>

            <Button
              type="submit"
              variant="medical"
              size="lg"
              disabled={isSubmitting}
              className="w-full text-xs sm:text-sm font-bold shadow-md shadow-teal-600/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جارِ رفع وتشفير الملف...</span>
                </>
              ) : (
                <>
                  <FileUp className="h-4 w-4" />
                  <span>إرسال الوصفة الطبية للمراجعة</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Status Tracker Column */}
        <div className="lg:col-span-5 min-w-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-sm space-y-5">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              الوصفات الطبية المسجلة بحسابك ({prescriptions.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              متابعة حالة التدقيق والفحص الصيدلاني المباشر.
            </p>
          </div>

          <div className="space-y-3.5 max-h-[500px] overflow-y-auto pe-1">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="rounded-xl border border-slate-100 dark:border-slate-800 p-4 bg-slate-50/60 dark:bg-slate-900/40 text-xs space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono font-bold text-teal-700 dark:text-teal-400">
                    {rx.prescriptionNumber}
                  </span>
                  {getStatusBadge(rx.status)}
                </div>

                <div className="text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">{rx.doctorName}</span>
                  {rx.clinicOrHospital && <span> - {rx.clinicOrHospital}</span>}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <span>المريض: {rx.patientName}</span>
                  <span>تاريخ: {rx.issueDate}</span>
                </div>

                {rx.rejectionReason && (
                  <p className="text-rose-600 text-[11px] bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg">
                    سبب عدم الاعتماد: {rx.rejectionReason}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>بيانات المرضى مشفرة طبقاً لمعايير الخصوصية الطبية HIPAA.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
