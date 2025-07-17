<script setup lang="ts">
import type { Workout } from '~/types'

interface Props {
  workout: Workout
  showDescription?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
  size: 'md',
})

// Helper functions
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'green'
    case 'intermediate':
      return 'yellow'
    case 'advanced':
      return 'red'
    default:
      return 'gray'
  }
}

const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

// Size-based classes
const cardClasses = computed(() => {
  const base = 'group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-md hover:ring-primary-500'

  switch (props.size) {
    case 'sm':
      return `${base} max-w-sm`
    case 'lg':
      return `${base} max-w-2xl`
    default:
      return base
  }
})

const imageClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'aspect-square'
    case 'lg':
      return 'aspect-[16/9]'
    default:
      return 'aspect-video'
  }
})

const contentPadding = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'p-4'
    case 'lg':
      return 'p-8'
    default:
      return 'p-6'
  }
})

const titleSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-base'
    case 'lg':
      return 'text-xl'
    default:
      return 'text-lg'
  }
})
</script>

<template>
  <div :class="cardClasses">
    <!-- Workout Image -->
    <div :class="`${imageClasses} bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden`">
      <div class="absolute inset-0 bg-black/20" />

      <!-- Workout Image (if available) -->
      <img
        v-if="workout.imageUrl"
        :src="workout.imageUrl"
        :alt="workout.title"
        class="absolute inset-0 w-full h-full object-cover"
      >

      <!-- Overlay Content -->
      <div class="absolute inset-0 flex flex-col justify-between p-4">
        <!-- Top Row: Difficulty and Duration -->
        <div class="flex items-center justify-between">
          <UBadge
            :label="workout.difficulty"
            :color="getDifficultyColor(workout.difficulty)"
            variant="solid"
            :size="size === 'sm' ? 'xs' : 'sm'"
          />
          <div class="flex items-center space-x-1 text-white text-sm">
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            <span>{{ formatDuration(workout.duration) }}</span>
          </div>
        </div>

        <!-- Bottom Row: Stats -->
        <div class="flex items-center justify-between text-white text-sm">
          <div v-if="workout.caloriesBurned" class="flex items-center space-x-1">
            <UIcon name="i-heroicons-fire" class="w-4 h-4" />
            <span>{{ workout.caloriesBurned }} cal</span>
          </div>
          <div v-if="workout.equipment?.length" class="flex items-center space-x-1">
            <UIcon name="i-heroicons-cube" class="w-4 h-4" />
            <span>{{ workout.equipment.length }} equipment</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Workout Content -->
    <div :class="contentPadding">
      <h3 :class="`${titleSize} font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2`">
        {{ workout.title }}
      </h3>

      <p
        v-if="showDescription && workout.description"
        :class="`text-sm text-gray-600 dark:text-gray-400 mb-4 ${size === 'lg' ? 'line-clamp-3' : 'line-clamp-2'}`"
      >
        {{ workout.description }}
      </p>

      <!-- Muscle Groups -->
      <div v-if="workout.muscleGroups?.length" class="mb-4">
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="muscle in workout.muscleGroups.slice(0, size === 'sm' ? 2 : 3)"
            :key="muscle"
            :label="muscle"
            variant="soft"
            color="gray"
            size="xs"
          />
          <UBadge
            v-if="workout.muscleGroups.length > (size === 'sm' ? 2 : 3)"
            :label="`+${workout.muscleGroups.length - (size === 'sm' ? 2 : 3)}`"
            variant="soft"
            color="gray"
            size="xs"
          />
        </div>
      </div>

      <!-- Tags -->
      <div v-if="workout.tags?.length" class="mb-4">
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="tag in workout.tags.slice(0, size === 'sm' ? 2 : 3)"
            :key="tag"
            :label="tag"
            variant="soft"
            color="primary"
            size="xs"
          />
        </div>
      </div>

      <!-- Action Button -->
      <div class="mt-auto">
        <UButton
          :to="`/workouts/${workout.id}`"
          :size="size === 'sm' ? 'sm' : 'md'"
          color="primary"
          variant="solid"
          block
        >
          <span v-if="size === 'lg'">Start Workout</span>
          <span v-else>Start</span>
          <UIcon name="i-heroicons-play" :class="`ml-2 ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`" />
        </UButton>
      </div>
    </div>
  </div>
</template>
