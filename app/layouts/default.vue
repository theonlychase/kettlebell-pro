<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const children = findPageChildren(navigation?.value, '/exercises')
</script>

<template>
  <div id="app">
    <Header :navigation="children" />

    <UMain>
      <slot />
    </UMain>

    <USeparator
      class="h-px"
    />

    <Footer />
  </div>
</template>
