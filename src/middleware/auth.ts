export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  if (user.value) {
    if (to.path === '/login') {
      return navigateTo('/')
    }
  }
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
