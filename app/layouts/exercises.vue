<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const children = findPageChildren(navigation?.value, '/exercises')
</script>

<template>
  <div id="app">
    <Header />

    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <UContentNavigation
                highlight
                :navigation="children"
              />
            </UPageAside>
          </template>

          <slot />
        </UPage>
      </UContainer>
    </UMain>

    <USeparator
      class="h-px"
    />

    <Footer />
  </div>
</template>
