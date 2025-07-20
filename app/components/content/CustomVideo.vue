<script setup lang="ts">
defineProps<{ title: string, url?: string }>()
</script>

<template>
  <iframe
    v-if="url"
    :src="url"
    class="aspect-video"
    allowfullscreen
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    :title="title"
  />
  <div v-else>
    Coming soon...
  </div>
</template>
