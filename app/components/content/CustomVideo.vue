<script setup lang="ts">
defineProps<{ title: string, url?: string }>()

const iframeLoaded = ref(false)
</script>

<template>
  <div class="relative aspect-video">
    <client-only>
      <iframe
        v-if="url"
        :src="url"
        class="aspect-video"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        :title="title"
        @load="iframeLoaded = true"
      />
    </client-only>

    <NuxtImg
      v-if="!url || !iframeLoaded"
      class="aspect-video absolute inset-0"
      src="/images/video-placeholder.webp"
    />
  </div>
</template>
