<script setup lang="ts">
useSeoMeta({
  title: 'Workouts - Kettlebell Pro',
  description: 'Browse our comprehensive library of kettlebell workouts. Filter by difficulty, duration, and muscle groups to find the perfect workout for your fitness level.',
})

// Mock data - will be replaced with API calls later
const mockWorkouts: Workout[] = [
  {
    id: '1',
    title: 'Beginner Kettlebell Basics',
    description: 'Perfect introduction to kettlebell training with fundamental movements and proper form.',
    duration: 20,
    difficulty: 'beginner',
    exercises: [],
    tags: ['beginner', 'fundamentals', 'form'],
    imageUrl: '/images/workouts/beginner-basics.jpg',
    equipment: ['16kg kettlebell'],
    caloriesBurned: 180,
    muscleGroups: ['full-body', 'core', 'legs'],
  },
  {
    id: '2',
    title: 'HIIT Kettlebell Blast',
    description: 'High-intensity interval training with kettlebells for maximum calorie burn and conditioning.',
    duration: 30,
    difficulty: 'intermediate',
    exercises: [],
    tags: ['hiit', 'cardio', 'fat-burn'],
    imageUrl: '/images/workouts/hiit-blast.jpg',
    equipment: ['20kg kettlebell'],
    caloriesBurned: 350,
    muscleGroups: ['full-body', 'cardio'],
  },
  {
    id: '3',
    title: 'Advanced Strength Circuit',
    description: 'Complex kettlebell movements for experienced athletes focusing on strength and power.',
    duration: 45,
    difficulty: 'advanced',
    exercises: [],
    tags: ['strength', 'power', 'complex'],
    imageUrl: '/images/workouts/advanced-strength.jpg',
    equipment: ['24kg kettlebell', '32kg kettlebell'],
    caloriesBurned: 420,
    muscleGroups: ['full-body', 'strength'],
  },
]

// Reactive state
const searchQuery = ref('')
const selectedDifficulty = ref(null)
const selectedDuration = ref(null)
const selectedMuscleGroup = ref(null)

// Filter options
const difficultyOptions = [
  { label: 'All Levels', value: null },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]

const durationOptions = [
  { label: 'Any Duration', value: null },
  { label: 'Under 20 min', value: '20' },
  { label: '20-30 min', value: '30' },
  { label: '30+ min', value: '45' },
]

const muscleGroupOptions = [
  { label: 'All Muscle Groups', value: null },
  { label: 'Full Body', value: 'full-body' },
  { label: 'Core', value: 'core' },
  { label: 'Legs', value: 'legs' },
  { label: 'Upper Body', value: 'upper-body' },
]

// Computed filtered workouts
const filteredWorkouts = computed(() => {
  return mockWorkouts.filter((workout) => {
    const matchesSearch = !searchQuery.value
      || workout.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      || workout.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      || workout.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))

    const matchesDifficulty = !selectedDifficulty.value || workout.difficulty === selectedDifficulty.value

    const matchesDuration = !selectedDuration.value
      || (selectedDuration.value === '20' && workout.duration < 20)
      || (selectedDuration.value === '30' && workout.duration >= 20 && workout.duration <= 30)
      || (selectedDuration.value === '45' && workout.duration > 30)

    const matchesMuscleGroup = !selectedMuscleGroup.value
      || workout.muscleGroups.includes(selectedMuscleGroup.value)

    return matchesSearch && matchesDifficulty && matchesDuration && matchesMuscleGroup
  })
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedDifficulty.value = null
  selectedDuration.value = null
  selectedMuscleGroup.value = null
}
</script>

<template>
  <UPage>
    <UPageHeader
      title="Workouts"
      description="Browse our comprehensive library of kettlebell workouts designed for all fitness levels."
    />

    <UContainer>
      <UPageBody>
        <!-- Search and Filters -->
        <div class="mb-8 space-y-4">
          <!-- Search Bar -->
          <div class="relative">
            <UInput
              v-model="searchQuery"
              placeholder="Search workouts..."
              icon="i-heroicons-magnifying-glass"
              size="lg"
              class="w-full"
            />
          </div>

          <!-- Filter Controls -->
          <div class="flex flex-wrap gap-4">
            <USelect
              v-model="selectedDifficulty"
              :items="difficultyOptions"
              placeholder="Difficulty"
              class="min-w-[150px]"
            />
            <USelect
              v-model="selectedDuration"
              :items="durationOptions"
              placeholder="Duration"
              class="min-w-[150px]"
            />
            <USelect
              v-model="selectedMuscleGroup"
              :items="muscleGroupOptions"
              placeholder="Muscle Groups"
              class="min-w-[180px]"
            />
            <UButton
              variant="outline"
              color="neutral"
              @click="clearFilters"
            >
              Clear Filters
            </UButton>
          </div>

          <!-- Results Count -->
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ filteredWorkouts.length }} workout{{ filteredWorkouts.length !== 1 ? 's' : '' }} found
          </div>
        </div>

        <!-- Workouts Grid -->
        <div
          v-if="filteredWorkouts.length > 0"
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="workout in filteredWorkouts"
            :key="workout.id"
            class="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-md hover:ring-primary-500"
          >
            <!-- Workout Image -->
            <div class="aspect-video bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
              <div class="absolute inset-0 bg-black/20" />
              <div class="absolute bottom-4 left-4 right-4">
                <div class="flex items-center justify-between text-white">
                  <UBadge
                    :label="workout.difficulty"
                    :color="workout.difficulty === 'beginner' ? 'green' : workout.difficulty === 'intermediate' ? 'yellow' : 'red'"
                    variant="solid"
                  />
                  <div class="flex items-center space-x-2 text-sm">
                    <UIcon
                      name="i-heroicons-clock"
                      class="w-4 h-4"
                    />
                    <span>{{ workout.duration }} min</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Workout Content -->
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ workout.title }}
              </h3>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {{ workout.description }}
              </p>

              <!-- Workout Stats -->
              <div class="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-1">
                  <UIcon
                    name="i-heroicons-fire"
                    class="w-4 h-4"
                  />
                  <span>{{ workout.caloriesBurned }} cal</span>
                </div>
                <div class="flex items-center space-x-1">
                  <UIcon
                    name="i-heroicons-cube"
                    class="w-4 h-4"
                  />
                  <span>{{ workout.equipment.length }} equipment</span>
                </div>
              </div>

              <!-- Tags -->
              <div class="mt-4 flex flex-wrap gap-1">
                <UBadge
                  v-for="tag in workout.tags.slice(0, 3)"
                  :key="tag"
                  :label="tag"
                  variant="soft"
                  size="xs"
                />
              </div>

              <!-- Action Button -->
              <div class="mt-6">
                <UButton
                  :to="`/workouts/${workout.id}`"
                  block
                  color="primary"
                  variant="solid"
                >
                  Start Workout
                  <UIcon
                    name="i-heroicons-play"
                    class="ml-2 w-4 h-4"
                  />
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="text-center py-12"
        >
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="mx-auto h-12 w-12 text-gray-400"
          />
          <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No workouts found
          </h3>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or clearing the filters.
          </p>
          <UButton
            class="mt-4"
            variant="outline"
            @click="clearFilters"
          >
            Clear All Filters
          </UButton>
        </div>
      </UPageBody>
    </UContainer>
  </UPage>
</template>
