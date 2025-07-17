<script setup lang="ts">
import type { Exercise } from '~/types'

interface Props {
  exercises: Exercise[]
  showInstructions?: boolean
  showTips?: boolean
  showMuscleGroups?: boolean
  currentExerciseIndex?: number
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showInstructions: true,
  showTips: true,
  showMuscleGroups: true,
  currentExerciseIndex: -1,
  compact: false,
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

const formatDuration = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
}

// Computed classes
const containerClasses = computed(() => {
  return props.compact ? 'space-y-3' : 'space-y-6'
})

const exerciseCardClasses = (index: number) => {
  const base = 'bg-white dark:bg-gray-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700'
  const padding = props.compact ? 'p-4' : 'p-6'
  const highlight = props.currentExerciseIndex === index
    ? 'ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
    : ''

  return `${base} ${padding} ${highlight}`
}

const titleSize = computed(() => {
  return props.compact ? 'text-base' : 'text-lg'
})
</script>

<template>
  <div :class="containerClasses">
    <div
      v-for="(exercise, index) in exercises"
      :key="exercise.id"
      :class="exerciseCardClasses(index)"
    >
      <!-- Exercise Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <span class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-sm font-medium text-primary-600 dark:text-primary-400">
              {{ index + 1 }}
            </span>
            <h3 :class="`${titleSize} font-semibold text-gray-900 dark:text-white`">
              {{ exercise.name }}
            </h3>
            <UBadge
              :label="exercise.difficulty"
              :color="getDifficultyColor(exercise.difficulty)"
              variant="soft"
              size="xs"
            />
          </div>

          <p v-if="exercise.description" class="text-sm text-gray-600 dark:text-gray-400 ml-11">
            {{ exercise.description }}
          </p>
        </div>

        <!-- Exercise Stats -->
        <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 ml-4">
          <div v-if="exercise.sets" class="text-center">
            <div class="font-medium text-gray-900 dark:text-white">
              {{ exercise.sets }}
            </div>
            <div class="text-xs">
              sets
            </div>
          </div>
          <div v-if="exercise.reps" class="text-center">
            <div class="font-medium text-gray-900 dark:text-white">
              {{ exercise.reps }}
            </div>
            <div class="text-xs">
              reps
            </div>
          </div>
          <div v-if="exercise.weight" class="text-center">
            <div class="font-medium text-gray-900 dark:text-white">
              {{ exercise.weight }}
            </div>
            <div class="text-xs">
              weight
            </div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900 dark:text-white">
              {{ formatDuration(exercise.duration) }}
            </div>
            <div class="text-xs">
              duration
            </div>
          </div>
        </div>
      </div>

      <!-- Exercise Content -->
      <div v-if="!compact" class="ml-11 space-y-4">
        <!-- Instructions and Tips Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Instructions -->
          <div v-if="showInstructions && exercise.instructions?.length">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <UIcon name="i-heroicons-list-bullet" class="w-4 h-4 mr-2 text-primary-500" />
              Instructions
            </h4>
            <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li v-for="instruction in exercise.instructions" :key="instruction">
                {{ instruction }}
              </li>
            </ol>
          </div>

          <!-- Tips -->
          <div v-if="showTips && exercise.tips?.length">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <UIcon name="i-heroicons-light-bulb" class="w-4 h-4 mr-2 text-yellow-500" />
              Tips
            </h4>
            <ul class="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li v-for="tip in exercise.tips" :key="tip">
                {{ tip }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Muscle Groups -->
        <div v-if="showMuscleGroups && exercise.muscleGroups?.length">
          <h4 class="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
            <UIcon name="i-heroicons-bolt" class="w-4 h-4 mr-2 text-red-500" />
            Target Muscles
          </h4>
          <div class="flex flex-wrap gap-1">
            <UBadge
              v-for="muscle in exercise.muscleGroups"
              :key="muscle"
              :label="muscle"
              variant="soft"
              color="red"
              size="xs"
            />
          </div>
        </div>

        <!-- Video/Image Placeholder -->
        <div v-if="exercise.videoUrl || exercise.imageUrl" class="mt-4">
          <div class="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div class="text-center text-gray-500 dark:text-gray-400">
              <UIcon name="i-heroicons-play-circle" class="w-12 h-12 mx-auto mb-2" />
              <p class="text-sm">
                Video demonstration available
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Compact View Content -->
      <div v-else class="ml-11">
        <!-- Muscle Groups (compact) -->
        <div v-if="showMuscleGroups && exercise.muscleGroups?.length" class="mt-2">
          <div class="flex flex-wrap gap-1">
            <UBadge
              v-for="muscle in exercise.muscleGroups.slice(0, 3)"
              :key="muscle"
              :label="muscle"
              variant="soft"
              color="red"
              size="xs"
            />
            <UBadge
              v-if="exercise.muscleGroups.length > 3"
              :label="`+${exercise.muscleGroups.length - 3}`"
              variant="soft"
              color="gray"
              size="xs"
            />
          </div>
        </div>
      </div>

      <!-- Current Exercise Indicator -->
      <div v-if="currentExerciseIndex === index" class="absolute top-4 left-4">
        <div class="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
          <div class="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-pulse" />
          <span class="text-xs font-medium">Current Exercise</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="exercises.length === 0" class="text-center py-8">
      <UIcon name="i-heroicons-clipboard-document-list" class="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No exercises found
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        This workout doesn't have any exercises yet.
      </p>
    </div>
  </div>
</template>
