<script setup lang="ts">
interface Props {
  tips?: string[]
  cautions?: string[]
  commonMistakes?: string[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Tips & Safety',
})
</script>

<template>
  <UCard v-if="tips?.length || cautions?.length || commonMistakes?.length" class="mb-6">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-lightbulb" class="text-primary" />
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
      </div>
    </template>

    <div class="space-y-6">
      <!-- Tips Section -->
      <div v-if="tips?.length">
        <div class="flex items-center gap-2 mb-3">
          <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-green-500" />
          <h4 class="font-medium text-green-700 dark:text-green-400">
            Pro Tips
          </h4>
        </div>
        <div class="space-y-3">
          <UAlert
            v-for="tip in tips"
            :key="tip"
            color="green"
            variant="soft"
            :description="tip"
            icon="i-lucide-lightbulb"
          />
        </div>
      </div>

      <!-- Cautions Section -->
      <div v-if="cautions?.length">
        <div class="flex items-center gap-2 mb-3">
          <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-yellow-500" />
          <h4 class="font-medium text-yellow-700 dark:text-yellow-400">
            Safety Cautions
          </h4>
        </div>
        <div class="space-y-3">
          <UAlert
            v-for="caution in cautions"
            :key="caution"
            color="yellow"
            variant="soft"
            :description="caution"
            icon="i-lucide-alert-triangle"
          />
        </div>
      </div>

      <!-- Common Mistakes Section -->
      <div v-if="commonMistakes?.length">
        <div class="flex items-center gap-2 mb-3">
          <UIcon name="i-lucide-x-circle" class="w-5 h-5 text-red-500" />
          <h4 class="font-medium text-red-700 dark:text-red-400">
            Common Mistakes to Avoid
          </h4>
        </div>
        <div class="space-y-3">
          <UAlert
            v-for="mistake in commonMistakes"
            :key="mistake"
            color="red"
            variant="soft"
            :description="mistake"
            icon="i-lucide-x-circle"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <UIcon name="i-lucide-shield-check" class="w-4 h-4" />
        <span>Always prioritize proper form and safety</span>
      </div>
    </template>
  </UCard>
</template>
