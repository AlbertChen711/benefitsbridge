import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/common/ProgressBar';
import { useLanguage } from '../context/LanguageContext';

const COUNTIES = [
  'Alameda', 'Alpine', 'Amador', 'Butte', 'Calaveras', 'Colusa', 'Contra Costa',
  'Del Norte', 'El Dorado', 'Fresno', 'Glenn', 'Humboldt', 'Imperial', 'Inyo',
  'Kern', 'Kings', 'Lake', 'Lassen', 'Los Angeles', 'Madera', 'Marin', 'Mariposa',
  'Mendocino', 'Merced', 'Modoc', 'Mono', 'Monterey', 'Napa', 'Nevada', 'Orange',
  'Placer', 'Plumas', 'Riverside', 'Sacramento', 'San Benito', 'San Bernardino',
  'San Diego', 'San Francisco', 'San Joaquin', 'San Luis Obispo', 'San Mateo',
  'Santa Barbara', 'Santa Clara', 'Santa Cruz', 'Shasta', 'Sierra', 'Siskiyou',
  'Solano', 'Sonoma', 'Stanislaus', 'Sutter', 'Tehama', 'Trinity', 'Tulare',
  'Tuolumne', 'Ventura', 'Yolo', 'Yuba',
];

const INCOME_RANGES = [
  '$0 - $500',
  '$501 - $1,000',
  '$1,001 - $2,000',
  '$2,001 - $3,000',
  '$3,001 - $4,000',
  '$4,001+',
];

export default function Screener() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    county: '',
    household: 1,
    income: '',
    situation: [],
    citizenship: '',
    assistance: '',
  });
  const [results, setResults] = useState(null);

  const questions = [
    { key: 'county', label: t('screener.question1'), type: 'select' },
    { key: 'household', label: t('screener.question2'), type: 'number' },
    { key: 'income', label: t('screener.question3'), type: 'select' },
    { key: 'situation', label: t('screener.question4'), type: 'checkbox' },
    { key: 'citizenship', label: t('screener.question5'), type: 'yesno' },
    { key: 'assistance', label: t('screener.question6'), type: 'yesno' },
  ];

  const situationOptions = [
    'Job loss',
    'Low income',
    'Student',
    'Senior',
    'Disability',
    'Other',
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (value) => {
    const key = questions[currentQuestion].key;
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (value) => {
    const key = questions[currentQuestion].key;
    setAnswers(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value],
    }));
  };

  const calculateResults = () => {
    // Simple eligibility logic (would be more complex in production)
    const incomeMax = ['$0 - $500', '$501 - $1,000', '$1,001 - $2,000'].includes(answers.income);
    const isUSCitizen = answers.citizenship === 'yes';
    
    const likely = incomeMax && isUSCitizen;
    const estimatedBenefit = likely ? Math.random() * 300 + 100 : 0;

    setResults({
      likely,
      estimatedBenefit: Math.round(estimatedBenefit),
      answers,
    });
  };

  if (results) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {results.likely ? (
            <>
              <div className="text-center mb-12">
                <div className="w-24 h-24 bg-success-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-6xl">✓</span>
                </div>
                <h1 className="text-4xl font-bold text-neutral-900 mb-3">
                  You likely qualify!
                </h1>
                <p className="text-2xl text-success-600 font-semibold">
                  Estimated monthly benefit
                </p>
                <p className="text-5xl font-bold text-success-600 my-4">
                  ${results.estimatedBenefit}
                </p>
              </div>

              <button
                onClick={() => navigate('/signup')}
                className="w-full py-4 bg-success-600 hover:bg-success-700 text-white font-bold text-lg rounded-lg mb-4"
              >
                {t('screener.startApplication')}
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="w-24 h-24 bg-warning-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-6xl">ℹ️</span>
                </div>
                <h1 className="text-4xl font-bold text-neutral-900 mb-3">
                  You may not qualify right now
                </h1>
                <p className="text-xl text-neutral-700 mb-6">
                  But there may be other programs that can help.
                </p>
              </div>

              <div className="bg-white border-2 border-neutral-200 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4">{t('screener.alternatives')}</h3>
                <ul className="space-y-3 text-lg text-neutral-700">
                  <li>• LIHEAP (Low Income Home Energy Assistance Program)</li>
                  <li>• CalFresh Disaster Assistance (in affected areas)</li>
                  <li>• Local food banks and pantries</li>
                  <li>• Community action agencies</li>
                </ul>
              </div>

              <button
                onClick={() => setResults(null)}
                className="w-full py-4 bg-neutral-600 hover:bg-neutral-700 text-white font-bold text-lg rounded-lg"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ.key];

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={currentQuestion} totalSteps={questions.length} />

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          {/* Question */}
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            {currentQ.label}
          </h2>

          {/* County Select */}
          {currentQ.type === 'select' && currentQ.key === 'county' && (
            <select
              value={answers.county}
              onChange={e => handleAnswerChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg text-lg mb-8 focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a county...</option>
              {COUNTIES.map(county => (
                <option key={county} value={county}>
                  {county} County
                </option>
              ))}
            </select>
          )}

          {/* Income Select */}
          {currentQ.type === 'select' && currentQ.key === 'income' && (
            <select
              value={answers.income}
              onChange={e => handleAnswerChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg text-lg mb-8 focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select income range...</option>
              {INCOME_RANGES.map(range => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          )}

          {/* Household Number */}
          {currentQ.type === 'number' && (
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() =>
                  handleAnswerChange(Math.max(1, answers.household - 1))
                }
                className="w-12 h-12 bg-neutral-200 hover:bg-neutral-300 rounded-lg font-bold text-xl"
              >
                −
              </button>
              <span className="text-4xl font-bold w-16 text-center">
                {answers.household}
              </span>
              <button
                onClick={() => handleAnswerChange(answers.household + 1)}
                className="w-12 h-12 bg-neutral-200 hover:bg-neutral-300 rounded-lg font-bold text-xl"
              >
                +
              </button>
            </div>
          )}

          {/* Checkboxes */}
          {currentQ.type === 'checkbox' && (
            <div className="space-y-3 mb-8">
              {situationOptions.map(option => (
                <label
                  key={option}
                  className="flex items-center p-4 border-2 border-neutral-300 rounded-lg hover:bg-neutral-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={answers.situation.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="ml-3 text-lg font-medium text-neutral-800">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* Yes/No Buttons */}
          {currentQ.type === 'yesno' && (
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => handleAnswerChange('yes')}
                className={`flex-1 py-4 text-lg font-bold rounded-lg border-2 transition ${
                  answers[currentQ.key] === 'yes'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-neutral-800 border-neutral-300 hover:border-primary-600'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswerChange('no')}
                className={`flex-1 py-4 text-lg font-bold rounded-lg border-2 transition ${
                  answers[currentQ.key] === 'no'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-neutral-800 border-neutral-300 hover:border-primary-600'
                }`}
              >
                No
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex-1 py-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold text-lg rounded-lg disabled:opacity-50 transition"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-lg disabled:opacity-50 transition"
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
