<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

definePageMeta({
  layout: 'exercises',
})

const route = useRoute()
const { toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
console.log(navigation)

const { data: page } = await useAsyncData(route.path, () => queryCollection('exercises').all())
console.log(page)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('exercises', route.path, {
    fields: ['description'],
  })
})

const title = 'All Kettlebell Exercises'
const description = 'List of all kettlebell exercises.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

// defineOgImageComponent('Exercises', {
//   headline: headline.value,
// })
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHeader
        :title="title"
        :description="description"
        headline="Exercises"
      />

      <UPageBody>
        <ContentRenderer
          v-if="page"
          :value="page"
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
          :links="page.body?.toc?.links"
        />
      </template>
    </UPage>
  </UContainer>
</template>
