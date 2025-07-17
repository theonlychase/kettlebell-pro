<script setup lang="ts">
const route = useRoute()

const navigation = [
  {
    label: 'Workouts',
    to: '/workouts',
    icon: 'i-heroicons-fire',
  },
  {
    label: 'Programs',
    to: '/programs',
    icon: 'i-heroicons-academic-cap',
  },
  {
    label: 'Content',
    to: '/content',
    icon: 'i-heroicons-book-open',
  },
]

// Cart functionality will be implemented with composables later
const cartItemsCount = ref(0)
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex items-center space-x-2">
        <UIcon name="i-heroicons-fire" class="w-8 h-8 text-primary-600" />
        <span class="text-xl font-bold text-gray-900 dark:text-white">
          Kettlebell Pro
        </span>
      </NuxtLink>
    </template>

    <template #center>
      <nav class="hidden md:flex space-x-8">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          :class="{ 'text-primary-600 dark:text-primary-400': route.path.startsWith(item.to) }"
        >
          <UIcon :name="item.icon" class="w-4 h-4" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </template>

    <template #right>
      <div class="flex items-center space-x-2">
        <!-- Cart Button -->
        <UButton
          to="/cart"
          color="neutral"
          variant="ghost"
          class="relative"
          aria-label="Shopping Cart"
        >
          <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5" />
          <UBadge
            v-if="cartItemsCount > 0"
            :label="cartItemsCount.toString()"
            color="primary"
            class="absolute -top-1 -right-1"
            size="xs"
          />
        </UButton>

        <UColorModeButton />

        <!-- Mobile Menu Button -->
        <UButton
          color="neutral"
          variant="ghost"
          class="md:hidden"
          aria-label="Menu"
        >
          <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
        </UButton>
      </div>
    </template>
  </UHeader>
</template>
