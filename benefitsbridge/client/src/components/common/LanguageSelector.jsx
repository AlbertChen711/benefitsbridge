import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const FLAGS = {
  en: '🇺🇸 English',
  es: '🇲🇽 Español',
  zh: '🇨🇳 中文',
  vi: '🇻🇳 Tiếng Việt',
};

export default function LanguageSelector() {
  const { language, changeLanguage, supportedLanguages } = useLanguage();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition"
        aria-label={`Change language, currently ${supportedLanguages[language]}`}
      >
        <span className="text-lg">🌐</span>
        <span className="text-sm hidden md:inline">{supportedLanguages[language]}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
          {Object.entries(supportedLanguages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => { changeLanguage(code); setOpen(false); }}
              className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition border-b border-neutral-100 last:border-b-0 font-medium
                ${language === code ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'}
              `}
            >
              {FLAGS[code] || name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
