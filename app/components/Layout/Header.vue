<script setup lang="ts">
// Use cart composable for real cart functionality
const { getItemCount } = useCart()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        :to="ROUTES.home"
        class="flex items-center space-x-2"
      >
        <UIcon
          name="i-heroicons-fire"
          class="w-8 h-8 text-primary-600"
        />

        <span class="text-xl font-bold text-gray-900 dark:text-white">
          {{ APP_CONFIG.name }}
        </span>
      </NuxtLink>
    </template>

    <UNavigationMenu
      variant="link"
      :items="NAVIGATION"
    />

    <template #right>
      <div class="flex items-center space-x-2">
        <!-- Cart Button -->
        <UButton
          :to="ROUTES.cart"
          color="neutral"
          variant="ghost"
          class="relative"
          aria-label="Shopping Cart"
        >
          <UIcon
            name="i-heroicons-shopping-cart"
            class="w-5 h-5"
          />
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="scale-0 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-0 opacity-0"
          >
            <UBadge
              v-if="getItemCount > 0"
              :label="getItemCount.toString()"
              color="primary"
              class="absolute -top-1 -right-1"
              size="xs"
            />
          </Transition>
        </UButton>

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
