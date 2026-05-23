/**
 * Form validation utilities
 */

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  const phoneRegex = /^(\+?1[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function validateSSN(ssn) {
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$|^\d{9}$/;
  return ssnRegex.test(ssn);
}

export function validateZipCode(zip) {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

export function validateDateOfBirth(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();

  if (isNaN(date.getTime())) {
    return false;
  }

  // Must be at least 18 (unless minor applying with parent/guardian)
  // This is simplified - actual rules are more complex
  return age >= 0;
}

export function validateName(name) {
  // At least 2 characters, letters and spaces/hyphens allowed
  return name && name.length >= 2 && /^[a-zA-Z\s\-']+$/.test(name);
}

export function validateAddress(street, city, zip) {
  return (
    street && street.length >= 3 &&
    city && city.length >= 2 &&
    validateZipCode(zip)
  );
}

export const errors = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number (555-555-5555)',
  invalidSSN: 'Please enter a valid Social Security number (555-55-5555)',
  invalidZip: 'Please enter a valid ZIP code',
  invalidName: 'Please enter a valid name',
  invalidAddress: 'Please enter a valid address',
  invalidDOB: 'Please enter a valid date of birth',
  passwordMismatch: 'Passwords do not match',
  passwordTooShort: 'Password must be at least 8 characters',
};

/**
 * Validate entire form section
 */
export function validateSection(sectionName, data) {
  const errors = {};

  switch (sectionName) {
    case 'personalInfo':
      if (!data.fullName) errors.fullName = 'Required';
      else if (!validateName(data.fullName)) errors.fullName = 'Invalid name';

      if (!data.dateOfBirth) errors.dateOfBirth = 'Required';
      else if (!validateDateOfBirth(data.dateOfBirth)) errors.dateOfBirth = 'Invalid date';

      if (!data.ssn) errors.ssn = 'Required';
      else if (!validateSSN(data.ssn)) errors.ssn = 'Invalid Social Security number';

      break;

    case 'contact':
      if (!data.email) errors.email = 'Required';
      else if (!validateEmail(data.email)) errors.email = 'Invalid email';

      if (!data.phone) errors.phone = 'Required';
      else if (!validatePhone(data.phone)) errors.phone = 'Invalid phone';

      break;

    case 'address':
      if (!validateAddress(data.street, data.city, data.zip)) {
        errors.address = 'Please enter a valid address';
      }

      break;

    default:
      break;
  }

  return errors;
}
