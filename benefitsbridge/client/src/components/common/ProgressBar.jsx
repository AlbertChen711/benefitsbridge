import React from 'react';

export default function ProgressBar({ currentStep, totalSteps, stepLabels = [] }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress percentage */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-neutral-700">
          Question {currentStep + 1} of {totalSteps}
        </p>
        <p className="text-sm font-semibold text-primary-600">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>

      {/* Step labels if provided */}
      {stepLabels.length > 0 && (
        <div className="mt-4 flex gap-2 text-xs">
          {stepLabels.map((label, index) => (
            <div
              key={index}
              className={`h-8 px-2 rounded-full flex items-center justify-center font-medium transition
                ${
                  index <= currentStep
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-neutral-100 text-neutral-500'
                }
              `}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
