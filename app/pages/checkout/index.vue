<script setup lang="ts">
import { useCart } from '~/composables/useCart'

useSeoMeta({
  title: 'Checkout - Kettlebell Pro',
  description: 'Complete your purchase and start your kettlebell training journey.',
})

// Use cart composable
const {
  cartItems,
  isEmpty,
  getSubtotal,
  getTax,
  getShipping,
  getTotal,
  formatPrice,
  getTotalSavings,
  clearCart,
} = useCart()

// Redirect if cart is empty
if (isEmpty.value) {
  await navigateTo('/cart')
}

// Form state
const billingForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
})

const paymentForm = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  nameOnCard: '',
})

// UI state
const currentStep = ref(1)
const isProcessing = ref(false)
const orderComplete = ref(false)
const orderId = ref('')

// Form validation
const billingErrors = ref<Record<string, string>>({})
const paymentErrors = ref<Record<string, string>>({})

// Validate billing form
const validateBillingForm = () => {
  const errors: Record<string, string> = {}

  if (!billingForm.value.firstName.trim()) {
    errors.firstName = 'First name is required'
  }
  if (!billingForm.value.lastName.trim()) {
    errors.lastName = 'Last name is required'
  }
  if (!billingForm.value.email.trim()) {
    errors.email = 'Email is required'
  }
  else if (!/\S+@\S+\.\S+/.test(billingForm.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!billingForm.value.address.trim()) {
    errors.address = 'Address is required'
  }
  if (!billingForm.value.city.trim()) {
    errors.city = 'City is required'
  }
  if (!billingForm.value.state.trim()) {
    errors.state = 'State is required'
  }
  if (!billingForm.value.zipCode.trim()) {
    errors.zipCode = 'ZIP code is required'
  }

  billingErrors.value = errors
  return Object.keys(errors).length === 0
}

// Validate payment form
const validatePaymentForm = () => {
  const errors: Record<string, string> = {}

  if (!paymentForm.value.cardNumber.trim()) {
    errors.cardNumber = 'Card number is required'
  } else if (!/^\d{16}$/.test(paymentForm.value.cardNumber.replace(/\s/g, ''))) {
    errors.cardNumber = 'Please enter a valid 16-digit card number'
  }
  if (!paymentForm.value.expiryDate.trim()) {
    errors.expiryDate = 'Expiry date is required'
  } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.value.expiryDate)) {
    errors.expiryDate = 'Please enter expiry date in MM/YY format'
  }
  if (!paymentForm.value.cvv.trim()) {
    errors.cvv = 'CVV is required'
  } else if (!/^\d{3,4}$/.test(paymentForm.value.cvv)) {
    errors.cvv = 'Please enter a valid CVV'
  }
  if (!paymentForm.value.nameOnCard.trim()) {
    errors.nameOnCard = 'Name on card is required'
  }

  paymentErrors.value = errors
  return Object.keys(errors).length === 0
}

// Step navigation
const nextStep = () => {
  if (currentStep.value === 1 && validateBillingForm()) {
    currentStep.value = 2
  } else if (currentStep.value === 2 && validatePaymentForm()) {
    currentStep.value = 3
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Process payment
const processPayment = async () => {
  if (!validatePaymentForm()) return

  isProcessing.value = true

  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate order ID
    orderId.value = `KB-${Date.now()}`

    // Clear cart
    clearCart()

    // Mark order as complete
    orderComplete.value = true
    currentStep.value = 4
  } catch (error) {
    console.error('Payment processing failed:', error)
    // Handle payment error
  } finally {
    isProcessing.value = false
  }
}

// Format card number for display
const formatCardNumber = (value: string) => {
  return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
}

// Handle card number input
const handleCardNumberInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\s/g, '').replace(/\D/g, '')
  paymentForm.value.cardNumber = formatCardNumber(value)
}

// Handle expiry date input
const handleExpiryInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  paymentForm.value.expiryDate = value
}

// Countries list
const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Australia', value: 'AU' },
]

// US States list (simplified)
const states = [
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
  { label: 'Florida', value: 'FL' },
  // Add more states as needed
]
</script>

