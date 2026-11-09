"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { useUIStore } from "@/stores/use-ui-store";
import { registerSchema } from "@/lib/validations";
import {
  Activity,
  User,
  Building2,
  Mail,
  Lock,
  Phone,
  FileCheck2,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { addToast } = useUIStore();

  const [accountType, setAccountType] = useState<"customer" | "wholesale">(
    "customer"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Wholesale specific
  const [orgName, setOrgName] = useState("");
  const [crNumber, setCrNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email);
      addToast({
        title: "تم إنشاء الحساب بنجاح",
        description:
          accountType === "wholesale"
            ? "تم تسجيل حساب المنشأة وجارِ مراجعة السجل التجاري لتفعيل كوتة الجملة."
            : "مرحباً بك في منصة كيورلاين الطبية.",
        type: "success",
      });
      router.push("/account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 max-w-lg">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md shadow-teal-500/20">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            إنشاء حساب جديد
          </h1>
          <p className="text-xs text-slate-400">
            انضم لمنظومة التوريدات والأجهزة الطبية المعتمدة
          </p>
        </div>

        {/* Account Type Tabs */}
        <Tabs
          defaultValue="customer"
          onValueChange={(val) => setAccountType(val as any)}
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="customer" className="text-xs font-bold gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span>أفراد / مريض</span>
            </TabsTrigger>
            <TabsTrigger value="wholesale" className="text-xs font-bold gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>عيادة / مستشفى (جملة)</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
              الاسم الكامل / مسؤول التوريد *
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="د. مصطفى كمال"
              icon={<User className="h-4 w-4" />}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
              البريد الإلكتروني *
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              icon={<Mail className="h-4 w-4" />}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
              رقم الهاتف للتواصل *
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+20 100 123 4567"
              icon={<Phone className="h-4 w-4" />}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
              كلمة المرور *
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              required
            />
          </div>

          {/* Wholesale B2B Additional Fields */}
          {accountType === "wholesale" && (
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in-0 duration-200">
              <div className="rounded-xl border border-teal-200 bg-teal-50/60 dark:bg-teal-950/30 p-3 text-xs text-teal-800 dark:text-teal-300">
                الحسابات المؤسسية تستفيد من خصومات الجملة المباشرة وإصدار الفواتير الضريبية.
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                  اسم المنشأة الطبية (المستشفى / المعمل / الصيدلية) *
                </label>
                <Input
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="مستشفى الشروق التخصصي"
                  icon={<Building2 className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    رقم السجل التجاري / الضريبي *
                  </label>
                  <Input
                    value={crNumber}
                    onChange={(e) => setCrNumber(e.target.value)}
                    placeholder="CR-19401"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1 text-slate-700 dark:text-slate-300">
                    ترخيص وزارة الصحة
                  </label>
                  <Input
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="MOH-8821"
                  />
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="medical"
            size="lg"
            disabled={isLoading}
            className="w-full text-xs sm:text-sm font-bold shadow-md shadow-teal-600/20"
          >
            {isLoading ? "جارِ إنشاء الحساب..." : "تأكيد وإنشاء الحساب"}
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          <span>لديك حساب بالفعل؟</span>{" "}
          <Link
            href="/auth/login"
            className="font-bold text-teal-700 dark:text-teal-400 hover:underline"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
