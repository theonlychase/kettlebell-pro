<script setup lang="ts">
import type { Program } from '~/types'

const route = useRoute()
const programId = route.params.id as string

// Mock program data - in real app, this would come from API
const mockProgram: Program = {
  id: programId,
  title: 'Beginner Kettlebell Mastery',
  description: 'A comprehensive 4-week program designed for complete beginners. Learn proper form, build strength, and develop confidence with kettlebell training. This program takes you from zero experience to confidently performing fundamental kettlebell movements with perfect technique.',
  price: 49.99,
  salePrice: 39.99,
  duration: '4 weeks',
  level: 'beginner',
  workouts: [], // Would be populated with actual workout data
  features: [
    '20+ guided video workouts',
    'Progressive difficulty levels',
    'Proper form instruction',
    'Nutrition guidelines',
    'Progress tracking tools',
    'Community support access',
    'Downloadable workout PDFs',
    'Email support from trainers',
    'Mobile app access',
    '30-day money-back guarantee',
  ],
  imageUrl: '/images/programs/beginner-mastery.jpg',
}

// Set SEO meta
useSeoMeta({
  title: `${mockProgram.title} - Kettlebell Pro`,
  description: mockProgram.description,
})

// Helper functions
const getCurrentPrice = () => mockProgram.salePrice || mockProgram.price
const getDiscountPercentage = () => {
  if (!mockProgram.salePrice) return 0
  return Math.round(((mockProgram.price - mockProgram.salePrice) / mockProgram.price) * 100)
}
const formatPrice = (price: number) => `$${price.toFixed(2)}`

// Program details
const programDetails = [
  { label: 'Duration', value: mockProgram.duration, icon: 'i-heroicons-calendar-days' },
  { label: 'Level', value: mockProgram.level, icon: 'i-heroicons-academic-cap' },
  { label: 'Workouts', value: '20+', icon: 'i-heroicons-fire' },
  { label: 'Equipment', value: 'Kettlebell', icon: 'i-heroicons-cube' },
]

// What you'll learn sections
const learningOutcomes = [
  {
    title: 'Fundamental Movements',
    description: 'Master the essential kettlebell exercises including swings, goblet squats, and Turkish get-ups.',
    icon: 'i-heroicons-academic-cap',
  },
  {
    title: 'Proper Form & Safety',
    description: 'Learn correct technique to prevent injury and maximize effectiveness of every movement.',
    icon: 'i-heroicons-shield-check',
  },
  {
    title: 'Progressive Training',
    description: 'Follow a structured progression that builds strength and confidence week by week.',
    icon: 'i-heroicons-chart-bar-square',
  },
  {
    title: 'Workout Planning',
    description: 'Understand how to structure your own kettlebell workouts for continued progress.',
    icon: 'i-heroicons-clipboard-document-list',
  },
]

// Program curriculum
const curriculum = [
  {
    week: 1,
    title: 'Foundation Week',
    description: 'Introduction to kettlebell basics and fundamental movement patterns.',
    workouts: ['Kettlebell Introduction', 'Basic Swing Mechanics', 'Goblet Squat Fundamentals', 'Deadlift Basics', 'Recovery & Mobility'],
  },
  {
    week: 2,
    title: 'Building Strength',
    description: 'Increase intensity and add new movement patterns to your routine.',
    workouts: ['Power Development', 'Single Arm Swings', 'Overhead Press', 'Lunges & Steps', 'Core Integration'],
  },
  {
    week: 3,
    title: 'Complex Movements',
    description: 'Learn more advanced exercises and combination movements.',
    workouts: ['Turkish Get-Up Intro', 'Clean & Press', 'Windmills', 'Complex Combinations', 'Conditioning Circuits'],
  },
  {
    week: 4,
    title: 'Mastery & Beyond',
    description: 'Perfect your technique and learn to create your own workouts.',
    workouts: ['Advanced Techniques', 'Workout Design', 'Testing & Assessment', 'Future Planning', 'Graduation Workout'],
  },
]

// Reactive state
const selectedTab = ref('overview')

// Cart functionality (placeholder)
const addToCart = () => {
  // This would integrate with the cart composable
  console.log('Adding to cart:', mockProgram.title)
}

const buyNow = () => {
  // This would redirect to checkout
  navigateTo(`/checkout/${programId}`)
}
</script>

