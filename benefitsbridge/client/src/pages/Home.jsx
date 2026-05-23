import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 leading-tight">
            {t('home.headline')}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('home.subheadline')}
          </p>
          <button
            onClick={() => navigate('/screener')}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold rounded-lg shadow-lg transition transform hover:scale-105 min-w-48"
          >
            {t('home.cta')}
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-neutral-900">
            {t('home.howItWorks')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                {t('home.step1')}
              </h3>
              <p className="text-neutral-700 text-lg">
                {t('home.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✏️</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                {t('home.step2')}
              </h3>
              <p className="text-neutral-700 text-lg">
                {t('home.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                {t('home.step3')}
              </h3>
              <p className="text-neutral-700 text-lg">
                {t('home.step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What CalFresh Covers Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-neutral-900">
            {t('home.benefits')}
          </h2>
          <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-8 md:p-12">
            <p className="text-2xl text-neutral-800 mb-6">
              {t('home.benefitsDesc')}
            </p>
            <ul className="space-y-4 text-lg text-neutral-700">
              <li className="flex items-center gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                Groceries and fresh produce
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                Farmers market purchases
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                Online grocery retailers
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                Participating stores statewide
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 px-4 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-neutral-900">
            {t('home.trust')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <p className="text-lg text-neutral-700">
                {t('home.trustSecure')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-lg text-neutral-700">
                {t('home.trustPartner')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <p className="text-lg text-neutral-700">
                {t('home.trustPrivacy')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-primary-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get the help you deserve?
          </h2>
          <button
            onClick={() => navigate('/screener')}
            className="px-8 py-4 bg-white text-primary-600 text-lg font-bold rounded-lg shadow-lg transition transform hover:scale-105 min-w-48"
          >
            Start Now
          </button>
        </div>
      </section>
    </div>
  );
}
