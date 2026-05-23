import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import CalculatorCard from '../components/Calculator/CalculatorCard';

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

      {/* Before vs After Comparison (BenefitsCal vs BenefitsBridge) */}
      <section className="py-12 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-neutral-100 p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-neutral-700 mb-4">❌ BenefitsCal.com</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>❌ Website crashes and loses your progress</li>
                <li>❌ 47-page form with no guidance</li>
                <li>❌ Legal jargon nobody understands</li>
                <li>❌ No status updates for weeks</li>
                <li>❌ Impossible to use on a phone</li>
                <li>❌ No help when you get stuck</li>
                <li>❌ Documents get rejected with no explanation</li>
                <li>❌ Miss deadlines with no warning</li>
              </ul>
            </div>

            <div className="bg-success-50 p-6 rounded-lg border border-success-100">
              <h3 className="text-xl font-semibold text-success-700 mb-4">✅ BenefitsBridge</h3>
              <ul className="space-y-2 text-neutral-800">
                <li>✅ Never loses your progress — auto-saves constantly</li>
                <li>✅ Simple step-by-step guidance</li>
                <li>✅ Plain language — no jargon anywhere</li>
                <li>✅ Real-time status tracker with SMS alerts</li>
                <li>✅ Designed for your smartphone</li>
                <li>✅ AI assistant answers questions instantly</li>
                <li>✅ Document check before submission</li>
                <li>✅ Deadline reminders sent automatically</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-neutral-700">Over $60 billion in benefits go unclaimed every year because systems like BenefitsCal are too broken to use. BenefitsBridge fixes that.</p>
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

      {/* Testimonials Section */}
      <section className="py-12 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What people are saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold mb-4">MG</div>
              <p className="text-neutral-700">"I tried applying on the government website three times and kept losing my progress. With BenefitsBridge I finished in 20 minutes on my phone during my lunch break."</p>
              <div className="mt-4 text-success-600 font-semibold">$768/month for family of 3</div>
              <div className="mt-2 text-sm text-neutral-600">Maria G., Los Angeles</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold mb-4">JT</div>
              <p className="text-neutral-700">"The AI assistant explained everything in plain English. I didn't even know I qualified until I used the screener. Now my family gets $536 a month."</p>
              <div className="mt-4 text-success-600 font-semibold">$536/month for family of 2</div>
              <div className="mt-2 text-sm text-neutral-600">James T., San Jose</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center font-bold mb-4">LP</div>
              <p className="text-neutral-700">"Finally a website that works in Vietnamese! I helped my whole family apply. The status tracker meant we always knew what was happening."</p>
              <div className="mt-4 text-success-600 font-semibold">$994/month for family of 4</div>
              <div className="mt-2 text-sm text-neutral-600">Linh P., San Diego</div>
            </div>
          </div>
        </div>
      </section>

      {/* Embed Calculator between How It Works and footer */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Estimate Your Monthly Benefit</h2>
          <div>
            <CalculatorCard />
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
