import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const FAQ_DATA = [
  {
    q: 'Who can apply for CalFresh?',
    a: 'Most California residents with low to moderate income can apply, including working families, seniors, people with disabilities, and college students in some cases.',
  },
  {
    q: 'How much could I receive each month?',
    a: "Benefits depend on your household size and income. A single person can receive up to $292/month. A family of 4 can receive up to $994/month. Use our benefit calculator to get a personalized estimate.",
  },
  {
    q: 'How long does it take to get approved?',
    a: 'Most applications are processed within 30 days. If your household has very little or no income, you may qualify for expedited benefits within 3 business days.',
  },
  {
    q: 'What can I buy with my EBT card?',
    a: 'You can buy most groceries including fruits, vegetables, meat, dairy, bread, and cereals. You can also use it at many farmers markets and online at Amazon and Walmart. You cannot buy alcohol, tobacco, vitamins, or hot prepared foods.',
  },
  {
    q: 'Do I have to be a US citizen to apply?',
    a: "US citizens and many legal residents qualify for CalFresh. California also has the California Food Assistance Program (CFAP) for some immigrants who don't qualify for federal CalFresh. Apply anyway and we will help figure out your options.",
  },
  {
    q: 'Will applying affect my immigration status?',
    a: "CalFresh is not a public charge benefit as of current federal rules. Applying for CalFresh should not affect your immigration case. We recommend speaking with an immigration attorney if you have concerns.",
  },
  {
    q: 'What happens after I submit my application?',
    a: 'Your county office will review your application and may schedule a phone interview. They will make a decision within 30 days. If approved, you will receive an EBT card by mail within 7-10 days.',
  },
  {
    q: 'My application was denied. What can I do?',
    a: 'You have the right to appeal any decision within 90 days. You can request a state hearing by calling 1-800-952-5253. You can also reapply if your situation changes.',
  },
  {
    q: 'How often do I need to renew?',
    a: 'Most households must recertify every 12 months. You will receive a notice by mail before your certification period ends. BenefitsBridge will send you a reminder text 30 days before your renewal is due.',
  },
  {
    q: 'Can I apply if I am homeless?',
    a: "Yes. You do not need a permanent address to apply for CalFresh. You can use a shelter address, a social services office address, or describe your situation on the application.",
  },
];

export default function Faq() {
  const [query, setQuery] = React.useState('');
  const [openIndex, setOpenIndex] = React.useState(null);

  const filtered = FAQ_DATA.filter(item => (
    item.q.toLowerCase().includes(query.toLowerCase()) || item.a.toLowerCase().includes(query.toLowerCase())
  ));

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-fraunces font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-neutral-600 mb-6">Plain answers to common CalFresh questions</p>

        <div className="mb-6">
          <input
            placeholder="Search questions"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <div key={idx} className="bg-white border rounded-lg p-4">
              <button className="w-full text-left flex items-center justify-between" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
                <h3 className="text-lg font-medium">{item.q}</h3>
                <span className="text-neutral-500">{openIndex === idx ? '−' : '+'}</span>
              </button>
              {openIndex === idx && (
                <div className="mt-3 text-neutral-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-neutral-50 p-4 rounded-lg">
          <h4 className="font-semibold">Still have questions?</h4>
          <p className="text-neutral-600">Call the CalFresh helpline at <strong>1-877-847-3663</strong> or chat with our AI assistant.</p>
          <button className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg">Open AI Assistant</button>
        </div>
      </div>
    </div>
  );
}
