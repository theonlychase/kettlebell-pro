<script setup lang="ts">
interface Props {
  title?: string
  url: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Exercise Video',
  description: '',
})

// Extract video ID from YouTube URL for thumbnail
const videoId = computed(() => {
  const match = props.url.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([^?&]+)/)
  return match ? match[1] : null
})

const thumbnailUrl = computed(() => {
  return videoId.value ? `https://img.youtube.com/vi/${videoId.value}/maxresdefault.jpg` : null
})

const isPlaying = ref(false)
const iframeLoaded = ref(false)

const playVideo = () => {
  isPlaying.value = true
}
</script>

<template>
  <div class="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
    <div
      v-if="!isPlaying && thumbnailUrl"
      class="relative w-full h-full cursor-pointer"
      @click="playVideo"
    >
      <img
        :src="thumbnailUrl"
        :alt="`${title} thumbnail`"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors">
        <UButton
          size="xl"
          variant="solid"
          color="primary"
          class="rounded-full shadow-lg"
        >
          <UIcon
            name="i-lucide-play"
            class="w-8 h-8"
          />
        </UButton>
      </div>
    </div>

    <client-only v-else>
      <iframe
        v-if="url"
        :src="url + (url.includes('?') ? '&' : '?') + 'autoplay=1'"
        :title="title"
        class="w-full h-full"
        frameborder="0"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        @load="iframeLoaded = true"
      />

      <NuxtImg
        v-if="!thumbnailUrl && !iframeLoaded"
        class="w-full h-full object-cover absolute inset-0"
        src="/images/video-placeholder.webp"
        :alt="`${title} loading`"
      />
    </client-only>
  </div>
</template>
