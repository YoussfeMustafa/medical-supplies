"use client";

import React from "react";
import { useTranslation } from "@/i18n/provider";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const toggleLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    setLocale(nextLocale);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="min-h-11 flex items-center gap-1.5 px-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400"
      title={locale === "ar" ? "Switch to English" : "التحويل إلى العربية"}
    >
      <Globe className="h-4 w-4 text-teal-600" />
      <span>{locale === "ar" ? "English" : "العربية"}</span>
    </Button>
  );
}