<template>
  <UPage>
    <UPageHeader
      title="Checkout"
      description="Complete your purchase and start your training journey"
    />

    <UPageBody>
      <div class="max-w-6xl mx-auto">
        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center justify-center space-x-4">
            <div
              v-for="step in 4"
              :key="step"
              class="flex items-center"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
                :class="step <= currentStep
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
              >
                {{ step }}
              </div>
              <div
                v-if="step < 4"
                class="w-16 h-0.5 mx-2 transition-colors"
                :class="step < currentStep
                  ? 'bg-primary-600'
                  : 'bg-gray-200 dark:bg-gray-700'"
              />
            </div>
          </div>
          <div class="flex justify-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span v-if="currentStep === 1">Billing Information</span>
            <span v-else-if="currentStep === 2">Payment Details</span>
            <span v-else-if="currentStep === 3">Review Order</span>
            <span v-else>Order Complete</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Step 1: Billing Information -->
            <div v-if="currentStep === 1" class="space-y-6">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Billing Information
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <UFormGroup
                      label="First Name"
                      :error="billingErrors.firstName"
                    >
                      <UInput
                        v-model="billingForm.firstName"
                        placeholder="Enter first name"
                        :error="!!billingErrors.firstName"
                      />
                    </UFormGroup>
                  </div>
                  <div>
                    <UFormGroup
                      label="Last Name"
                      :error="billingErrors.lastName"
                    >
                      <UInput
                        v-model="billingForm.lastName"
                        placeholder="Enter last name"
                        :error="!!billingErrors.lastName"
                      />
                    </UFormGroup>
                  </div>
                  <div class="md:col-span-2">
                    <UFormGroup
                      label="Email Address"
                      :error="billingErrors.email"
                    >
                      <UInput
                        v-model="billingForm.email"
                        type="email"
                        placeholder="Enter email address"
                        :error="!!billingErrors.email"
                      />
                    </UFormGroup>
                  </div>
                  <div class="md:col-span-2">
                    <UFormGroup
                      label="Phone Number"
                    >
                      <UInput
                        v-model="billingForm.phone"
                        type="tel"
                        placeholder="Enter phone number"
                      />
                    </UFormGroup>
                  </div>
                  <div class="md:col-span-2">
                    <UFormGroup
                      label="Address"
                      :error="billingErrors.address"
                    >
                      <UInput
                        v-model="billingForm.address"
                        placeholder="Enter street address"
                        :error="!!billingErrors.address"
                      />
                    </UFormGroup>
                  </div>
                  <div>
                    <UFormGroup
                      label="City"
                      :error="billingErrors.city"
                    >
                      <UInput
                        v-model="billingForm.city"
                        placeholder="Enter city"
                        :error="!!billingErrors.city"
                      />
                    </UFormGroup>
                  </div>
                  <div>
                    <UFormGroup
                      label="State"
                      :error="billingErrors.state"
                    >
                      <USelect
                        v-model="billingForm.state"
                        :items="states"
                        placeholder="Select state"
                        :error="!!billingErrors.state"
                      />
                    </UFormGroup>
                  </div>
                  <div>
                    <UFormGroup
                      label="ZIP Code"
                      :error="billingErrors.zipCode"
                    >
                      <UInput
                        v-model="billingForm.zipCode"
                        placeholder="Enter ZIP code"
                        :error="!!billingErrors.zipCode"
                      />
                    </UFormGroup>
                  </div>
                  <div>
                    <UFormGroup
                      label="Country"
                    >
                      <USelect
                        v-model="billingForm.country"
                        :items="countries"
                      />
                    </UFormGroup>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Payment Details -->
            <div v-else-if="currentStep === 2" class="space-y-6">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Payment Details
                </h2>

                <div class="space-y-4">
                  <div>
                    <UFormGroup
                      label="Card Number"
                      :error="paymentErrors.cardNumber"
                    >
                      <UInput
                        :model-value="paymentForm.cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxlength="19"
                        :error="!!paymentErrors.cardNumber"
                        @input="handleCardNumberInput"
                      />
                    </UFormGroup>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <UFormGroup
                        label="Expiry Date"
                        :error="paymentErrors.expiryDate"
                      >
                        <UInput
                          :model-value="paymentForm.expiryDate"
                          placeholder="MM/YY"
                          maxlength="5"
                          :error="!!paymentErrors.expiryDate"
                          @input="handleExpiryInput"
                        />
                      </UFormGroup>
                    </div>
                    <div>
                      <UFormGroup
                        label="CVV"
                        :error="paymentErrors.cvv"
                      >
                        <UInput
                          v-model="paymentForm.cvv"
                          placeholder="123"
                          maxlength="4"
                          :error="!!paymentErrors.cvv"
                        />
                      </UFormGroup>
                    </div>
                  </div>
                  <div>
                    <UFormGroup
                      label="Name on Card"
                      :error="paymentErrors.nameOnCard"
                    >
                      <UInput
                        v-model="paymentForm.nameOnCard"
                        placeholder="Enter name as it appears on card"
                        :error="!!paymentErrors.nameOnCard"
                      />
                    </UFormGroup>
                  </div>
                </div>

                <!-- Security Notice -->
                <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div class="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                    <UIcon name="i-heroicons-shield-check" class="w-5 h-5" />
                    <span class="text-sm font-medium">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Review Order -->
            <div v-else-if="currentStep === 3" class="space-y-6">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Review Your Order
                </h2>

                <!-- Order Items -->
                <div class="space-y-4 mb-6">
                  <div
                    v-for="item in cartItems"
                    :key="item.programId"
                    class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex-shrink-0 relative overflow-hidden">
                      <div class="absolute inset-0 bg-black/20" />
                      <div class="absolute inset-0 flex items-center justify-center">
                        <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 dark:text-white">
                        {{ item.program.title }}
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {{ item.quantity }}
                      </p>
                    </div>
                    <div class="text-right">
                      <div class="font-semibold text-gray-900 dark:text-white">
                        {{ formatPrice((item.program.salePrice || item.program.price) * item.quantity) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Billing Summary -->
                <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
                    Billing Address
                  </h3>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    <p>{{ billingForm.firstName }} {{ billingForm.lastName }}</p>
                    <p>{{ billingForm.address }}</p>
                    <p>{{ billingForm.city }}, {{ billingForm.state }} {{ billingForm.zipCode }}</p>
                    <p>{{ billingForm.email }}</p>
                  </div>
                </div>
              </div>

              <!-- Final Checkout Button -->
              <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                <UButton
                  block
                  color="primary"
                  size="xl"
                  :loading="isProcessing"
                  class="font-semibold"
                  @click="processPayment"
                >
                  {{ isProcessing ? 'Processing Payment...' : `Complete Purchase - ${formatPrice(getTotal.value)}` }}
                </UButton>
              </div>
            </div>

            <!-- Step 4: Order Complete -->
            <div v-else-if="currentStep === 4" class="text-center py-12">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-check" class="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Order Complete!
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for your purchase. Your order #{{ orderId }} has been confirmed.
              </p>
              <div class="flex justify-center gap-4">
                <UButton
                  to="/programs"
                  color="primary"
                  size="lg"
                >
                  Browse More Programs
                </UButton>
                <UButton
                  to="/workouts"
                  variant="outline"
                  color="primary"
                  size="lg"
                >
                  Start Training
                </UButton>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div v-if="currentStep < 4" class="flex justify-between mt-8">
              <UButton
                v-if="currentStep > 1"
                variant="outline"
                color="gray"
                @click="previousStep"
              >
                <UIcon name="i-heroicons-arrow-left" class="mr-2 w-4 h-4" />
                Previous
              </UButton>
              <div v-else />

              <UButton
                v-if="currentStep < 3"
                color="primary"
                @click="nextStep"
              >
                Continue
                <UIcon name="i-heroicons-arrow-right" class="ml-2 w-4 h-4" />
              </UButton>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div v-if="currentStep < 4" class="lg:col-span-1">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>

              <!-- Cart Items -->
              <div class="space-y-3 mb-4">
                <div
                  v-for="item in cartItems"
                  :key="item.programId"
                  class="flex justify-between text-sm"
                >
                  <div class="flex-1">
                    <div class="font-medium text-gray-900 dark:text-white">
                      {{ item.program.title }}
                    </div>
                    <div class="text-gray-500 dark:text-gray-400">
                      Qty: {{ item.quantity }}
                    </div>
                  </div>
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ formatPrice((item.program.salePrice || item.program.price) * item.quantity) }}
                  </div>
                </div>
              </div>

              <!-- Pricing Breakdown -->
              <div class="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ formatPrice(getSubtotal) }}
                  </span>
                </div>

                <div v-if="getTotalSavings > 0" class="flex justify-between text-green-600 dark:text-green-400">
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

                <div class="border-t border-gray-200 dark:border-gray-600 pt-2">
                  <div class="flex justify-between">
                    <span class="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                    <span class="text-base font-semibold text-gray-900 dark:text-white">
                      {{ formatPrice(getTotal) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Security Badges -->
              <div class="mt-6 space-y-2">
                <div class="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <UIcon name="i-heroicons-lock-closed" class="w-3 h-3" />
                  <span>SSL Encrypted</span>
                </div>
                <div class="flex items-center justify-center space-x-2 text-xs text-green-600 dark:text-green-400">
                  <UIcon name="i-heroicons-shield-check" class="w-3 h-3" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
