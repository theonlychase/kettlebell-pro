<script setup lang="ts">
import { useCart } from '~/composables/useCart'

useSeoMeta({
  title: 'Shopping Cart - Kettlebell Pro',
  description: 'Review your selected training programs and proceed to checkout.',
})

// Use cart composable
const {
  cartItems,
  isLoading,
  removeFromCart,
  updateQuantity,
  clearCart,
  getSubtotal,
  getTax,
  getShipping,
  getTotal,
  getItemCount,
  isEmpty,
  formatPrice,
  getTotalSavings,
} = useCart()

// Reactive state
const isClearing = ref(false)

// Handle quantity update
const handleQuantityUpdate = (programId: string, newQuantity: number) => {
  if (newQuantity < 1) {
    removeFromCart(programId)
  }
  else {
    updateQuantity(programId, newQuantity)
  }
}

// Handle clear cart
const handleClearCart = async () => {
  isClearing.value = true
  try {
    clearCart()
  }
  finally {
    isClearing.value = false
  }
}

// Calculate item savings
const getItemSavings = (item: CartItem) => {
  if (item.program.salePrice && item.program.salePrice < item.program.price) {
    return (item.program.price - item.program.salePrice) * item.quantity
  }
  return 0
}

// Get current price for item
const getCurrentPrice = (program: Program) => program.salePrice || program.price

// Proceed to checkout
const proceedToCheckout = () => {
  if (!isEmpty.value) {
    navigateTo('/checkout')
  }
}
</script>

<template>
  <UPage>
    <UPageHeader
      title="Shopping Cart"
      :description="`${getItemCount} item${getItemCount !== 1 ? 's' : ''} in your cart`"
    />

    <UContainer>
      <UPageBody>
        <div
          v-if="isLoading"
          class="flex justify-center py-12"
        >
          <div class="text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4" />
            <p class="text-gray-600 dark:text-gray-400">
              Loading cart...
            </p>
          </div>
        </div>

        <div
          v-else-if="isEmpty"
          class="text-center py-12"
        >
          <UIcon
            name="i-heroicons-shopping-cart"
            class="mx-auto h-16 w-16 text-gray-400 mb-4"
          />
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any training programs to your cart yet.
            Browse our collection to find the perfect program for your fitness goals.
          </p>
          <div class="flex justify-center gap-4">
            <UButton
              to="/programs"
              color="primary"
              size="lg"
            >
              Browse Programs
              <UIcon
                name="i-heroicons-arrow-right"
                class="ml-2 w-4 h-4"
              />
            </UButton>
            <UButton
              to="/workouts"
              variant="outline"
              color="primary"
              size="lg"
            >
              Free Workouts
            </UButton>
          </div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                Cart Items ({{ getItemCount }})
              </h2>
              <UButton
                variant="ghost"
                color="red"
                size="sm"
                :loading="isClearing"
                @click="handleClearCart"
              >
                Clear Cart
              </UButton>
            </div>

            <div class="space-y-4">
              <div
                v-for="item in cartItems"
                :key="item.programId"
                class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
              >
                <div class="flex items-start space-x-4">
                  <!-- Program Image -->
                  <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex-shrink-0 relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/20" />
                    <div class="absolute inset-0 flex items-center justify-center">
                      <UIcon
                        name="i-heroicons-academic-cap"
                        class="w-8 h-8 text-white"
                      />
                    </div>
                  </div>

                  <!-- Program Details -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                          <NuxtLink
                            :to="`/programs/${item.programId}`"
                            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {{ item.program.title }}
                          </NuxtLink>
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {{ item.program.description }}
                        </p>

                        <!-- Program Meta -->
                        <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <div class="flex items-center space-x-1">
                            <UIcon
                              name="i-heroicons-calendar-days"
                              class="w-4 h-4"
                            />
                            <span>{{ item.program.duration }}</span>
                          </div>
                          <div class="flex items-center space-x-1">
                            <UIcon
                              name="i-heroicons-academic-cap"
                              class="w-4 h-4"
                            />
                            <span class="capitalize">{{ item.program.level }}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Remove Button -->
                      <UButton
                        variant="ghost"
                        color="red"
                        size="sm"
                        icon="i-heroicons-trash"
                        @click="removeFromCart(item.programId)"
                      />
                    </div>

                    <!-- Pricing and Quantity -->
                    <div class="flex items-center justify-between mt-4">
                      <div class="flex items-center space-x-2">
                        <span class="text-lg font-semibold text-gray-900 dark:text-white">
                          {{ formatPrice(getCurrentPrice(item.program)) }}
                        </span>
                        <span
                          v-if="item.program.salePrice"
                          class="text-sm text-gray-500 dark:text-gray-400 line-through"
                        >
                          {{ formatPrice(item.program.price) }}
                        </span>
                        <UBadge
                          v-if="getItemSavings(item) > 0"
                          :label="`Save ${formatPrice(getItemSavings(item))}`"
                          color="green"
                          variant="soft"
                          size="xs"
                        />
                      </div>

                      <!-- Quantity Controls -->
                      <div class="flex items-center space-x-2">
                        <UButton
                          variant="outline"
                          color="gray"
                          size="xs"
                          icon="i-heroicons-minus"
                          :disabled="item.quantity <= 1"
                          @click="handleQuantityUpdate(item.programId, item.quantity - 1)"
                        />
                        <span class="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                          {{ item.quantity }}
                        </span>
                        <UButton
                          variant="outline"
                          color="gray"
                          size="xs"
                          icon="i-heroicons-plus"
                          @click="handleQuantityUpdate(item.programId, item.quantity + 1)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Continue Shopping -->
            <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
              <UButton
                to="/programs"
                variant="outline"
                color="primary"
              >
                <UIcon
                  name="i-heroicons-arrow-left"
                  class="mr-2 w-4 h-4"
                />
                Continue Shopping
              </UButton>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>

              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ formatPrice(getSubtotal) }}
                  </span>
                </div>

                <div
                  v-if="getTotalSavings > 0"
                  class="flex justify-between text-green-600 dark:text-green-400"
                >
                  <span>Savings</span>
                  <span class="font-medium">
                    -{{ formatPrice(getTotalSavings) }}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Tax</span>
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ formatPrice(getTax) }}
                  </span>
                </div>

                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ getShipping === 0 ? 'Free' : formatPrice(getShipping) }}
                  </span>
                </div>

                <div
                  v-if="getShipping > 0"
                  class="text-xs text-gray-500 dark:text-gray-400"
                >
                  Free shipping on orders over $50
                </div>

                <div class="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div class="flex justify-between">
                    <span class="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                    <span class="text-base font-semibold text-gray-900 dark:text-white">
                      {{ formatPrice(getTotal) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Checkout Button -->
              <div class="mt-6">
                <UButton
                  block
                  color="primary"
                  size="lg"
                  class="font-semibold"
                  @click="proceedToCheckout"
                >
                  Proceed to Checkout
                  <UIcon
                    name="i-heroicons-arrow-right"
                    class="ml-2 w-4 h-4"
                  />
                </UButton>
              </div>

              <!-- Security Notice -->
              <div class="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <UIcon
                  name="i-heroicons-lock-closed"
                  class="w-3 h-3"
                />
                <span>Secure checkout with SSL encryption</span>
              </div>

              <!-- Money Back Guarantee -->
              <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div class="flex items-center space-x-2 text-green-700 dark:text-green-400">
                  <UIcon
                    name="i-heroicons-shield-check"
                    class="w-4 h-4"
                  />
                  <span class="text-xs font-medium">30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UPageBody>
    </UContainer>
  </UPage>
</template>
