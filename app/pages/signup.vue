<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

useSeoMeta({
  title: 'Sign Up',
  description: 'Create A New Account',
  robots: 'noindex, nofollow',
})

definePageMeta({ middleware: 'auth', layout: 'blank' })
const { signUpNewUser } = useAuth()

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
const formRef = useTemplateRef('form')
const toast = useToast()

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

async function onSubmit(payload: FormSubmitEvent<z.output<typeof schema>>) {
  loading.value = true
  const { error } = await signUpNewUser(payload?.data)
  loading.value = false

  if (error) {
    console.error('Error signing up:', error)
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
  formRef?.value?.formRef?.clear()
}
</script>

<template>
  <UCard class="max-w-sm mx-auto w-full bg-[var(--ui-bg-muted)]">
    <UAuthForm
      ref="form"
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
