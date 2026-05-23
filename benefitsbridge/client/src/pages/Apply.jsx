import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Apply() {
  const { t } = useLanguage();
  const [step, setStep] = React.useState(0);

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('application.title')}</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-center text-neutral-600 text-lg mb-8">
            {t('application.personalInfo')} - Step 1 of 7
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2 text-neutral-900">
                {t('application.fullName')}
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-neutral-900">
                {t('application.dateOfBirth')}
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-neutral-900">
                {t('application.socialSecurity')}
              </label>
              <input
                type="text"
                placeholder="XXX-XX-XXXX"
                className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-4 mb-6">
              <p className="text-neutral-700 text-sm">
                💡 We ask for this to verify your identity with the state. Your SSN is secure and encrypted.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 py-4 bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold rounded-lg"
              >
                {t('application.save')}
              </button>
              <button
                type="button"
                className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg"
              >
                Next Step
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-600">
          <svg className="w-4 h-4 text-success-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M19.8 16.2a1 1 0 01-1.4 0l-9.7-9.7-3.3 3.3a1 1 0 01-1.4-1.4l4.7-4.7a1 1 0 011.4 0l11.1 11.1a1 1 0 010 1.4z" />
          </svg>
          {t('application.saveIndicator')}
        </div>
      </div>
    </div>
  );
}
