<script setup lang="ts">
import type { Program } from '~/types'

useSeoMeta({
  title: 'Training Programs - Kettlebell Pro',
  description: 'Browse our comprehensive collection of kettlebell training programs. From beginner to advanced, find the perfect program to achieve your fitness goals.',
})

// Mock data - will be replaced with API calls later
const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Beginner Kettlebell Mastery',
    description: 'A comprehensive 4-week program designed for complete beginners. Learn proper form, build strength, and develop confidence with kettlebell training.',
    price: 49.99,
    salePrice: 39.99,
    duration: '4 weeks',
    level: 'beginner',
    workouts: [],
    features: [
      '20+ guided video workouts',
      'Progressive difficulty levels',
      'Proper form instruction',
      'Nutrition guidelines',
      'Progress tracking tools',
      'Community support access',
    ],
    imageUrl: '/images/programs/beginner-mastery.jpg',
  },
  {
    id: '2',
    title: 'Intermediate Strength Builder',
    description: 'Take your kettlebell training to the next level with this 6-week intermediate program focusing on strength, power, and conditioning.',
    price: 79.99,
    duration: '6 weeks',
    level: 'intermediate',
    workouts: [],
    features: [
      '30+ challenging workouts',
      'Advanced movement patterns',
      'Strength and power focus',
      'Periodized training plan',
      'Recovery protocols',
      'Performance tracking',
    ],
    imageUrl: '/images/programs/intermediate-strength.jpg',
  },
  {
    id: '3',
    title: 'Advanced Athletic Performance',
    description: 'Elite-level kettlebell training program for serious athletes. 8 weeks of intense, sport-specific conditioning and strength development.',
    price: 99.99,
    salePrice: 79.99,
    duration: '8 weeks',
    level: 'advanced',
    workouts: [],
    features: [
      '40+ elite-level workouts',
      'Sport-specific training',
      'Advanced periodization',
      'Competition preparation',
      'Injury prevention protocols',
      'One-on-one coaching calls',
    ],
    imageUrl: '/images/programs/advanced-performance.jpg',
  },
  {
    id: '4',
    title: 'Fat Loss Accelerator',
    description: 'High-intensity kettlebell program designed for maximum fat loss. Combine strength training with metabolic conditioning.',
    price: 59.99,
    duration: '6 weeks',
    level: 'intermediate',
    workouts: [],
    features: [
      '25+ HIIT workouts',
      'Metabolic conditioning focus',
      'Nutrition meal plans',
      'Body composition tracking',
      'Supplement guidance',
      'Progress photos system',
    ],
    imageUrl: '/images/programs/fat-loss.jpg',
  },
]

// Reactive state
const searchQuery = ref('')
const selectedLevel = ref(null)
const selectedPriceRange = ref(null)
const sortBy = ref('popularity')

// Filter options
const levelOptions = [
  { label: 'All Levels', value: null },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]

const priceRangeOptions = [
  { label: 'Any Price', value: null },
  { label: 'Under $50', value: '0-50' },
  { label: '$50 - $75', value: '50-75' },
  { label: '$75+', value: '75-999' },
]

const sortOptions = [
  { label: 'Most Popular', value: 'popularity' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest First', value: 'newest' },
]

// Helper functions
const getCurrentPrice = (program: Program) => program.salePrice || program.price
const getDiscountPercentage = (program: Program) => {
  if (!program.salePrice) return 0
  return Math.round(((program.price - program.salePrice) / program.price) * 100)
}
const formatPrice = (price: number) => `$${price.toFixed(2)}`

// Computed filtered and sorted programs
const filteredPrograms = computed(() => {
  const filtered = mockPrograms.filter((program) => {
    const matchesSearch = !searchQuery.value
      || program.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      || program.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesLevel = !selectedLevel.value || program.level === selectedLevel.value

    const currentPrice = getCurrentPrice(program)
    let matchesPrice = true
    if (selectedPriceRange.value) {
      const [min, max] = selectedPriceRange.value.split('-').map(Number)
      matchesPrice = currentPrice >= min && currentPrice <= max
    }

    return matchesSearch && matchesLevel && matchesPrice
  })

  // Apply sorting
  if (sortBy.value === 'price-asc') {
    filtered.sort((a, b) => getCurrentPrice(a) - getCurrentPrice(b))
  }
  else if (sortBy.value === 'price-desc') {
    filtered.sort((a, b) => getCurrentPrice(b) - getCurrentPrice(a))
  }
  else if (sortBy.value === 'newest') {
    filtered.reverse()
  }

  return filtered
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedLevel.value = null
  selectedPriceRange.value = null
  sortBy.value = 'popularity'
}
</script>

<template>
  <UPage>
    <UPageHeader
      title="Training Programs"
      description="Transform your fitness with our comprehensive kettlebell training programs designed by experts."
    />

    <UPageBody>
      <UContainer>
        <!-- Search and Filters -->
        <div class="mb-8 space-y-4">
          <!-- Search Bar -->
          <div class="relative">
            <UInput
              v-model="searchQuery"
              placeholder="Search programs..."
              icon="i-heroicons-magnifying-glass"
              size="lg"
              class="w-full"
            />
          </div>

          <!-- Filter Controls -->
          <div class="flex flex-wrap gap-4">
            <USelect
              v-model="selectedLevel"
              :items="levelOptions"
              placeholder="Level"
              class="min-w-[150px]"
            />
            <USelect
              v-model="selectedPriceRange"
              :items="priceRangeOptions"
              placeholder="Price Range"
              class="min-w-[150px]"
            />
            <USelect
              v-model="sortBy"
              :items="sortOptions"
              placeholder="Sort By"
              class="min-w-[180px]"
            />
            <UButton
              variant="outline"
              color="gray"
              @click="clearFilters"
            >
              Clear Filters
            </UButton>
          </div>

          <!-- Results Count -->
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ filteredPrograms.length }} program{{ filteredPrograms.length !== 1 ? 's' : '' }} found
          </div>
        </div>

        <!-- Programs Grid -->
        <UPricingPlans
          v-if="filteredPrograms.length > 0"
          class="!grid-cols-3"
        >
          <UPricingPlan
            v-for="program in filteredPrograms"
            :key="program.id"
            :title="program.title"
            :description="program.description"
            :price="formatPrice(getCurrentPrice(program))"
            :discount="program.salePrice"
            :features="program.features"
            variant="subtle"
            :ui="{ title: '!text-xl sm:!text-xl', description: '!text-[15px]', price: 'text-2xl sm:text-3xl' }"
          >
            <template #header>
              <UBadge
                class="capitalize"
                :label="program.level"
                color="neutral"
                variant="outline"
              />
            </template>
            <template #button>
              <div class="space-y-2">
                <UButton
                  :to="`/programs/${program.id}`"
                  block
                  color="primary"
                  variant="solid"
                >
                  View Details
                  <UIcon
                    name="i-heroicons-arrow-right"
                    class="ml-2 w-4 h-4"
                  />
                </UButton>
                <UButton
                  block
                  color="primary"
                  variant="outline"
                  @click="() => {}"
                >
                  Add to Cart
                  <UIcon
                    name="i-heroicons-shopping-cart"
                    class="ml-2 w-4 h-4"
                  />
                </UButton>
              </div>
            </template>
          </UPricingPlan>
        </UPricingPlans>

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
            No programs found
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
      </UContainer>
    </UPageBody>
  </UPage>
</template>
