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
    <UPageSection
      class="bg-muted"
      title="Everything You Need to Succeed"
      description="Our comprehensive platform provides all the tools and resources for your kettlebell training journey."
    >
      <template #features>
        <UPageCard
          v-for="feature in features"
          :key="feature.title"
          :description="feature.description"
          spotlight
          :ui="{ description: 'mt-4', title: 'text-lg' }"
        >
          <template #title>
            <div class="flex items-center gap-x-2">
              <UIcon
                :name="feature.icon"
                class="size-8 text-primary-600 dark:text-primary-400"
              />
              {{ feature.title }}
            </div>
          </template>
        </UPageCard>
      </template>
    </UPageSection>

    <!-- CTA Section -->
    <UPageSection
      title="Ready to Start Your Journey?"
      description="Join thousands of users who have transformed their fitness with Kettlebell Pro."
      :links="journeyLinks"
    />
  </div>
</template>
