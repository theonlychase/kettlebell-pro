<script setup lang="ts">
</script>

<template>
  <UHeader :ui="{ center: 'flex-1' }">
    <template #left>
      <NuxtLink
        :to="ROUTES.home"
        class="flex items-center"
      >
        <UIcon
          mode="svg"
          name="i-custom-kettlebell"
          class="w-12 h-12 fill-current"
        />

        <span class="text-xl font-bold text-gray-900 dark:text-white">
          Kettlebell Pro
        </span>
      </NuxtLink>
    </template>

    <UContentSearchButton
      class="flex-1"
      :collapsed="false"
      label="Search Exercises..."
    />

    <template #right>
      <div class="flex items-center space-x-2">
        <UContentSearchButton
          class="lg:hidden"
          label="Search Exercises..."
        />
        <UColorModeButton />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="NAVIGATION"
        highlight
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>
