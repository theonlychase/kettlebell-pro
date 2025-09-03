<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

useSeoMeta({
  title: 'Sign Up',
  description: 'Sign Up to Kettlebell Pro',
})

definePageMeta({ middleware: 'auth', layout: 'blank' })

const { signUpWithProfileCheck } = useAuthOperations()

const fields = ref([{
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter your name',
}, {
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email',
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
}])
const loading = ref(false)
const toast = useToast()
const submittedKey = ref(0)

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

async function onSubmit(payload: FormSubmitEvent<z.output<typeof schema>>) {
  loading.value = true
  const { error } = await signUpWithProfileCheck(payload?.data)
  loading.value = false

  if (error) {
    return toast.add({
      title: 'Error signing up',
      description: error?.message,
      icon: 'i-heroicons-check-circle',
      color: 'error',
    })
  }

  toast.add({
    title: 'Account Created',
    description: 'Please check your email for a verification link.',
    icon: 'i-heroicons-check-circle',
    color: 'success',
  })

  submittedKey.value++
}
</script>

<template>
  <UCard class="max-w-sm mx-auto w-full bg-[var(--ui-bg-muted)]">
    <UAuthForm
      :key="submittedKey"
      :fields="fields"
      :loading="loading"
      :schema="schema"
      title="Create an account"
      :submit="{ label: 'Create account' }"
      :validate-on="['input', 'change']"
      @submit="onSubmit"
    >
      <template #description>
        Already have an account? <ULink
          to="/login"
          class="text-primary font-medium"
        >Login</ULink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
