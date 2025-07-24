<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'

const route = useRoute()
const { toc } = useAppConfig()

const { data: page } = await useAsyncData(route.path, () => queryCollection('exercises').all())
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const children = findPageChildren(navigation?.value, '/exercises', { indexAsChild: true })

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

const { y } = useWindowScroll()
onMounted(() => {
  const stickyElements = document.querySelectorAll('[data-track-sticky]') as NodeListOf<HTMLElement>
  watch(y, () => {
    stickyElements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const topComputed = Number.parseInt(window.getComputedStyle(el).top || '0', 10)
      if (rect.top <= topComputed) {
        el.dataset.stuck = ''
      }
      else {
        delete el.dataset.stuck
      }
    })
  }, { immediate: true })
})

// Helper functions for exercise metadata display
// function getDifficultyColor(difficulty: string): string {
//   switch (difficulty) {
//     case 'beginner':
//       return 'green'
//     case 'intermediate':
//       return 'yellow'
//     case 'advanced':
//       return 'red'
//     default:
//       return 'gray'
//   }
// }
//
// function getDifficultyIcon(difficulty: string): string {
//   switch (difficulty) {
//     case 'beginner':
//       return 'i-lucide-circle'
//     case 'intermediate':
//       return 'i-lucide-circle-dot'
//     case 'advanced':
//       return 'i-lucide-circle-dot-dashed'
//     default:
//       return 'i-lucide-circle'
//   }
// }
//
// function getExerciseTypeIcon(exerciseType: string): string {
//   switch (exerciseType) {
//     case 'strength':
//       return 'i-lucide-dumbbell'
//     case 'cardio':
//       return 'i-lucide-heart'
//     case 'endurance':
//       return 'i-lucide-timer'
//     case 'power':
//       return 'i-lucide-zap'
//     case 'mobility':
//       return 'i-lucide-rotate-3d'
//     case 'combination':
//       return 'i-lucide-layers'
//     default:
//       return 'i-lucide-activity'
//   }
// }
//
// function getBodyPositionIcon(bodyPosition: string): string {
//   switch (bodyPosition) {
//     case 'standing':
//       return 'i-lucide-user'
//     case 'kneeling':
//       return 'i-lucide-user-minus'
//     case 'lying':
//       return 'i-lucide-bed'
//     case 'sitting':
//       return 'i-lucide-armchair'
//     case 'multiple':
//       return 'i-lucide-users'
//     default:
//       return 'i-lucide-user'
//   }
// }
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      class="page-container"
      :title="title"
      :description="description"
      headline="Exercises"
    />

    <div
      v-for="category in children"
      :key="category.title"
    >
      <div
        data-track-sticky
        class="group mb-4 sm:mb-6 lg:mb-8 sticky top-[calc(var(--ui-header-height)-1px)] bg-default/75 backdrop-blur z-[1]"
      >
        <div class="relative border-y border-default py-4 group-[[data-stuck]]:bg-muted sm:not-group-[[data-stuck]]:py-6 lg:not-group-[[data-stuck]]:py-8 transition-all duration-300">
          <UContainer>
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center">
                  <h2 class="relative text-pretty font-bold text-highlighted text-base sm:not-group-[[data-stuck]]:text-xl lg:not-group-[[data-stuck]]:text-2xl transition-all duration-300">
                    <a
                      :href="`#${category.title}`"
                      class="group lg:not-group-[[data-stuck]]:ps-2 lg:not-group-[[data-stuck]]:-ms-2"
                    >
                      <span class="absolute -ms-8 top-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-elevated hover:text-primary rounded-md hidden lg:not-group-[[data-stuck]]:flex text-muted transition">
                        <UIcon
                          name="i-lucide-hash"
                          class="size-4 shrink-0"
                        />
                      </span>
                      {{ category.title }}
                    </a>
                  </h2>
                  <UBadge
                    v-if="category.children?.length"
                    variant="subtle"
                    color="primary"
                    class="ml-4 shrink-0"
                  >
                    {{ category.children.length }} exercises
                  </UBadge>
                </div>

                <p class="text-pretty text-muted text-sm sm:not-group-[[data-stuck]]:text-base lg:not-group-[[data-stuck]]:text-lg mt-1 sm:not-group-[[data-stuck]]:mt-2 line-clamp-1 transition-all duration-300">
                  {{ category.description }}
                </p>
              </div>
            </div>
          </UContainer>
        </div>
      </div>
      <UContainer>
        <UPageGrid
          v-if="category.children?.length"
          :id="category.title"
          :key="category.title"
          class="xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-24 scroll-mt-[calc(97px+var(--ui-header-height))] sm:scroll-mt-[calc(133px+var(--ui-header-height))] lg:scroll-mt-[calc(165px+var(--ui-header-height))]"
        >
          <UCard
            v-for="child in category.children"
            :key="child.title"
            class="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            :ui="{
              header: 'bg-muted',
            }"
            @click="navigateTo(child.path)"
          >
            <template #header>
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
                    {{ child.title }}
                  </h3>
                </div>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-4 text-gray-400 group-hover:text-primary transition-colors shrink-0 mt-0.5"
                />
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-1">
                {{ child.description }}
              </p>
            </template>

            <div class="aspect-video">
              <NuxtImg
                class="w-full h-full"
                src="/images/video-placeholder.webp"
                :alt="`${child.title}`"
              />
            </div>
          </UCard>
        </UPageGrid>
      </UContainer>
    </div>

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
</template>
