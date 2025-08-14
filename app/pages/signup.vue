<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FormSchema } from '#ui/types'

useSeoMeta({
  title: 'Sign Up',
  description: 'Create A New Account',
  robots: 'noindex, nofollow',
})

definePageMeta({ middleware: 'auth', layout: 'blank' })
const { signUpNewUser } = useAuth()

const fields = [{
  name: 'name',
  type: 'text' as const,
  label: 'Name',
  placeholder: 'Enter your name',
}, {
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password',
}]
const success = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef') as FormSchema

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

async function onSubmit(payload: FormSubmitEvent<z.output<typeof schema>>) {
  loading.value = true
  await signUpNewUser(payload?.data)
  loading.value = false
  formRef?.value?.clear()
  success.value = true
}
</script>

<template>
  <UCard class="max-w-sm mx-auto w-full bg-[var(--ui-bg-muted)]">
    <UAlert
      v-if="success"
      title="Account Created"
      description="Please check your email for a verification link."
      icon="i-lucide-check-circle"
      variant="soft"
      color="primary"
      class="animate-fade-in mb-6"
    />
    <UAuthForm
      ref="formRef"
      :fields="fields"
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

      <!--      <template #footer> -->
      <!--        By signing up, you agree to our <ULink -->
      <!--          to="/" -->
      <!--          class="text-primary font-medium" -->
      <!--        >Terms of Service</ULink>. -->
      <!--      </template> -->
    </UAuthForm>
  </UCard>
</template>
