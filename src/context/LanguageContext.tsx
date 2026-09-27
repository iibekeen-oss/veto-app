import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import {
  translations,
  Translations,
  getInitialLanguage,
  handleLanguageChange,
  t as translateHelper,
} from '../lib/i18n';

interface LanguageContextType {
  language: AppLanguage;
  currentLang: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  changeLanguage: (lang: AppLanguage) => void;
  handleLanguageChange: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  t: Translations;
  translate: (key: string, lang?: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<AppLanguage>(getInitialLanguage);

  // عند اختيار المستخدم للغة جديدة:
  const onLanguageChange = (newLang: AppLanguage) => {
    setCurrentLang(newLang);
    handleLanguageChange(newLang);
  };

  useEffect(() => {
    handleLanguageChange(currentLang);
  }, [currentLang]);

  const toggleLanguage = () => {
    const nextLang = currentLang === 'syr' ? 'en' : 'syr';
    onLanguageChange(nextLang);
  };

  const isRtl = currentLang === 'syr';
  const t = translations[currentLang] || translations.syr;

  return (
    <LanguageContext.Provider
      value={{
        language: currentLang,
        currentLang,
        setLanguage: onLanguageChange,
        changeLanguage: onLanguageChange,
        handleLanguageChange: onLanguageChange,
        toggleLanguage,
        t,
        translate: (key: string, lang?: string) => translateHelper(key, lang || currentLang),
        isRtl,
      }}
    >
      <div dir={isRtl ? 'rtl' : 'ltr'} className="w-full h-full">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
