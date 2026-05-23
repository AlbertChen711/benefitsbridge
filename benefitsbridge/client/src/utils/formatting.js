/**
 * Data formatting and transformation utilities
 */

export function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function formatSSN(ssn) {
  const cleaned = ssn.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
  }
  return ssn;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatLastUpdated(timestamp) {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(timestamp);
}

export function capitalizeName(name) {
  return name
    .split(' ')
    .map(part =>
      part.length > 0
        ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        : part
    )
    .join(' ');
}

export function truncateText(text, length = 50) {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Convert form data to API payload format
 */
export function prepareApplicationPayload(applicationData) {
  return {
    screening: applicationData.screener,
    personalInformation: {
      fullName: applicationData.personalInfo.fullName,
      dateOfBirth: applicationData.personalInfo.dateOfBirth,
      socialSecurityNumber: applicationData.personalInfo.ssn,
      email: applicationData.personalInfo.email,
      phoneNumber: applicationData.personalInfo.phone,
    },
    residence: {
      street: applicationData.addressHousing.street,
      city: applicationData.addressHousing.city,
      state: 'CA',
      zipCode: applicationData.addressHousing.zip,
      hoursAtAddress: applicationData.addressHousing.hoursAtAddress,
      livingStatus: applicationData.addressHousing.livingStatus,
    },
    household: applicationData.householdMembers.map(member => ({
      name: member.name,
      dateOfBirth: member.dateOfBirth,
      relationship: member.relationship,
      isApplying: member.isApplying,
      socialSecurityNumber: member.ssn,
    })),
    income: {
      employmentStatus: applicationData.incomeEmployment.employmentStatus,
      monthlyEmploymentIncome: applicationData.incomeEmployment.employmentIncome,
      otherIncome: applicationData.incomeEmployment.otherIncome,
    },
    expenses: {
      rent: applicationData.expensesDeductions.rent,
      utilities: applicationData.expensesDeductions.utilities,
      childcare: applicationData.expensesDeductions.childcare,
      medicalExpenses: applicationData.expensesDeductions.medicalExpenses,
    },
    documents: applicationData.documents,
    submittedAt: new Date().toISOString(),
  };
}
