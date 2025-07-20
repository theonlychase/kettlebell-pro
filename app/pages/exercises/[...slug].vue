<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: 'exercises',
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data: page } = await useAsyncData(route.path, () => queryCollection('exercises').path(route.path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('exercises', route.path, {
    fields: ['description'],
  })
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path))

const customData = computed(() => {
  return {
    instructions: page.value?.instructions,
    title,
    videoUrl: page.value?.videoUrl ?? '',
  }
})

const tocLinks = computed(() => {
  if (!page.value?.instructions) {
    return page.value?.body?.toc?.links.filter(link => link.id !== 'instructions')
  }
  return page.value?.body?.toc?.links
})
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHeader
        :title="page.title"
        :description="page.description"
        :headline="headline"
      />

      <UPageBody>
        <ContentRenderer
          v-if="page.body"
          id="exercise-content"
          :value="page"
          :data="customData"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="page?.body?.toc?.links?.length"
        #right
      >
        <UContentToc
          :title="toc?.title"
          :links="tocLinks"
        />
      </template>
    </UPage>
  </UContainer>
</template>
