import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { language, changeLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="relative dropdown">
      <button
        className="flex items-center gap-2 px-3 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition"
        aria-label={`Change language, currently ${supportedLanguages[language]}`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502 0l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
          />
        </svg>
        <span className="text-sm font-medium hidden sm:inline">
          {supportedLanguages[language]}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-42 bg-white rounded-lg shadow-lg border border-neutral-200 hidden group-hover:block hover:block z-50">
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            className={`w-full text-left px-4 py-3 hover:bg-primary-50 transition border-b border-neutral-100 last:border-b-0 font-medium
              ${language === code ? 'bg-primary-100 text-primary-700' : 'text-neutral-700'}
            `}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
