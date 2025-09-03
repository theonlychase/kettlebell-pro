export const useUserProfile = () => {
  const supabase = useSupabaseClient<Database>()

  const checkUserExists = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .eq('email', normalizeEmail(email))
        .single()

      if (error && error.code !== 'PGRST116') {
        throw createDbError('Failed to check user existence', error)
      }

      return data
    }
    catch (error) {
      handleAuthError(error, 'checking user existence')
    }
  }

  const upsertUserProfile = async (
    email: string,
    name: string,
    exists: boolean = false,
    confirmed: boolean = false,
  ) => {
    try {
      const { data, error } = await supabase
        .from('user_profile')
        .upsert({
          email: normalizeEmail(email),
          name,
          exists,
          confirmed,
        }, {
          onConflict: 'email',
        })
        .select()
        .single()

      if (error) {
        throw createDbError('Failed to upsert user profile', error)
      }

      return data
    }
    catch (error) {
      handleAuthError(error, 'updating user profile')
    }
  }

  return {
    checkUserExists,
    upsertUserProfile,
  }
}
