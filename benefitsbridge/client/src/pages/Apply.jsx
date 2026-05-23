import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ApplyWizard from '../components/Apply/ApplyWizard';

export default function Apply() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-fraunces font-bold mb-6">{t('application.title')}</h1>

        <ApplyWizard />
      </div>
    </div>
  );
}
