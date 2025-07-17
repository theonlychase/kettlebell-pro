<script setup lang="ts">
import type { Workout, Exercise } from '~/types'

const route = useRoute()
const workoutId = route.params.id as string

// Mock exercise data
const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Kettlebell Swing',
    description: 'The fundamental kettlebell movement that targets your posterior chain.',
    duration: 45,
    reps: 20,
    sets: 3,
    weight: '16kg',
    muscleGroups: ['glutes', 'hamstrings', 'core'],
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart, kettlebell on the ground in front of you',
      'Hinge at the hips and grab the kettlebell with both hands',
      'Drive through your hips to swing the kettlebell up to chest height',
      'Let the kettlebell swing back down between your legs',
      'Repeat for the specified number of reps',
    ],
    tips: [
      'Keep your back straight throughout the movement',
      'The power comes from your hips, not your arms',
      'Squeeze your glutes at the top of the swing',
    ],
  },
  {
    id: '2',
    name: 'Goblet Squat',
    description: 'A squat variation holding the kettlebell at chest level.',
    duration: 60,
    reps: 15,
    sets: 3,
    weight: '16kg',
    muscleGroups: ['quadriceps', 'glutes', 'core'],
    difficulty: 'beginner',
    instructions: [
      'Hold the kettlebell by the horns at chest level',
      'Stand with feet slightly wider than shoulder-width',
      'Lower into a squat, keeping your chest up',
      'Drive through your heels to return to standing',
      'Repeat for the specified number of reps',
    ],
    tips: [
      'Keep your elbows pointing down',
      'Go as low as your mobility allows',
      'Keep your weight on your heels',
    ],
  },
]

// Mock workout data - in real app, this would come from API
const mockWorkout: Workout = {
  id: workoutId,
  title: 'Beginner Kettlebell Basics',
  description: 'Perfect introduction to kettlebell training with fundamental movements and proper form. This workout focuses on building a solid foundation with the most important kettlebell exercises.',
  duration: 20,
  difficulty: 'beginner',
  exercises: mockExercises,
  tags: ['beginner', 'fundamentals', 'form'],
  imageUrl: '/images/workouts/beginner-basics.jpg',
  equipment: ['16kg kettlebell'],
  caloriesBurned: 180,
  muscleGroups: ['full-body', 'core', 'legs'],
}

// Set SEO meta
useSeoMeta({
  title: `${mockWorkout.title} - Kettlebell Pro`,
  description: mockWorkout.description,
})

// Reactive state
const currentExerciseIndex = ref(0)
const isWorkoutStarted = ref(false)
const workoutTimer = ref(0)
const exerciseTimer = ref(0)

// Computed properties
const currentExercise = computed(() => mockWorkout.exercises[currentExerciseIndex.value])
const totalExercises = computed(() => mockWorkout.exercises.length)
const workoutProgress = computed(() => ((currentExerciseIndex.value + 1) / totalExercises.value) * 100)

// Timer functions
let workoutInterval: NodeJS.Timeout | null = null
let exerciseInterval: NodeJS.Timeout | null = null

const startWorkout = () => {
  isWorkoutStarted.value = true
  startWorkoutTimer()
  startExerciseTimer()
}

const startWorkoutTimer = () => {
  workoutInterval = setInterval(() => {
    workoutTimer.value++
  }, 1000)
}

const startExerciseTimer = () => {
  exerciseTimer.value = 0
  exerciseInterval = setInterval(() => {
    exerciseTimer.value++
  }, 1000)
}

const nextExercise = () => {
  if (currentExerciseIndex.value < totalExercises.value - 1) {
    currentExerciseIndex.value++
    startExerciseTimer()
  }
  else {
    completeWorkout()
  }
}

const previousExercise = () => {
  if (currentExerciseIndex.value > 0) {
    currentExerciseIndex.value--
    startExerciseTimer()
  }
}

