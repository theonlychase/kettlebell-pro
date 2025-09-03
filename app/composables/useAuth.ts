export const useAuth = () => {
  const supabase = useSupabaseClient()

  async function getUser() {
    const { data } = await useFetch('/api/auth', {
      headers: useRequestHeaders(['cookie']),
    })

    return data
  }

  async function signUpNewUser(payload: { email: string, name: string, password: string }) {
    const { email, name, password } = payload

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: 'http://localhost:8888/confirm',
      },
    })
    return { data, error }
  }

  const checkUserExists = async (email: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error
      }

      return data
    }
    catch (error) {
      console.error('Error checking user existence:', error)
      throw error
      // const errorPayload = {
      //   name: (error as PostgrestError)?.name ?? 'Error',
      //   message: (error as PostgrestError)?.message ?? 'An error occurred while checking user existence',
      // }
      //
    }
  }

  const upsertUserProfile = async (
    email: string,
    name: string,
    exists: boolean = false,
    confirmed: boolean = false,
  ): Promise<UserProfile> => {
    try {
      const { data, error } = await supabase
        .from('user_profile')
        .upsert({
          email: email.toLowerCase().trim(),
          name,
          exists,
          confirmed,
        }, {
          onConflict: 'email',
        })
        .select()
        .single()

      if (error) throw error
      return data
    }
    catch (error) {
      console.error('Error upserting user profile:', error)
      throw error
    }
  }

  async function signInWithPassword(payload: { email: string, password: string }) {
    const { email, password } = payload

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { data, error }
  }

  async function signUpWithProfileCheck(payload: { email: string, name: string, password: string }) {
    const { email, name, password } = payload

    try {
      // Step 1: Check if user already exists in our profile table
      const existingProfile = await checkUserExists(email)

      if (existingProfile?.exists) {
        const checkResp = {
          data: null,
          error: {
            message: 'A user with this email already exists. Please login instead.',
            code: 'user_already_exists',
          },
          userProfile: existingProfile,
        }

        if (existingProfile.confirmed) {
          return checkResp
        }

        return {
          ...checkResp,
          error: {
            message: 'Please check your email for the confirmation link before logging in.',
            code: 'user_unconfirmed',
          },
        }
      }

      // Step 2: Create/update profile record before signup
      await upsertUserProfile(email, name, false, false)

      // Step 3: Proceed with your existing signup
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
      console.error('Signup with profile check error:', error)
      return {
        data: null,
        error: {
          message: error instanceof Error ? error.message : 'An unexpected error occurred during signup',
          code: 'signup_error',
        },
        userProfile: null,
      }
    }
  }

  const handleEmailConfirmation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user || !user.email) {
        throw new Error('No authenticated user found')
      }

      // Check if user is confirmed in auth
      if (user.email_confirmed_at) {
        // Update the user_profile table
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
      else {
        return {
          success: false,
          message: 'Email not yet confirmed',
        }
      }
    }
    catch (error) {
      console.error('Email confirmation error:', error)
      return {
        success: false,
        message: 'Failed to confirm email',
        error,
      }
    }
  }

  async function signOut() {
    return await supabase.auth.signOut()
  }

  return {
    getUser,
    handleEmailConfirmation,
    signOut,
    signUpNewUser,
    signUpWithProfileCheck,
    signInWithPassword,
  }
}
