<script setup lang="ts">
const user = useSupabaseUser()
const redirectInfo = useSupabaseCookieRedirect()

useSeoMeta({
  robots: 'noindex, nofollow',
  title: 'Confirm',
})

watch(
  user,
  () => {
    if (user.value) {
      const path = redirectInfo.pluck()
      // Redirect to the saved path, or fallback to home
      return navigateTo(path || '/')
    }
  },
  { immediate: true },
)
</script>

<template>
  <UPageBody>
    <div>Waiting for login...</div>
  </UPageBody>
</template>
