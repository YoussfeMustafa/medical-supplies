"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import arDict from "./dictionaries/ar.json";
import enDict from "./dictionaries/en.json";
import { Locale, defaultLocale, getDirection } from "./config";

type Dictionaries = typeof arDict;

interface TranslationContextType {
  locale: Locale;
  direction: "rtl" | "ltr";
  setLocale: (newLocale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const dictionaries: Record<Locale, Dictionaries> = {
  ar: arDict,
  en: enDict,
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Check localStorage for saved user language preference
    const saved = localStorage.getItem("cureline_locale") as Locale;
    if (saved && (saved === "ar" || saved === "en")) {
      setLocaleState(saved);
      document.documentElement.dir = getDirection(saved);
      document.documentElement.lang = saved;
    } else {
      document.documentElement.dir = getDirection(initialLocale);
      document.documentElement.lang = initialLocale;
    }
  }, [initialLocale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("cureline_locale", newLocale);
    document.documentElement.dir = getDirection(newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    const keys = keyPath.split(".");
    let current: any = dictionaries[locale];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to English if not found in current locale
        let fallback: any = dictionaries.en;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === "object" && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return keyPath;
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current !== "string") {
      return keyPath;
    }

    let result = current;
    if (params) {
      for (const [pKey, pVal] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{${pKey}\\}`, "g"), String(pVal));
      }
    }

    return result;
  };

  const direction = getDirection(locale);

  return (
    <TranslationContext.Provider value={{ locale, direction, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
