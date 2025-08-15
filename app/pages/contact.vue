<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, FormSchema } from '#ui/types'

useSeoMeta({
  title: 'Contact - Kettlebell Pro',
  description: 'Get in touch with me. I\'d love to help with your fitness journey and answer any questions about my exercises and programs.',
})

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
})

const state = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const toast = useToast()
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const success = ref(false)
const formRef = useTemplateRef('formRef') as FormSchema

const {
  emailJs,
  emailId,
  emailKey,
  templateId,
  loadEmailJs,
} = useEmailJs()

async function onSubmit(_event: FormSubmitEvent<z.output<typeof schema>>) {
  isSubmitting.value = true

  await loadEmailJs()

  if (emailJs.value) {
    try {
      const resp = await emailJs.value?.send(emailId, templateId, state, { publicKey: emailKey })

      if (resp.status === 200) {
        success.value = true
        resetForm()
      }

      isSubmitted.value = true
    }
    catch (error) {
      console.error('Form submission error:', error)
    }
    finally {
      isSubmitting.value = false
    }
  }
}

function resetForm() {
  Object.assign(state, {
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  formRef?.value?.clear()
}

watch(isSubmitted, (value) => {
  if (value && success.value) {
    toast.add({
      title: 'Message sent',
      description: 'Thank you for contacting me. I\'ll get back to you within 24 hours.',
      icon: 'i-heroicons-check-circle',
      color: 'primary',
    })
  }
})
</script>

<template>
  <UPage>
    <UPageHeader
      class="page-container"
      title="Contact"
    />

    <UContainer>
      <div class="grid lg:grid-cols-2 gap-16 py-12">
        <div>
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Send me a message
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Have a question about any exercises or need help with your training? I'm more than happy to help.
            </p>
          </div>

          <UForm
            id="contact"
            ref="formRef"
            :schema="schema"
            :state="state"
            :validate-on="['input', 'change']"
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
                placeholder="Full Name"
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
                variant="outline"
                size="lg"
                color="primary"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="Subject"
              name="subject"
            >
              <UInput
                v-model="state.subject"
                placeholder="What's this about?"
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
              class="w-full justify-center cursor-pointer"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </UButton>
          </UForm>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-6">
            Get in touch
          </h2>
          <div class="space-y-4">
            <div
              v-for="info in CONTACT_INFO"
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
                <p class="font-medium">
                  {{ info.label }}
                </p>
                <ULink
                  v-if="info.href !== '#'"
                  :to="info.href"
                  class="hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {{ info.value }}
                </ULink>
                <p
                  v-else
                >
                  {{ info.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </UPage>
</template>
