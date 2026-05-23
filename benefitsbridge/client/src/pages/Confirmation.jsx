import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Confirmation() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-success-50 to-white py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-32 h-32 bg-success-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-7xl">✓</span>
          </div>
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">
            {t('confirmation.congratulations')}!
          </h1>
          <p className="text-2xl text-success-600 font-semibold mb-8">
            Your application has been submitted
          </p>
        </div>

        <div className="bg-white border-2 border-success-200 rounded-lg p-8 mb-10">
          <p className="text-neutral-600 text-lg mb-3">Your reference number:</p>
          <p className="text-4xl font-bold text-primary-600 font-mono mb-6">
            CB-2024-1234567
          </p>
          <p className="text-neutral-600 text-sm">
            Save this number to track your application status
          </p>
        </div>

        <div className="bg-neutral-50 border-2 border-neutral-200 rounded-lg p-8 mb-10 text-left">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            {t('confirmation.nextSteps')}
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white font-bold rounded-full flex-shrink-0">
                1
              </span>
              <div className="text-left">
                <p className="font-semibold text-neutral-900 text-lg">
                  {t('confirmation.step1')}
                </p>
                <p className="text-neutral-600">Usually within 3-5 business days</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white font-bold rounded-full flex-shrink-0">
                2
              </span>
              <div className="text-left">
                <p className="font-semibold text-neutral-900 text-lg">
                  {t('confirmation.step2')}
                </p>
                <p className="text-neutral-600">You'll get a decision by phone, email, or mail</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white font-bold rounded-full flex-shrink-0">
                3
              </span>
              <div className="text-left">
                <p className="font-semibold text-neutral-900 text-lg">
                  {t('confirmation.step3')}
                </p>
                <p className="text-neutral-600">You'll receive an EBT card by mail</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600 rounded" />
            <span className="text-neutral-800 font-medium">
              {t('confirmation.enableNotifications')}
            </span>
          </label>

          <Link
            to="/status"
            className="block w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-lg transition"
          >
            {t('confirmation.trackStatus')}
          </Link>

          <Link
            to="/"
            className="block w-full py-4 bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold text-lg rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
