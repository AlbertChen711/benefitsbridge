import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ProgressBar from '../components/common/ProgressBar';

export default function Documents() {
  const { t } = useLanguage();

  const documents = [
    {
      id: 'photoId',
      name: 'Photo ID',
      desc: 'Proves who you are',
      accepted: ['Driver\'s license', 'State ID card', 'Passport', 'Military ID'],
      howTo: 'Visit your local DMV with proof of address and birth certificate',
    },
    {
      id: 'address',
      name: 'Proof of Address',
      desc: 'Proves you live in California',
      accepted: ['Utility bill', 'Bank statement', 'Lease agreement', 'Official mail dated within 60 days'],
      howTo: 'Ask your landlord for a signed letter, or use a recent piece of official mail',
    },
    {
      id: 'income',
      name: 'Proof of Income',
      desc: "Shows how much money comes into your home",
      accepted: ['Pay stubs from last 30 days', 'Employer letter', 'Bank statements', 'Social Security award letter'],
      howTo: 'Ask your employer for a letter stating your hours and pay rate',
    },
    {
      id: 'ssn',
      name: 'Social Security Numbers',
      desc: 'Required for each person applying',
      accepted: ['Social Security card', 'SSA letter', 'W-2 form showing your SSN'],
      howTo: 'Visit ssa.gov or call 1-800-772-1213 to request a replacement card',
    },
    {
      id: 'immigration',
      name: 'Immigration Documents (if not a US citizen)',
      desc: 'Proof of immigration status if applicable',
      accepted: ['Green card', 'Visa', 'Work permit', 'I-94 form'],
      howTo: 'Contact USCIS at uscis.gov or call 1-800-375-5283',
    },
  ];

  const [checked, setChecked] = React.useState(() => {
    try {
      const saved = localStorage.getItem('documentsChecked');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [openHowTo, setOpenHowTo] = React.useState({});

  React.useEffect(() => {
    try {
      localStorage.setItem('documentsChecked', JSON.stringify(checked));
    } catch (e) {}
  }, [checked]);

  const toggle = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    // quick animation could be triggered via CSS class when toggled
  };

  const toggleHowTo = (id) => {
    setOpenHowTo(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const readyCount = documents.reduce((acc, d) => acc + (checked[d.id] ? 1 : 0), 0);
  const allReady = readyCount === documents.length;

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-fraunces font-bold mb-2 text-neutral-900">Gather Your Documents</h1>
          <p className="text-lg text-neutral-700">Know exactly what you need before you start — no surprises</p>
        </div>

        <div className="mb-6">
          <ProgressBar currentStep={0} totalSteps={5} />
          <p className="text-sm text-neutral-600 mt-2">Step 1 of 5 — Document checklist</p>
        </div>

        <div className="space-y-4 mb-6">
          {documents.map(doc => (
            <div key={doc.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <button
                      aria-pressed={!!checked[doc.id]}
                      onClick={() => toggle(doc.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                        ${checked[doc.id] ? 'bg-success-600 text-white scale-105' : 'bg-neutral-100 text-neutral-600'}`}
                    >
                      {checked[doc.id] ? (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>

                    <div>
                      <h3 className="text-2xl font-semibold text-neutral-900">{doc.name}</h3>
                      <p className="text-neutral-600 mt-1">{doc.desc}</p>
                      <p className="text-neutral-600 mt-2 text-sm">Accepted: {doc.accepted.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => toggleHowTo(doc.id)}
                    className="text-sm text-primary-600 hover:underline"
                    aria-expanded={!!openHowTo[doc.id]}
                  >
                    How to get this ▾
                  </button>
                </div>
              </div>

              {openHowTo[doc.id] && (
                <div className="mt-4 bg-primary-50 border border-primary-100 rounded-lg p-4">
                  <p className="text-neutral-700">{doc.howTo}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="w-full bg-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">You have {readyCount} of {documents.length} documents ready</p>
              <p className="text-sm text-neutral-600">Check each box when you have a clear photo or file ready to upload</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                disabled={!allReady}
                className={`px-6 py-3 rounded-full text-white font-semibold transition
                  ${allReady ? 'bg-success-600 hover:bg-success-700' : 'bg-neutral-300 cursor-not-allowed opacity-60'}`}
                onClick={() => window.location.href = '/apply'}
              >
                I Have All My Documents — Start Application
              </button>

              <a href="/apply" className="text-sm text-neutral-700 mt-1">Start Anyway</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
