<script setup lang="ts">
useSeoMeta({
  title: 'Kettlebell Pro - Transform Your Fitness',
  description: 'Professional kettlebell training exercises. Transform your fitness.',
})

const features = [
  {
    icon: 'i-custom-kettlebell',
    mode: 'svg',
    title: 'Complete Kettlebell Library',
    description: 'Professional kettlebell exercises for maximum results.',
  },
  {
    icon: 'i-heroicons-numbered-list',
    title: 'Step by Step Instructions',
    description: 'Step-by-step instructions for each exercise',
  },
  {
    icon: 'i-heroicons-play-circle',
    title: 'Video Demonstrations',
    description: 'High-quality video guides coming soon.',
  },
]

const links = ref([
  {
    label: 'Get started',
    to: '/exercises',
  },
])

const journeyLinks = ref([
  {
    label: 'See All Exercises',
    to: '/exercises',
    color: 'neutral',
  },
])

const colorMode = useColorMode()

const particlesColor = computed(() => (colorMode.value === 'dark' ? '#FFFFFF' : '#000000'))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <!--  Hero Image  class="bg-[url('/images/hero2.webp')] bg-cover bg-center bg-no-repeat" -->
    <UPageHero
      :links="links"
      :ui="{ title: 'relative', description: 'relative', links: 'relative' }"
    >
      <template #title>
        Transform Your Fitness with <br>Kettlebell Pro
        <div class="absolute left-1/2 -translate-x-1/2 h-40 w-[40rem] max-sm:max-w-[320px] mx-auto">
          <div
            class="absolute left-1/2 -translate-x-1/2 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-primary-500 to-transparent blur-sm"
          />
          <div
            class="absolute left-1/2 -translate-x-1/2 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-primary-500 to-transparent"
          />
          <div
            class="absolute left-1/2 -translate-x-1/2 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm"
          />
          <div
            class="absolute left-1/2 -translate-x-1/2 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent"
          />

          <Sparkles
            background="transparent"
            :min-size="0.4"
            :max-size="1.4"
            :particle-density="1200"
            class="size-full"
            :particle-color="particlesColor"
          />

          <div
            class="absolute inset-0 size-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] dark:bg-[var(--ui-bg)]"
          />
        </div>
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
        <LazyUPageCard
          v-for="feature in features"
          :key="feature.title"
          :description="feature.description"
          spotlight
          variant="subtle"
          :ui="{ description: 'mt-4', title: 'text-lg', spotlight: 'bg-muted/90' }"
          hydrate-on-visible
        >
          <template #title>
            <div class="flex items-center gap-x-2">
              <UIcon
                :name="feature.icon"
                class="size-8 fill-current text-primary-600 dark:text-primary-400"
                :class="feature.icon.includes('custom') ? 'size-10' : 'size-8'"
              />
              {{ feature.title }}
            </div>
          </template>
        </LazyUPageCard>
      </template>
    </UPageSection>

    <!-- CTA Section -->
    <UPageSection
      class="[&_svg]:fill-current [&_svg]:w-8 [&_svg]:h-8"
      title="Ready to Start?"
      description="Transform your fitness with Kettlebell Pro"
      :links="journeyLinks"
    />
  </div>
</template>
