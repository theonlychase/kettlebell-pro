<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

// SEO Meta
useSeoMeta({
  title: 'Contact - Kettlebell Pro',
  description: 'Get in touch with me. I\'d love to help with your fitness journey and answer any questions about my exercises and programs.',
})

// Form validation schema
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
})

type Schema = z.output<typeof schema>

// Form state
const state = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})
const toast = useToast()

// Form submission state
const isSubmitting = ref(false)
const isSubmitted = ref(false)

// Form submission handler
async function onSubmit(_event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true

  try {
    // Simulate API call - replace with actual submission logic
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form
    Object.assign(state, {
      name: '',
      email: '',
      subject: '',
      message: '',
    })

    isSubmitted.value = true

    setTimeout(() => {
      isSubmitted.value = false
    }, 5000)
  }
  catch (error) {
    console.error('Form submission error:', error)
  }
  finally {
    isSubmitting.value = false
  }
}

watch(isSubmitted, (value) => {
  if (value) {
    toast.add({
      title: 'Message sent',
      description: 'Thank you for contacting me. I\'ll get back to you within 24 hours.',
      icon: 'i-heroicons-check-circle',
      color: 'primary',
    })
  }
})

// Contact information
const contactInfo = [
  {
    icon: 'i-heroicons-envelope',
    label: 'Email',
    value: 'hello@kettlebellpro.com',
    href: 'mailto:hello@kettlebellpro.com',
  },
  {
    icon: 'i-heroicons-phone',
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: 'i-heroicons-map-pin',
    label: 'Address',
    value: '123 Fitness Street, Workout City, WC 12345',
    href: '#',
  },
]
</script>

<template>
  <UPage>
    <!-- Page Header -->
    <UPageHeader
      class="page-container"
      title="Contact"
      description="Get in touch with me. I'd love to help with your fitness journey."
    />

    <UContainer>
      <div class="grid lg:grid-cols-2 gap-16 py-12">
        <!-- Contact Form -->
        <div>
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Send me a message
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Have a question about my exercises or need help with your training? I'd love to hear from you.
            </p>
          </div>

          <!-- Contact Form -->
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-6 max-w-none"
            @submit="onSubmit"
          >
            <UFormField
              label="Name"
              name="name"
              required
            >
              <UInput
                v-model="state.name"
                placeholder="Your full name"
                icon="i-heroicons-user"
                variant="outline"
                size="lg"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Email"
              name="email"
              required
            >
              <UInput
                v-model="state.email"
                type="email"
                placeholder="your.email@example.com"
                icon="i-heroicons-envelope"
                variant="outline"
                size="lg"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Subject"
              name="subject"
              required
            >
              <UInput
                v-model="state.subject"
                placeholder="What's this about?"
                icon="i-heroicons-chat-bubble-left-ellipsis"
                variant="outline"
                size="lg"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Message"
              name="message"
              required
            >
              <UTextarea
                v-model="state.message"
                placeholder="Tell me more about your question or how I can help..."
                :rows="6"
                variant="outline"
                size="lg"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UButton
              type="submit"
              variant="solid"
              color="primary"
              size="lg"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              class="w-full justify-center"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </UButton>
          </UForm>
        </div>

        <!-- Contact Information -->
        <div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get in touch
            </h2>
            <div class="space-y-4">
              <div
                v-for="info in contactInfo"
                :key="info.label"
                class="flex items-start gap-4"
              >
                <div class="flex-shrink-0">
                  <UIcon
                    :name="info.icon"
                    class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1"
                  />
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ info.label }}
                  </p>
                  <ULink
                    v-if="info.href !== '#'"
                    :to="info.href"
                    class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {{ info.value }}
                  </ULink>
                  <p
                    v-else
                    class="text-gray-600 dark:text-gray-400"
                  >
                    {{ info.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </UPage>
</template>
