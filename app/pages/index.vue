<script setup lang="ts">
useSeoMeta({
  title: 'Kettlebell Pro - Transform Your Fitness',
  description: 'Professional kettlebell training programs, workouts, and educational content. Transform your fitness with expert-designed routines for all levels.',
})

const features = [
  {
    icon: 'i-heroicons-fire',
    title: 'Expert Workouts',
    description: 'Professional kettlebell routines designed by certified trainers for maximum results.',
  },
  {
    icon: 'i-heroicons-academic-cap',
    title: 'Structured Programs',
    description: 'Complete training programs with progressive difficulty and comprehensive tracking.',
  },
  {
    icon: 'i-heroicons-play-circle',
    title: 'Video Demonstrations',
    description: 'High-quality video guides for perfect form and technique mastery.',
  },
  {
    icon: 'i-heroicons-chart-bar-square',
    title: 'Progress Tracking',
    description: 'Monitor your improvements with detailed workout analytics and progression metrics.',
  },
  {
    icon: 'i-heroicons-book-open',
    title: 'Learning Center',
    description: 'Educational content, articles, and guides to enhance your fitness knowledge.',
  },
  {
    icon: 'i-heroicons-device-phone-mobile',
    title: 'Mobile Optimized',
    description: 'Perfect for on-the-go training with responsive design and offline capabilities.',
  },
]

const stats = [
  { label: 'Active Users', value: '10,000+' },
  { label: 'Workouts Available', value: '500+' },
  { label: 'Training Programs', value: '50+' },
  { label: 'Success Stories', value: '2,500+' },
]

const links = ref([
  {
    label: 'Get started',
    to: '/programs',
    icon: 'i-lucide-square-play',
  },
  {
    label: 'Learn more',
    to: '/workouts',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
  },
])

const journeyLinks = ref([
  {
    label: 'Programs',
    to: '/programs',
    icon: 'i-lucide-square-play',
    color: 'neutral',
  },
  {
    label: 'Workouts',
    to: '/workouts',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
  },
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      :links="links"
    >
      <template #title>
        Transform Your Fitness with <br>Kettlebell Pro
      </template>
      <template #description>
        Professional kettlebell training programs designed by experts.
        Build strength, burn fat, and achieve your fitness goals with our comprehensive workout library.
      </template>
    </UPageHero>

    <!-- Stats Section -->
    <section class="bg-white dark:bg-gray-900 py-16">
      <UContainer>
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {{ stat.value }}
            </div>
            <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features Section -->
    <section class="bg-gray-50 dark:bg-gray-800 py-24">
      <UContainer>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Our comprehensive platform provides all the tools and resources for your kettlebell training journey.
          </p>
        </div>

        <div class="mx-auto mt-16 max-w-7xl">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="relative rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-center">
                <UIcon
                  :name="feature.icon"
                  class="h-8 w-8 text-primary-600 dark:text-primary-400"
                />
                <h3 class="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                  {{ feature.title }}
                </h3>
              </div>
              <p class="mt-4 text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA Section -->
    <UPageSection
      title="Ready to Start Your Journey?"
      description="Join thousands of users who have transformed their fitness with Kettlebell Pro."
      :links="journeyLinks"
    />
  </div>
</template>
