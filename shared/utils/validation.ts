/**
 * Validation utilities for the Kettlebell Pro application
 */

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns True if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param password - Password string to validate
 * @returns Object with validation result and requirements
 */
export const validatePassword = (password: string): {
  isValid: boolean
  requirements: {
    minLength: boolean
    hasUppercase: boolean
    hasLowercase: boolean
    hasNumber: boolean
    hasSpecialChar: boolean
  }
} => {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const isValid = Object.values(requirements).every(Boolean)

  return { isValid, requirements }
}

/**
 * Validate required field
 * @param value - Value to validate
 * @returns True if value is not empty, false otherwise
 */
export const isRequired = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'number') return !isNaN(value)
  return true
}

/**
 * Validate numeric range
 * @param value - Numeric value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns True if value is within range, false otherwise
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return !isNaN(value) && value >= min && value <= max
}

/**
 * Validate workout duration (in minutes)
 * @param duration - Duration in minutes
 * @returns True if duration is valid (5-300 minutes), false otherwise
 */
export const isValidWorkoutDuration = (duration: number): boolean => {
  return isInRange(duration, 5, 300)
}

/**
 * Validate exercise sets count
 * @param sets - Number of sets
 * @returns True if sets count is valid (1-10), false otherwise
 */
export const isValidSetsCount = (sets: number): boolean => {
  return isInRange(sets, 1, 10)
}

/**
 * Validate exercise reps count
 * @param reps - Number of reps
 * @returns True if reps count is valid (1-100), false otherwise
 */
export const isValidRepsCount = (reps: number): boolean => {
  return isInRange(reps, 1, 100)
}

/**
 * Validate weight value (in pounds or kg)
 * @param weight - Weight value
 * @returns True if weight is valid (0.5-1000), false otherwise
 */
export const isValidWeight = (weight: number): boolean => {
  return isInRange(weight, 0.5, 1000)
}

/**
 * Validate phone number format (US format)
 * @param phone - Phone number string
 * @returns True if phone number is valid, false otherwise
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

/**
 * Validate URL format
 * @param url - URL string to validate
 * @returns True if URL is valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  }
  catch {
    return false
  }
}

/**
 * Validate form data against schema
 * @param data - Form data object
 * @param schema - Validation schema
 * @returns Validation result with errors
 */
export const validateForm = <T extends Record<string, unknown>>(
  data: T,
  schema: Record<keyof T, (value: unknown) => boolean | string>,
): {
  isValid: boolean
  errors: Partial<Record<keyof T, string>>
} => {
  const errors: Partial<Record<keyof T, string>> = {}

  for (const [field, validator] of Object.entries(schema)) {
    const result = validator(data[field])
    if (typeof result === 'string') {
      errors[field as keyof T] = result
    }
    else if (!result) {
      errors[field as keyof T] = `${field} is invalid`
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
