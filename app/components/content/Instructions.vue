<script setup lang="ts">
interface Props {
  items?: string[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Instructions',
})
</script>

<template>
  <UCard
    v-if="items?.length"
    class="mb-6"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon
          name="i-lucide-list-ordered"
          class="text-primary"
        />
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="(item, index) in items"
        :key="item"
        class="flex gap-4 items-start"
      >
        <UBadge
          :label="(index + 1).toString()"
          variant="solid"
          color="primary"
          class="shrink-0 mt-0.5"
        />
        <p class="text-sm leading-relaxed">
          {{ item }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <UIcon
          name="i-lucide-info"
          class="w-4 h-4"
        />
        <span>Follow each step carefully for best results</span>
      </div>
    </template>
  </UCard>
</template>
