import React from 'react';
import CalculatorCard from '../components/Calculator/CalculatorCard';
import { useLanguage } from '../context/LanguageContext';

export default function Calculator() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-fraunces font-bold mb-4">Estimate Your Monthly Benefit</h1>
        <p className="text-neutral-600 mb-6">Use our quick calculator to get an idea of what you may receive.</p>

        <CalculatorCard />
      </div>
    </div>
  );
}
