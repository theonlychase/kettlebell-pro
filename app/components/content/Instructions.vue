<script setup lang="ts">
interface Props {
  items?: string[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Instructions',
})

const computedItems = computed(() => {
  return props?.items?.map((item, index) => ({
    label: index + 1,
    title: item,
  }))
})
</script>

<template>
  <UTimeline
    :default-value="40"
    :items="computedItems"
  >
    <template #indicator="{ item }">
      <span>{{ item.label }}</span>
    </template>
  </UTimeline>
</template>
