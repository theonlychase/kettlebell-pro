<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { User } from '@supabase/supabase-js'

const redirectInfo = useSupabaseCookieRedirect()

useSeoMeta({
  title: 'Login',
  description: 'Login To Your Kettlebell Pro Account',
})

definePageMeta({ middleware: 'auth', layout: 'blank' })

const { signInWithPassword } = useAuth()

const fields = ref([{
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
const user = ref<User | null>(null)
const toast = useToast()
const submittedKey = ref(0)

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

watch(
  user,
  () => {
    if (user.value) {
      const path = redirectInfo.path
      // Redirect to the saved path, or fallback to home
      return navigateTo(path.value || '/')
    }
  },
  { immediate: true },
)

async function onSubmit(payload: FormSubmitEvent<z.output<typeof schema>>) {
  loading.value = true
  const { data, error } = await signInWithPassword(payload?.data)
  loading.value = false

  if (error) {
    console.error('Error logging in', error)
    return toast.add({
      title: 'Error logging in',
      description: error?.message,
      icon: 'i-heroicons-check-circle',
      color: 'error',
    })
  }

  user.value = data.user
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
      title="Login to your account"
      :submit="{ label: 'Continue' }"
      :validate-on="['input', 'change']"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <ULink
          to="/signup"
          class="text-primary font-medium"
        >Sign Up</ULink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
