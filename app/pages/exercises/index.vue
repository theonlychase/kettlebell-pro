<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'

const route = useRoute()
const { toc } = useAppConfig()

const { data: page } = await useAsyncData(route.path, () => queryCollection('exercises').all())
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const children = findPageChildren(navigation?.value, '/exercises')

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = 'All Kettlebell Exercises'
const description = 'List of all kettlebell exercises.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})
</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHeader
        :title="title"
        :description="description"
        headline="Exercises"
      />

      <template v-for="child in children">
        <UPageHeader
          v-if="child.parent"
          :key="child.title"
          as="h3"
          :title="child.title"
          :description="child.description"
          :ui="{ root: 'mb-8', title: 'text-xl sm:text-2xl' }"
        />
        <!--        <h3 -->
        <!--          v-if="child.category" -->
        <!--          :key="child.title" -->
        <!--          class="text-xl sm:text-2xl text-pretty font-bold text-highlighted border-b border-b-default py-6" -->
        <!--        > -->
        <!--          {{ child.title }} -->
        <!--        </h3> -->

        <UPageGrid
          v-if="child.children.length"
          :key="child.title"
        >
          <UPageCard
            v-for="c in child.children"
            :key="c.title"
            :description="c.description"
            :title="c.title"
            :to="c.path"
          />
        </UPageGrid>
      </template>

      <UPageBody>
        <!--        <template v-for="child in children"> -->
        <!--          <h3 -->
        <!--            v-if="child.category" -->
        <!--            :key="child.title" -->
        <!--            class="text-xl sm:text-2xl text-pretty font-bold text-highlighted border-b border-b-default py-6" -->
        <!--          > -->
        <!--            {{ child.title }} -->
        <!--          </h3> -->

        <!--          <UPageGrid -->
        <!--            v-if="child.children.length" -->
        <!--            :key="child.title" -->
        <!--          > -->
        <!--            <UPageCard -->
        <!--              v-for="c in child.children" -->
        <!--              :key="c.title" -->
        <!--              :description="c.description" -->
        <!--              :title="c.title" -->
        <!--              :to="c.path" -->
        <!--            /> -->
        <!--          </UPageGrid> -->
        <!--        </template> -->
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
