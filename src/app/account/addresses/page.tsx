"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/stores/use-auth-store";
import { useTranslation } from "@/i18n/provider";
import { Address } from "@/types/user.types";
import { MapPin, Plus, Trash2, CheckCircle2, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AccountAddressesPage() {
  const { user, updateProfile } = useAuthStore();
  const { locale } = useTranslation();

  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || []);
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState("العيادة الرئيسية");
  const [recipientName, setRecipientName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [building, setBuilding] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("القاهرة");
  const [governorate, setGovernorate] = useState("القاهرة");

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      title,
      recipientName,
      phone,
      building,
      street,
      city,
      governorate,
      isDefault: addresses.length === 0,
    };

    const updated = [...addresses, newAddr];
    setAddresses(updated);
    updateProfile({ addresses: updated });
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    updateProfile({ addresses: updated });
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    updateProfile({ addresses: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            عناوين التوصيل والعيادات المسجلة ({addresses.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            إدارة وجهات تسليم الشحنات الطبية وسيارات سلسلة التبريد.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          variant="medical"
          size="sm"
          className="min-h-11 shrink-0 text-xs gap-1.5 font-semibold"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>إضافة عنوان جديد</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`rounded-2xl border p-5 bg-white dark:bg-slate-900 space-y-3 transition-all ${
              addr.isDefault
                ? "border-teal-500 ring-2 ring-teal-500/20 shadow-md"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-600" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {addr.title}
                </h4>
              </div>
              {addr.isDefault && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-200">
                  <CheckCircle2 className="h-3 w-3 text-teal-600" />
                  <span>العنوان الافتراضي</span>
                </span>
              )}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                المستلم: {addr.recipientName} ({addr.phone})
              </p>
              <p>
                {addr.building}، {addr.street}
              </p>
              <p>
                {addr.city}، {addr.governorate}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              {!addr.isDefault && (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                    className="min-h-11 font-semibold text-teal-700 dark:text-teal-400 hover:underline"
                >
                  تعيين كافتراضي
                </button>
              )}
              <button
                onClick={() => handleDelete(addr.id)}
                className="min-h-11 min-w-11 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors ms-auto p-1"
                title="حذف العنوان"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة عنوان توصيل جديد</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddAddress} className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold block mb-1">اسم العنوان *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: مستودع المعمل / عيادة التجمع"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold block mb-1">اسم المستلم *</label>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="الاسم"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">رقم الهاتف *</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010..."
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">المبنى / العمارة / رقم العيادة *</label>
              <Input
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="برج الأطباء - عيادة 4"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">الشارع والحي *</label>
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="شارع مصطفى النحاس"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold block mb-1">المدينة *</label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="القاهرة"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1">المحافظة *</label>
                <Input
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  placeholder="القاهرة"
                  required
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                إلغاء
              </Button>
              <Button type="submit" variant="medical" size="sm">
                حفظ العنوان
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