const completeWorkout = () => {
  isWorkoutStarted.value = false
  if (workoutInterval) clearInterval(workoutInterval)
  if (exerciseInterval) clearInterval(exerciseInterval)
  // Here you would typically save workout completion data
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Cleanup on unmount
onUnmounted(() => {
  if (workoutInterval) clearInterval(workoutInterval)
  if (exerciseInterval) clearInterval(exerciseInterval)
})
</script>

<template>
  <UPage>
    <UPageHero>
      <template #title>
        {{ mockWorkout.title }}
      </template>
      <template #description>
        {{ mockWorkout.description }}
      </template>

      <template #body>
        <div class="flex justify-center items-center space-x-4 mb-6">
          <UBadge
            :label="mockWorkout.difficulty"
            :color="mockWorkout.difficulty === 'beginner' ? 'green' : mockWorkout.difficulty === 'intermediate' ? 'yellow' : 'red'"
            variant="solid"
            size="lg"
          />
          <div class="flex items-center space-x-2">
            <UIcon
              name="i-heroicons-clock"
              class="w-5 h-5"
            />
            <span class="text-lg">{{ mockWorkout.duration }} min</span>
          </div>
          <div class="flex items-center space-x-2">
            <UIcon
              name="i-heroicons-fire"
              class="w-5 h-5"
            />
            <span class="text-lg">{{ mockWorkout.caloriesBurned }} cal</span>
          </div>
        </div>

        <div class="flex justify-center flex-wrap gap-2 mb-6">
          <UBadge
            v-for="tag in mockWorkout.tags"
            :key="tag"
            :label="tag"
            variant="soft"
          />
        </div>
      </template>

      <template #links>
        <UButton
          v-if="!isWorkoutStarted"
          size="xl"
          color="primary"
          variant="solid"
          class="font-semibold"
          @click="startWorkout"
        >
          Start Workout
          <UIcon
            name="i-heroicons-play"
            class="ml-2 w-5 h-5"
          />
        </UButton>
      </template>
    </UPageHero>

    <UContainer>
      <UPageBody>
        <!-- Workout Progress (shown when workout is started) -->
        <div
          v-if="isWorkoutStarted"
          class="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Exercise {{ currentExerciseIndex + 1 }} of {{ totalExercises }}
            </h2>
            <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div>Workout: {{ formatTime(workoutTimer) }}</div>
              <div>Exercise: {{ formatTime(exerciseTimer) }}</div>
            </div>
          </div>

          <UProgress
            :value="workoutProgress"
            class="mb-4"
          />

          <div class="flex items-center justify-between">
            <UButton
              :disabled="currentExerciseIndex === 0"
              variant="outline"
              @click="previousExercise"
            >
              <UIcon
                name="i-heroicons-chevron-left"
                class="w-4 h-4 mr-1"
              />
              Previous
            </UButton>

            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ currentExercise.name }}
            </h3>

            <UButton
              color="primary"
              @click="nextExercise"
            >
              {{ currentExerciseIndex === totalExercises - 1 ? 'Complete' : 'Next' }}
              <UIcon
                name="i-heroicons-chevron-right"
                class="w-4 h-4 ml-1"
              />
            </UButton>
          </div>
        </div>

        <!-- Exercise List -->
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Exercises ({{ totalExercises }})
          </h2>

          <div class="space-y-4">
            <div
              v-for="(exercise, index) in mockWorkout.exercises"
              :key="exercise.id"
              class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
              :class="{ 'ring-primary-500 bg-primary-50 dark:bg-primary-900/20': isWorkoutStarted && index === currentExerciseIndex }"
            >
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ index + 1 }}. {{ exercise.name }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 mt-1">
                    {{ exercise.description }}
                  </p>
                </div>

                <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div
                    v-if="exercise.sets"
                    class="text-center"
                  >
                    <div class="font-medium text-gray-900 dark:text-white">
                      {{ exercise.sets }}
                    </div>
                    <div>sets</div>
                  </div>
                  <div
                    v-if="exercise.reps"
                    class="text-center"
                  >
                    <div class="font-medium text-gray-900 dark:text-white">
                      {{ exercise.reps }}
                    </div>
                    <div>reps</div>
                  </div>
                  <div
                    v-if="exercise.weight"
                    class="text-center"
                  >
                    <div class="font-medium text-gray-900 dark:text-white">
                      {{ exercise.weight }}
                    </div>
                    <div>weight</div>
                  </div>
                  <div class="text-center">
                    <div class="font-medium text-gray-900 dark:text-white">
                      {{ exercise.duration }}s
                    </div>
                    <div>duration</div>
                  </div>
                </div>
              </div>

              <!-- Exercise Instructions -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    Instructions
                  </h4>
                  <ol class="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li
                      v-for="instruction in exercise.instructions"
                      :key="instruction"
                    >
                      {{ instruction }}
                    </li>
                  </ol>
                </div>

                <div v-if="exercise.tips && exercise.tips.length > 0">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                    Tips
                  </h4>
                  <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li
                      v-for="tip in exercise.tips"
                      :key="tip"
                    >
                      {{ tip }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Muscle Groups -->
              <div class="mt-4 flex flex-wrap gap-1">
                <UBadge
                  v-for="muscle in exercise.muscleGroups"
                  :key="muscle"
                  :label="muscle"
                  variant="soft"
                  size="xs"
                />
              </div>
            </div>
          </div>
        </div>
      </UPageBody>
    </UContainer>
  </UPage>
</template>
