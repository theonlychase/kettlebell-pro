<script setup lang="ts">
const footerLinks = {
  exercises: [
    { label: 'All Exercises', to: '/exercises' },
  ],
  // content: [
  //   { label: 'Blog', to: '/blog' },
  // ],
  info: [
    { label: 'Contact', to: '/contact' },
  ],
}
</script>

<template>
  <UFooter :ui="{ top: 'page-container', right: 'max-md:justify-start', left: 'flex-col items-start' }">
<!--    <template #top>-->
<!--      <div class="grid grid-cols-2 md:grid-cols-3 gap-8">-->
<!--        &lt;!&ndash; Workouts &ndash;&gt;-->
<!--        <div>-->
<!--          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">-->
<!--            Exercises-->
<!--          </h3>-->
<!--          <ul class="space-y-2">-->
<!--            <li-->
<!--              v-for="link in footerLinks.exercises"-->
<!--              :key="link.to"-->
<!--            >-->
<!--              <NuxtLink-->
<!--                :to="link.to"-->
<!--                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"-->
<!--              >-->
<!--                {{ link.label }}-->
<!--              </NuxtLink>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->

<!--        &lt;!&ndash; Content &ndash;&gt;-->
<!--        <div>-->
<!--          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">-->
<!--            Content-->
<!--          </h3>-->
<!--          <ul class="space-y-2">-->
<!--            <li-->
<!--              v-for="link in footerLinks.content"-->
<!--              :key="link.to"-->
<!--            >-->
<!--              <NuxtLink-->
<!--                :to="link.to"-->
<!--                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"-->
<!--              >-->
<!--                {{ link.label }}-->
<!--              </NuxtLink>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->

<!--        &lt;!&ndash; Info &ndash;&gt;-->
<!--        <div>-->
<!--          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">-->
<!--            Info-->
<!--          </h3>-->
<!--          <ul class="space-y-2">-->
<!--            <li-->
<!--              v-for="link in footerLinks.info"-->
<!--              :key="link.to"-->
<!--            >-->
<!--              <NuxtLink-->
<!--                :to="link.to"-->
<!--                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"-->
<!--              >-->
<!--                {{ link.label }}-->
<!--              </NuxtLink>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->



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
<!--          <UButton-->
<!--            to="https://twitter.com/kettlebellpro"-->
<!--            target="_blank"-->
<!--            icon="i-simple-icons-twitter"-->
<!--            aria-label="Twitter"-->
<!--            color="neutral"-->
<!--            variant="ghost"-->
<!--            size="sm"-->
<!--          />-->
<!--          <UButton-->
<!--            to="https://instagram.com/kettlebellpro"-->
<!--            target="_blank"-->
<!--            icon="i-simple-icons-instagram"-->
<!--            aria-label="Instagram"-->
<!--            color="neutral"-->
<!--            variant="ghost"-->
<!--            size="sm"-->
<!--          />-->
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
