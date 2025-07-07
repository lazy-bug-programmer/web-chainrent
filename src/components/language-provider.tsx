"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.features": "Features",
    "nav.products": "Products",
    "nav.news": "News",
    "nav.metrics": "Metrics",
    "nav.roadmap": "Roadmap",
    "nav.about": "About",
    "nav.contact": "Contact",
    "hero.title": "Redefining Digital Asset",
    "hero.title.highlight": "Yield Distribution",
    "hero.description":
      "ChainRent is a blockchain-based asset yield distribution platform that enables users to earn stable, transparent, rule-based returns through participation in on-chain projects.",
    "hero.cta.primary": "Explore Platform",
    "hero.cta.secondary": "Learn More",
  },
  zh: {
    "nav.features": "特性",
    "nav.products": "产品",
    "nav.news": "新闻",
    "nav.metrics": "数据",
    "nav.roadmap": "路线图",
    "nav.about": "关于",
    "nav.contact": "联系",
    "hero.title": "重新定义数字资产",
    "hero.title.highlight": "收益分配",
    "hero.description":
      "ChainRent 是一个基于区块链的资产收益分配平台，允许用户通过参与链上项目获得稳定、透明、按规则分配的收益。",
    "hero.cta.primary": "探索平台",
    "hero.cta.secondary": "了解更多",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
