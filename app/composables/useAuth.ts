export const useAuth = () => {
  const { auth } = useSupabaseClient()

  async function signUpNewUser(payload: { email: string, name: string, password: string }) {
    const { email, name, password } = payload

    const { data } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: 'http://localhost:8888',
      },
    })
    return data
  }

  return {
    signUpNewUser,
  }
}
