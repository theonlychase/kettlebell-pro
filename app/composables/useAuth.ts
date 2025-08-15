export const useAuth = () => {
  const { auth } = useSupabaseClient()

  async function getUser() {
    const { data } = await useFetch('/api/auth', {
      headers: useRequestHeaders(['cookie']),
    })

    return data
  }

  async function signUpNewUser(payload: { email: string, name: string, password: string }) {
    const { email, name, password } = payload

    const { data, error } = await auth.signUp({
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

  async function signInWithPassword(payload: { email: string, password: string }) {
    const { email, password } = payload

    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    })

    return { data, error }
  }

  async function signOut() {
    return await auth.signOut()
  }

  return {
    getUser,
    signOut,
    signUpNewUser,
    signInWithPassword,
  }
}
