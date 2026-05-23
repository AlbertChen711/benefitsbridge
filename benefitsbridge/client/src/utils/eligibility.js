/**
 * Eligibility calculation logic
 * Determines if an applicant likely qualifies for CalFresh benefits
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

const ASSET_LIMITS = {
  individual: 3750,
  couple: 5625,
};

export function calculateEligibility(answers) {
  const {
    county,
    household,
    income,
    citizenship,
    assets = 0,
  } = answers;

  if (!county || !household || !income || !citizenship) {
    return {
      eligible: null,
      reason: 'Incomplete information',
      estimatedBenefit: 0,
    };
  }

  // US Citizenship/Legal Residency check
  if (citizenship !== 'yes') {
    return {
      eligible: false,
      reason: 'Must be a US citizen or legal resident',
      estimatedBenefit: 0,
    };
  }

  // Income limit check
  const incomeToNumber = (rangeString) => {
    const ranges = {
      '$0 - $500': 250,
      '$501 - $1,000': 750,
      '$1,001 - $2,000': 1500,
      '$2,001 - $3,000': 2500,
      '$3,001 - $4,000': 3500,
      '$4,001+': 5000,
    };
    return ranges[rangeString] || 0;
  };

  const monthlyIncome = incomeToNumber(income);
  const incomeLimit = INCOME_LIMITS_2024[household] || INCOME_LIMITS_2024[8];

  if (monthlyIncome > incomeLimit) {
    return {
      eligible: false,
      reason: `Income exceeds limit of $${incomeLimit} for household of ${household}`,
      estimatedBenefit: 0,
    };
  }

  // Asset check (simplified)
  const assetLimit = household === 1 ? ASSET_LIMITS.individual : ASSET_LIMITS.couple;
  if (assets > assetLimit) {
    return {
      eligible: false,
      reason: `Assets exceed limit of $${assetLimit}`,
      estimatedBenefit: 0,
    };
  }

  // Calculate estimated benefit (simplified formula)
  const maxBenefit = 291 + (household - 1) * 104; // USDA 2024 rates (simplified)
  const deductedIncome = Math.max(0, monthlyIncome - 180); // Standard deduction
  const countedIncome = Math.max(0, deductedIncome * 0.8); // 20% reduction
  const estimatedBenefit = Math.max(0, maxBenefit - Math.floor(countedIncome * 0.3));

  return {
    eligible: true,
    reason: 'You likely qualify for CalFresh benefits',
    estimatedBenefit: Math.round(estimatedBenefit),
    details: {
      monthlyIncome,
      incomeLimit,
      countedIncome,
      maxBenefit,
    },
  };
}

/**
 * Calculate benefit amount based on household income and size
 */
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
  const countedIncome = deductedIncome * 0.8; // 20% reduction
  const benefit = maxBenefit - Math.floor(countedIncome * 0.3);

  return Math.max(0, benefit);
}

/**
 * Check if applicant meets emergency eligibility
 */
export function checkEmergencyEligibility(answers) {
  const { citizenship, household } = answers;

  if (citizenship !== 'yes') {
    return false;
  }

  // Emergency eligibility has more relaxed rules
  // This would need more detailed logic in production
  return true;
}
