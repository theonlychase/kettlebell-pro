<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { navigation } = defineProps<{ navigation: ContentNavigationItem[] }>()
</script>

<template>
  <UHeader :ui="{ center: 'flex-1' }">
    <template #left>
      <NuxtLink
        :to="ROUTES.home"
        class="flex items-center"
      >
        <UIcon
          mode="svg"
          name="i-custom-kettlebell"
          class="w-12 h-12 fill-current"
        />

        <span class="text-xl font-bold text-gray-900 dark:text-white">
          Kettlebell Pro
        </span>
      </NuxtLink>
    </template>

    <UContentSearchButton
      class="flex-1"
      :collapsed="false"
      label="Search Exercises..."
      :kbds="[]"
    />

    <template #right>
      <div class="flex items-center space-x-2">
        <UContentSearchButton
          class="lg:hidden"
          label="Search Exercises..."
          :kbds="[]"
        />
        <UColorModeButton />

        <UButton
          label="Sign in"
          color="neutral"
          variant="outline"
          to="/login"
          class="hidden lg:inline-flex"
        />

        <UButton
          label="Sign up"
          color="neutral"
          trailing-icon="i-lucide-arrow-right"
          class="hidden lg:inline-flex"
          to="/signup"
        />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="NAVIGATION"
        highlight
        orientation="vertical"
      />

      <USeparator
        type="dashed"
        class="mt-4 mb-6"
      />

      <UContentNavigation
        :navigation="navigation"
        highlight
        :ui="{ linkTrailingBadge: 'font-semibold uppercase' }"
      />
    </template>
  </UHeader>
</template>
