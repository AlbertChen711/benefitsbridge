import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Help() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-neutral-900">{t('help.title')}</h1>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-neutral-900">{t('help.faq')}</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What documents do I need?',
                a: 'You need proof of identity, address, income, and Social Security numbers for all household members.',
              },
              {
                q: 'How long does it take?',
                a: 'Decisions are usually made within 30 days of submitting your application.',
              },
              {
                q: 'Can I get retroactive benefits?',
                a: 'Yes, you may be eligible for benefits up to 30 days before you applied.',
              },
              {
                q: 'What can I buy with CalFresh?',
                a: 'You can buy fruits, vegetables, meat, grains, and other eligible food items.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white border-2 border-neutral-300 rounded-lg p-6 hover:border-primary-400 transition"
              >
                <summary className="text-lg font-bold text-neutral-900 cursor-pointer">
                  {faq.q}
                </summary>
                <p className="mt-4 text-neutral-700 text-lg">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-neutral-900">{t('help.contact')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-neutral-300 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">
                {t('help.helpline')}
              </h3>
              <p className="text-4xl font-bold text-primary-600 mb-4">
                1-877-847-3663
              </p>
              <p className="text-neutral-700">
                Available Monday-Friday, 8am-5pm PT
              </p>
            </div>

            <div className="bg-white border-2 border-neutral-300 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">
                {t('help.chatAssistant')}
              </h3>
              <p className="text-neutral-700 mb-4">
                Talk to our AI assistant anytime for instant answers
              </p>
              <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg">
                Open Chat
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
