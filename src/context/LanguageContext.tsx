import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import { translations, Translations, getInitialLanguage, changeLanguage } from '../lib/i18n';

interface LanguageContextType {
  language: AppLanguage;
  currentLang: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  changeLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(getInitialLanguage);

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  const handleSetLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const nextLang = (language === 'syr' || language === 'ar') ? 'en' : 'syr';
    handleSetLanguage(nextLang);
  };

  const isRtl = language === 'syr' || language === 'ar';
  const t = translations[language] || translations.syr;

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLang: language,
        setLanguage: handleSetLanguage,
        changeLanguage: handleSetLanguage,
        toggleLanguage,
        t,
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
