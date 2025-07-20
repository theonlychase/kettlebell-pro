<script setup lang="ts">

</script>

<template>
  <UFooter :ui="{ top: 'page-container', right: 'max-md:justify-start', left: 'flex-col items-start' }">
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
        <div class="flex items-center space-x-2 mt-2">
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
