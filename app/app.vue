<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('exercises', ['description']))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('exercises'))
provide('navigation', navigation)

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

if (import.meta.server) {
  useSeoMeta({
    robots: 'index, follow',
    titleTemplate: '%s - Site Title',
  })
}
</script>

<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLoadingIndicator />

    <LazyUContentSearch
      :color-mode="false"
      :files="files"
      label-key="title"
      :links="NAVIGATION"
      :navigation="navigation"
      :fuse="{ resultLimit: 10 }"
    />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
