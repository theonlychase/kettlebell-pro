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

// Use cart composable for real cart functionality
const { getItemCount } = useCart()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center space-x-2"
      >
        <UIcon
          name="i-heroicons-fire"
          class="w-8 h-8 text-primary-600"
        />
        <span class="text-xl font-bold text-gray-900 dark:text-white">
          Kettlebell Pro
        </span>
      </NuxtLink>
    </template>

    <template #default>
      <nav class="hidden md:flex space-x-8">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          :class="{ 'text-primary-600 dark:text-primary-400': route.path.startsWith(item.to) }"
        >
          <UIcon
            :name="item.icon"
            class="w-4 h-4"
          />
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

        <!-- Mobile Menu Button -->
        <UButton
          color="neutral"
          variant="ghost"
          class="md:hidden"
          aria-label="Menu"
        >
          <UIcon
            name="i-heroicons-bars-3"
            class="w-5 h-5"
          />
        </UButton>
      </div>
    </template>
  </UHeader>
</template>
