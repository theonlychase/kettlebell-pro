<script setup lang="ts">
import type { Program } from '~/types'

interface Props {
  program: Program
  showDescription?: boolean
  showFeatures?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
  showFeatures: true,
  size: 'md',
})

// Helper functions
const getCurrentPrice = () => props.program.salePrice || props.program.price

const getDiscountPercentage = () => {
  if (!props.program.salePrice) return 0
  return Math.round(((props.program.price - props.program.salePrice) / props.program.price) * 100)
}

const formatPrice = (price: number) => `$${price.toFixed(2)}`

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'green'
    case 'intermediate':
      return 'yellow'
    case 'advanced':
      return 'red'
    default:
      return 'gray'
  }
}

// Size-based classes
const cardClasses = computed(() => {
  const base = 'group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-lg hover:ring-primary-500'

  switch (props.size) {
    case 'sm':
      return `${base} max-w-sm`
    case 'lg':
      return `${base} max-w-2xl`
    default:
      return base
  }
})

const imageClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'aspect-square'
    case 'lg':
      return 'aspect-[16/9]'
    default:
      return 'aspect-video'
  }
})

const contentPadding = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'p-4'
    case 'lg':
      return 'p-8'
    default:
      return 'p-6'
  }
})

const titleSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-base'
    case 'lg':
      return 'text-xl'
    default:
      return 'text-lg'
  }
})

const maxFeatures = computed(() => {
  switch (props.size) {
    case 'sm':
      return 2
    case 'lg':
      return 6
    default:
      return 3
  }
})

// Cart functionality (placeholder)
const addToCart = () => {
  // This would integrate with the cart composable
  console.log('Adding to cart:', props.program.title)
}
</script>

<template>
  <div :class="cardClasses">
    <!-- Program Image -->
    <div :class="`${imageClasses} relative overflow-hidden`">
      <div class="absolute inset-0 bg-black/20" />

      <!-- Program Image (if available) -->
      <img
        v-if="program.imageUrl"
        :src="program.imageUrl"
        :alt="program.title"
        class="absolute inset-0 w-full h-full object-cover"
      >

      <!-- Overlay Content -->
      <div class="absolute inset-0 flex flex-col justify-between p-4">
        <!-- Top Row: Sale Badge and Level -->
        <div class="flex items-center justify-between">
          <UBadge
            v-if="program.salePrice"
            :label="`${getDiscountPercentage()}% OFF`"
            color="red"
            variant="solid"
            :size="size === 'sm' ? 'xs' : 'sm'"
          />
          <div v-else />

          <UBadge
            :label="program.level"
            :color="getLevelColor(program.level)"
            variant="solid"
            :size="size === 'sm' ? 'xs' : 'sm'"
          />
        </div>

        <!-- Bottom Row: Duration -->
        <div class="flex items-center justify-between text-white text-sm">
          <div class="flex items-center space-x-1">
            <UIcon
              name="i-heroicons-calendar-days"
              class="w-4 h-4"
            />
            <span>{{ program.duration }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <UIcon
              name="i-heroicons-fire"
              class="w-4 h-4"
            />
            <span>{{ program.workouts?.length || 0 }}+ workouts</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Program Content -->
    <div :class="contentPadding">
      <div class="flex items-start justify-between mb-3">
        <h3 :class="`${titleSize} font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-1`">
          {{ program.title }}
        </h3>
      </div>

      <p
        v-if="showDescription && program.description"
        :class="`text-sm text-gray-600 dark:text-gray-400 mb-4 ${size === 'lg' ? 'line-clamp-3' : 'line-clamp-2'}`"
      >
        {{ program.description }}
      </p>

      <!-- Features -->
      <div
        v-if="showFeatures && program.features?.length"
        class="mb-4"
      >
        <h4 :class="`text-sm font-medium text-gray-900 dark:text-white mb-2 ${size === 'sm' ? 'sr-only' : ''}`">
          What's Included:
        </h4>
        <ul class="space-y-1">
          <li
            v-for="feature in program.features.slice(0, maxFeatures)"
            :key="feature"
            class="flex items-center text-xs text-gray-600 dark:text-gray-400"
          >
            <UIcon
              name="i-heroicons-check"
              class="w-3 h-3 text-green-500 mr-2 flex-shrink-0"
            />
            {{ feature }}
          </li>
          <li
            v-if="program.features.length > maxFeatures"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            +{{ program.features.length - maxFeatures }} more features
          </li>
        </ul>
      </div>

      <!-- Pricing -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span :class="`font-bold text-gray-900 dark:text-white ${size === 'lg' ? 'text-2xl' : 'text-xl'}`">
            {{ formatPrice(getCurrentPrice()) }}
          </span>
          <span
            v-if="program.salePrice"
            :class="`text-gray-500 dark:text-gray-400 line-through ${size === 'sm' ? 'text-xs' : 'text-sm'}`"
          >
            {{ formatPrice(program.price) }}
          </span>
          <UBadge
            v-if="program.salePrice"
            :label="`Save ${formatPrice(program.price - program.salePrice)}`"
            color="green"
            variant="soft"
            size="xs"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2">
        <UButton
          :to="`/programs/${program.id}`"
          :size="size === 'sm' ? 'sm' : 'md'"
          color="primary"
          variant="solid"
          block
        >
          <span v-if="size === 'lg'">View Details</span>
          <span v-else>Details</span>
          <UIcon
            name="i-heroicons-arrow-right"
            :class="`ml-2 ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`"
          />
        </UButton>

        <UButton
          :size="size === 'sm' ? 'sm' : 'md'"
          color="primary"
          variant="outline"
          block
          @click="addToCart"
        >
          <span v-if="size === 'lg'">Add to Cart</span>
          <span v-else>Add to Cart</span>
          <UIcon
            name="i-heroicons-shopping-cart"
            :class="`ml-2 ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`"
          />
        </UButton>
      </div>

      <!-- Money Back Guarantee -->
      <div
        v-if="size !== 'sm'"
        class="mt-4 flex items-center justify-center space-x-2 text-xs text-green-600 dark:text-green-400"
      >
        <UIcon
          name="i-heroicons-shield-check"
          class="w-3 h-3"
        />
        <span>30-day money-back guarantee</span>
      </div>
    </div>
  </div>
</template>
