import { VALIDATION } from '#shared/utils/constants'

export const validateEmail = (email: string) => VALIDATION.email.pattern.test(email)
