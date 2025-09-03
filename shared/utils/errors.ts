import { createError } from '#imports'

export const handleAuthError = (error: unknown, context: string) => {
  if (error && typeof error === 'object' && 'statusCode' in error) {
    throw error
  }

  throw createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    message: `An unexpected error occurred during ${context}`,
    data: { originalError: error },
  })
}

export const createDbError = (message: string, originalError: unknown) => {
  return createError({
    statusCode: 500,
    statusMessage: 'Database Error',
    message,
    data: { originalError },
  })
}
