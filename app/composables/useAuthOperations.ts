import type { AuthResponse } from '#shared/types/auth'

export const useAuthOperations = () => {
  const { signUpNewUser } = useAuth()
  const { checkUserExists, upsertUserProfile } = useUserProfile()
  const supabase = useSupabaseClient<Database>()

  const signUpWithProfileCheck = async (payload: { email: string, name?: string, password: string }): Promise<AuthResponse<User | Session>> => {
    const { email, name, password } = payload

    try {
      // Step 1: Check if user already exists
      const existingProfile = await checkUserExists(email)

      if (existingProfile?.exists) {
        const errorCode = existingProfile.confirmed ? 'user_already_exists' : 'user_unconfirmed'
        const message = existingProfile.confirmed
          ? 'A user with this email already exists. Please login instead.'
          : 'To finish signing up, please check your email for the confirmation link.'

        return {
          data: null,
          error: { message, code: errorCode },
          userProfile: existingProfile,
        }
      }

      // Step 2: Create/update profile record before signup
      await upsertUserProfile(email, name, false, false)

      // Step 3: Proceed with signup
      const { data, error } = await signUpNewUser({ email, name, password })

      if (error) {
        return { data, error, userProfile: null }
      }

      // Step 4: Update profile to mark user as existing in auth
      const updatedProfile = await upsertUserProfile(email, name, true, false)

      return {
        data,
        error: null,
        userProfile: updatedProfile,
        message: 'Signup successful! Please check your email to confirm your account.',
      }
    }
    catch (error) {
      handleAuthError(error, 'signup')
    }
  }

  const handleEmailConfirmation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user?.email) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'No authenticated user found',
        })
      }

      if (user.email_confirmed_at) {
        await upsertUserProfile(
          user.email,
          user.user_metadata?.name || user.email.split('@')[0],
          true,
          true,
        )

        return {
          success: true,
          message: 'Email confirmed successfully!',
          user,
        }
      }

      return {
        success: false,
        message: 'Email not yet confirmed',
      }
    }
    catch (error) {
      handleAuthError(error, 'email confirmation')
    }
  }

  return {
    signUpWithProfileCheck,
    handleEmailConfirmation,
  }
}
