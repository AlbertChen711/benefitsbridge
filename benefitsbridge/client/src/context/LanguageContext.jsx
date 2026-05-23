import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n';

const LanguageContext = createContext(null);

const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  vi: 'Tiếng Việt',
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage for saved language preference
    const saved = localStorage.getItem('language');
    if (saved && SUPPORTED_LANGUAGES[saved]) {
      return saved;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGUAGES[browserLang]) {
      return browserLang;
    }

    // Default to English
    return 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key, defaultValue = key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }

    return value || translations['en'][key] || defaultValue;
  };

  const changeLanguage = (newLanguage) => {
    if (SUPPORTED_LANGUAGES[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
