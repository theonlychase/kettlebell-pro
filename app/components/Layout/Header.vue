<script setup lang="ts">

</script>

<template>
  <UHeader>
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

    <UNavigationMenu
      variant="link"
      :items="NAVIGATION"
    />

    <template #right>
      <div class="flex items-center space-x-2">
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
