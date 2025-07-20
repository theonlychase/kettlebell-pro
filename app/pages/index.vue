<script setup lang="ts">
useSeoMeta({
  title: 'Kettlebell Pro - Transform Your Fitness',
  description: 'Professional kettlebell exercises, workouts, and educational content. Transform your fitness with expert-designed routines for all levels.',
})

const features = [
  {
    icon: 'i-lucide-dumbbell',
    title: 'Complete Kettlebell Library',
    description: 'Professional kettlebell exercises & routines for maximum results.',
  },
  {
    icon: 'i-heroicons-trophy',
    title: 'Step by Step Instructions',
    description: 'Step-by-step instructions for each exercise',
  },
  {
    icon: 'i-heroicons-play-circle',
    title: 'Video Demonstrations',
    description: 'High-quality video guides for perfect form and technique mastery.',
  },
]

const links = ref([
  {
    label: 'Get started',
    to: '/exercises',
    icon: 'i-lucide-biceps-flexed',
  },
  // {
  //   label: 'Learn more',
  //   to: '/workouts',
  //   color: 'neutral',
  //   variant: 'subtle',
  //   trailingIcon: 'i-lucide-arrow-right',
  // },
])

const journeyLinks = ref([
  {
    label: 'See All Exercises',
    to: '/exercises',
    icon: 'i-lucide-dumbbell',
    color: 'neutral',
  },
  // {
  //   label: 'Workouts',
  //   to: '/workouts',
  //   color: 'neutral',
  //   variant: 'subtle',
  //   trailingIcon: 'i-lucide-arrow-right',
  // },
])
</script>

<template>
  <div>
    <!-- Hero Section -->
    <UPageHero :links="links">
      <template #title>
        Transform Your Fitness with <br>Kettlebell Pro
      </template>
      <template #description>
        Professional kettlebell training exercises.<br>
        Build strength, burn fat, and achieve your fitness goals.
      </template>
    </UPageHero>

    <!-- Features Section -->
    <UPageSection
      class="bg-muted border-y border-y-muted"
      title="Everything You Need to Succeed"
      description="All the tools and resources for your kettlebell training journey."
    >
      <template #features>
        <UPageCard
          v-for="feature in features"
          :key="feature.title"
          :description="feature.description"
          spotlight
          variant="subtle"
          :ui="{ description: 'mt-4', title: 'text-lg', spotlight: 'bg-muted/90' }"
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
      title="Ready to Start?"
      description="Transform your fitness with Kettlebell Pro"
      :links="journeyLinks"
    />
  </div>
</template>
