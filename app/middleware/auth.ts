export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  const redirectPaths = ['/login', '/signup']

  if (user.value && redirectPaths.includes(to.path)) {
    return navigateTo('/')
  }
})
