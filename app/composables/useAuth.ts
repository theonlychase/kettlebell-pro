export const useAuth = () => {
  const supabase = useSupabaseClient<Database>()
  const config = useRuntimeConfig()

  async function getUser() {
    const data = await $fetch('/api/auth', { headers: useRequestHeaders(['cookie']) })

    return data ?? ''
  }

  async function signUpNewUser(payload: { email: string, name: string, password: string }) {
    const { email, name, password } = payload

    const { data, error } = await supabase.auth.signUp({
      email: normalizeEmail(email),
      password,
      options: {
        data: { name },
        emailRedirectTo: config.public.authRedirectUrl,
      },
    })

    return { data, error }
  }

  async function signInWithPassword(payload: { email: string, password: string }) {
    const { email, password } = payload

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizeEmail(email),
      password,
    })

    return { data, error }
  }

  async function signOut() {
    return await supabase.auth.signOut()
  }

  return {
    getUser,
    signUpNewUser,
    signInWithPassword,
    signOut,
  }
}
