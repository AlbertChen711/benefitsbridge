/**
 * Eligibility Calculation Service
 * Server-side eligibility calculation
 */

const INCOME_LIMITS_2024 = {
  1: 1868,
  2: 2553,
  3: 3237,
  4: 3922,
  5: 4606,
  6: 5291,
  7: 5975,
  8: 6660,
};

export function calculateEligibility(applicationData) {
  const {
    household,
    monthlyIncome,
    citizenship,
    assets,
  } = applicationData;

  // Citizenship check
  if (citizenship !== 'yes') {
    return {
      eligible: false,
      reason: 'Must be a US citizen or legal resident',
      estimatedBenefit: 0,
    };
  }

  // Income limit check
  const incomeLimit = INCOME_LIMITS_2024[Math.min(household, 8)];
  if (monthlyIncome > incomeLimit) {
    return {
      eligible: false,
      reason: `Income exceeds limit of $${incomeLimit} for household of ${household}`,
      estimatedBenefit: 0,
    };
  }

  // Asset limit
  const assetLimit = 3750;
  if (assets > assetLimit) {
    return {
      eligible: false,
      reason: `Assets exceed limit of $${assetLimit}`,
      estimatedBenefit: 0,
    };
  }

  // Calculate benefit
  const estimatedBenefit = calculateBenefitAmount(household, monthlyIncome);

  return {
    eligible: true,
    reason: 'Likely qualifies for CalFresh',
    estimatedBenefit,
    incomeLimit,
    countedIncome: monthlyIncome * 0.8,
  };
}

export function calculateBenefitAmount(householdSize, monthlyIncome) {
  const maxBenefits = {
    1: 291,
    2: 535,
    3: 768,
    4: 1097,
    5: 1304,
    6: 1562,
    7: 1736,
    8: 1994,
  };

  const maxBenefit = maxBenefits[Math.min(householdSize, 8)];
  const standardDeduction = 180;
  const deductedIncome = Math.max(0, monthlyIncome - standardDeduction);
  const countedIncome = deductedIncome * 0.8;
  const benefit = maxBenefit - Math.floor(countedIncome * 0.3);

  return Math.max(0, benefit);
}
