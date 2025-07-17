<script setup lang="ts">
const footerLinks = {
  workouts: [
    { label: 'Browse Workouts', to: '/workouts' },
    { label: 'Beginner Workouts', to: '/workouts?difficulty=beginner' },
    { label: 'Advanced Workouts', to: '/workouts?difficulty=advanced' },
  ],
  programs: [
    { label: 'All Programs', to: '/programs' },
    { label: 'Beginner Programs', to: '/programs?level=beginner' },
    { label: 'Intermediate Programs', to: '/programs?level=intermediate' },
  ],
  content: [
    { label: 'Learning Center', to: '/content' },
    { label: 'Articles', to: '/content/articles' },
    { label: 'FAQ', to: '/faq' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
}
</script>

<template>
  <UFooter :ui="{ top: 'page-container', right: 'max-md:justify-start', left: 'flex-col items-start' }">
    <template #top>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Workouts -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
            Workouts
          </h3>
          <ul class="space-y-2">
            <li
              v-for="link in footerLinks.workouts"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Programs -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
            Programs
          </h3>
          <ul class="space-y-2">
            <li
              v-for="link in footerLinks.programs"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Content -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
            Content
          </h3>
          <ul class="space-y-2">
            <li
              v-for="link in footerLinks.content"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
            Company
          </h3>
          <ul class="space-y-2">
            <li
              v-for="link in footerLinks.company"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <template #left>
      <div class="flex items-center space-x-2">
        <UIcon
          name="i-heroicons-fire"
          class="w-6 h-6 text-primary-600"
        />
        <span class="font-bold text-gray-900 dark:text-white">
          Kettlebell Pro
        </span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Transform your fitness with professional kettlebell training programs.
      </p>
    </template>

    <template #right>
      <div class="flex flex-col items-end">
        <!--        <p class="text-sm text-gray-600 dark:text-gray-400"> -->
        <!--          © {{ currentYear }} Kettlebell Pro. All rights reserved. -->
        <!--        </p> -->
        <div class="flex items-center space-x-2 mt-2">
          <UButton
            to="https://twitter.com/kettlebellpro"
            target="_blank"
            icon="i-simple-icons-twitter"
            aria-label="Twitter"
            color="neutral"
            variant="ghost"
            size="sm"
          />
          <UButton
            to="https://instagram.com/kettlebellpro"
            target="_blank"
            icon="i-simple-icons-instagram"
            aria-label="Instagram"
            color="neutral"
            variant="ghost"
            size="sm"
          />
          <UButton
            to="https://youtube.com/kettlebellpro"
            target="_blank"
            icon="i-simple-icons-youtube"
            aria-label="YouTube"
            color="neutral"
            variant="ghost"
            size="sm"
          />
        </div>
      </div>
    </template>
  </UFooter>
</template>
