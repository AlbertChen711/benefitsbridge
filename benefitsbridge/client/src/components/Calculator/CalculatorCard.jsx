import React from 'react';
import { useNavigate } from 'react-router-dom';

const MAX_BENEFIT = [0,292,536,768,994,1180,1415,1606,1838];

export default function CalculatorCard() {
  const [householdSize, setHouseholdSize] = React.useState(1);
  const [income, setIncome] = React.useState(0);
  const navigate = useNavigate();

  const incomeLimit = householdSize * 2500;

  const qualifies = income <= incomeLimit;

  const netIncome = income - income * 0.2;
  let benefit = Math.round(MAX_BENEFIT[householdSize] - netIncome * 0.3);
  if (!qualifies) benefit = 0;
  benefit = Math.max(benefit, 23);
  benefit = Math.min(benefit, MAX_BENEFIT[householdSize]);

  const percentage = Math.round((benefit / MAX_BENEFIT[householdSize]) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="bg-success-600 text-white rounded-xl px-4 py-2 inline-block mb-4">Estimate Your Monthly Benefit</div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-800">How many people are in your household?</label>
          <input type="range" min="1" max="8" value={householdSize} onChange={(e) => setHouseholdSize(Number(e.target.value))} className="w-full" />
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`w-6 h-6 rounded-full ${i < householdSize ? 'bg-success-600' : 'bg-neutral-200'}`} />
            ))}
            <div className="ml-3 text-sm text-neutral-600">{householdSize} {householdSize === 1 ? 'person' : 'people'}</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-800">What is your household's total monthly income?</label>
          <input type="range" min="0" max="5000" step="10" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full" />
          <div className="mt-2 text-lg font-mono">${income}</div>
        </div>

        <div className="mt-4 text-center">
          {!qualifies ? (
            <div className="text-red-600 font-semibold">You may not qualify</div>
          ) : (
            <div className="text-3xl font-bold text-success-600 animate-pulse">${benefit} per month</div>
          )}
          <p className="text-sm text-neutral-600 mt-2">This is an estimate. Your actual benefit may be higher based on expenses and deductions.</p>
        </div>

        <div className="mt-4">
          <div className="w-full h-4 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-success-600 transition-all duration-300" style={{ width: `${percentage}%` }} />
          </div>
          <div className="flex justify-between text-sm text-neutral-600 mt-2">
            <div>0%</div>
            <div>{percentage}% of max</div>
            <div>100%</div>
          </div>
        </div>

        <div className="mt-4 bg-neutral-50 p-4 rounded-lg">
          <p className="text-sm">At ${income}/month that's approximately:</p>
          <p className="text-sm mt-2">🛒 ${Math.round((benefit/4))} per week at the grocery store</p>
          <p className="text-sm">🍽 ${(benefit / Math.max(1, householdSize) / 30).toFixed(2)} per meal per person</p>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate('/screener')} className="ml-auto px-5 py-3 bg-success-600 text-white rounded-full">Check My Full Eligibility →</button>
        </div>
      </div>
    </div>
  );
}