<template>
  <UPage>
    <UPageHero>
      <template #title>
        {{ mockProgram.title }}
      </template>
      <template #description>
        {{ mockProgram.description }}
      </template>
      <template #links>
        <div class="flex items-center space-x-4 mb-6">
          <UBadge
            :label="mockProgram.level"
            :color="mockProgram.level === 'beginner' ? 'green' : mockProgram.level === 'intermediate' ? 'yellow' : 'red'"
            variant="solid"
            size="lg"
          />
          <div v-if="mockProgram.salePrice">
            <UBadge
              :label="`${getDiscountPercentage()}% OFF`"
              color="red"
              variant="solid"
              size="lg"
            />
          </div>
        </div>

        <!-- Program Stats -->
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div
            v-for="detail in programDetails"
            :key="detail.label"
            class="flex items-center space-x-3"
          >
            <UIcon :name="detail.icon" class="w-5 h-5" />
            <div>
              <div class="text-sm opacity-75">
                {{ detail.label }}
              </div>
              <div class="font-medium capitalize">
                {{ detail.value }}
              </div>
            </div>
          </div>
        </div>

        <!-- Purchase Actions -->
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton
            size="xl"
            color="primary"
            variant="solid"
            class="font-semibold"
            @click="buyNow"
          >
            Buy Now - {{ formatPrice(getCurrentPrice()) }}
            <UIcon name="i-heroicons-arrow-right" class="ml-2 w-5 h-5" />
          </UButton>
          <UButton
            size="xl"
            color="primary"
            variant="outline"
            class="font-semibold"
            @click="addToCart"
          >
            Add to Cart
            <UIcon name="i-heroicons-shopping-cart" class="ml-2 w-5 h-5" />
          </UButton>
        </div>

        <div v-if="mockProgram.salePrice" class="mt-4 text-center">
          <span class="text-sm opacity-75">
            Regular price: <span class="line-through">{{ formatPrice(mockProgram.price) }}</span>
          </span>
        </div>
      </template>
    </UPageHero>

    <UPageBody>
      <!-- Navigation Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="-mb-px flex space-x-8">
            <button
              class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
              :class="selectedTab === 'overview'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'"
              @click="selectedTab = 'overview'"
            >
              Overview
            </button>
            <button
              class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
              :class="selectedTab === 'curriculum'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'"
              @click="selectedTab = 'curriculum'"
            >
              Curriculum
            </button>
            <button
              class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
              :class="selectedTab === 'features'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'"
              @click="selectedTab = 'features'"
            >
              What's Included
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div v-if="selectedTab === 'overview'" class="space-y-12">
        <!-- What You'll Learn -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            What You'll Learn
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="outcome in learningOutcomes"
              :key="outcome.title"
              class="flex items-start space-x-4"
            >
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <UIcon :name="outcome.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ outcome.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ outcome.description }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Program Benefits -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Why Choose This Program?
          </h2>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UIcon name="i-heroicons-user-group" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Expert Instruction
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Learn from certified kettlebell instructors with years of experience.
                </p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UIcon name="i-heroicons-chart-bar-square" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Progressive Structure
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Carefully designed progression that builds skills systematically.
                </p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UIcon name="i-heroicons-device-phone-mobile" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Lifetime Access
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Access your program anytime, anywhere, on any device.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Curriculum Tab -->
      <div v-if="selectedTab === 'curriculum'" class="space-y-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          4-Week Program Curriculum
        </h2>
        <div class="space-y-6">
          <div
            v-for="week in curriculum"
            :key="week.week"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
          >
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {{ week.week }}
                </span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Week {{ week.week }}: {{ week.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ week.description }}
                </p>
              </div>
            </div>
            <div class="ml-16">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">
                Workouts:
              </h4>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li
                  v-for="workout in week.workouts"
                  :key="workout"
                  class="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <UIcon name="i-heroicons-play-circle" class="w-4 h-4 text-primary-500 mr-2" />
                  {{ workout }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Tab -->
      <div v-if="selectedTab === 'features'" class="space-y-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Everything Included in Your Program
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="feature in mockProgram.features"
            :key="feature"
            class="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
          >
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500 flex-shrink-0" />
            <span class="text-gray-900 dark:text-white">{{ feature }}</span>
          </div>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
