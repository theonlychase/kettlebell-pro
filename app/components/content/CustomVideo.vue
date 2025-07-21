<script setup lang="ts">
interface Props {
  title?: string
  url: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Exercise Video',
  description: 'Watch the demonstration video to learn proper form and technique.',
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
  <UCard class="mb-6">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-play-circle" class="text-primary" />
        <div>
          <h3 class="text-lg font-semibold">
            {{ title }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ description }}
          </p>
        </div>
      </div>
    </template>

    <div class="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div v-if="!isPlaying && thumbnailUrl" class="relative w-full h-full cursor-pointer" @click="playVideo">
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
            <UIcon name="i-lucide-play" class="w-8 h-8" />
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
          v-if="!iframeLoaded"
          class="w-full h-full object-cover absolute inset-0"
          src="/images/video-placeholder.webp"
          :alt="`${title} loading`"
        />
      </client-only>
    </div>

    <template #footer>
      <div class="flex items-center justify-between text-sm text-muted-foreground">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-info" class="w-4 h-4" />
          <span>Watch carefully to learn proper form</span>
        </div>
        <UButton
          v-if="isPlaying"
          @click="isPlaying = false"
          variant="ghost"
          size="sm"
        >
          <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-1" />
          Replay
        </UButton>
      </div>
    </template>
  </UCard>
</template>
