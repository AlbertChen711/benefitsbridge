import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Status() {
  const { t } = useLanguage();

  const stages = [
    { id: 'submitted', label: t('status.submitted'), date: '01/15/2024', completed: true },
    { id: 'review', label: t('status.underReview'), date: '01/20/2024', completed: false, current: true },
    { id: 'interview', label: t('status.interview'), date: '02/10/2024', completed: false },
    { id: 'pending', label: t('status.pending'), date: 'Est. 02/20/2024', completed: false },
    { id: 'approved', label: t('status.approved'), date: '', completed: false },
    { id: 'ebtMailed', label: t('status.ebtMailed'), date: '', completed: false },
    { id: 'active', label: t('status.benefitsActive'), date: '', completed: false },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{t('status.title')}</h1>
        <p className="text-neutral-600 text-lg mb-8">
          Reference: <span className="font-mono font-bold text-primary-600">CB-2024-1234567</span>
        </p>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div key={stage.id} className="relative">
                {/* Line between stages */}
                {index < stages.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 w-1 h-12 ${
                      stage.completed ? 'bg-success-600' : 'bg-neutral-300'
                    }`}
                  />
                )}

                {/* Stage dot and content */}
                <div className="flex gap-6">
                  {/* Dot */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white relative z-10 ${
                      stage.completed
                        ? 'bg-success-600'
                        : stage.current
                        ? 'bg-primary-600'
                        : 'bg-neutral-300'
                    }`}
                  >
                    {stage.completed ? '✓' : index + 1}
                  </div>

                  {/* Stage info */}
                  <div className="flex-1 py-2">
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        stage.current ? 'text-primary-700' : 'text-neutral-900'
                      }`}
                    >
                      {stage.label}
                    </h3>
                    {stage.date && (
                      <p className="text-neutral-600 text-sm">{stage.date}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status Info */}
        <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Your application is under review
          </h3>
          <p className="text-neutral-700 mb-4">
            An eligibility worker is reviewing your documents. This usually takes 5-10 business days.
          </p>
          <p className="text-neutral-600 text-sm">
            We'll contact you at (555) 000-0000 when we need more information.
          </p>
        </div>

        {/* Deadline Warning */}
        <div className="bg-warning-50 border-2 border-warning-300 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
            ⏰ Upcoming Deadline
          </h3>
          <p className="text-lg font-semibold text-warning-700 mb-2">
            Decision expected by February 20, 2024
          </p>
          <p className="text-warning-700">
            <span className="font-bold text-2xl">17 days</span> remaining
          </p>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-white border-2 border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
            <span className="text-lg text-neutral-800 font-medium">
              {t('status.notifications')}
            </span>
          </label>

          <button className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-lg">
            {t('status.contactCaseworker')}
          </button>
        </div>
      </div>
    </div>
  );
}
