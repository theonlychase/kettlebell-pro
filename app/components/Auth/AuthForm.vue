<script setup lang="ts">
import type { FormError } from '#ui/types'

const redirectInfo = useSupabaseCookieRedirect()

const { auth } = useSupabaseClient<Database>()

const oAuthLoading = ref(false)
const otpLoading = ref(false)
const success = ref(false)
const state: { email: string } = reactive({ email: '' })
const toast = useToast()

const validate = () => {
  const errors: FormError[] = []
  if (!state.email) errors.push({
    name: 'email',
    message: 'Email is required',
  })

  if (!validateEmail(state.email)) {
    errors.push({
      name: 'email',
      message: 'Invalid Email',
    })
  }
  return errors
}

// async function handleOAuth() {
//   const path = redirectInfo.pluck()
//
//   oAuthLoading.value = true
//   await auth.signInWithOAuth({
//     provider: 'github',
//     options: { redirectTo: path ?? '/' },
//   })
// }

async function handleLogin() {
  const path = redirectInfo.pluck()

  try {
    otpLoading.value = true
    const { error } = await auth.signInWithOtp({
      email: state.email,
      options: { emailRedirectTo: path ?? '/' },
    })
    if (error) throw error
  }
  catch (error) {
    alert((error as { [p: string]: string }).error_description || (error as Error).message)
  }
  finally {
    state.email = ''
    otpLoading.value = false
    success.value = true
    toast.add({
      title: 'Success',
      description: 'Check Your Email For The Login Link.',
      color: 'success',
    })
  }
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-[var(--ui-bg-muted)]">
    <div class="text-center mb-6">
      <div class="mb-2 pointer-events-none w-10 h-10 mx-auto">
        <UIcon
          class="w-10 h-10"
          name="i-lucide:lock"
          dynamic
        />
      </div>
      <div class="header-3/bold">
        Welcome back
      </div>
      <div class="mt-1">
        Please enter your email to sign in.
      </div>
    </div>

    <UForm
      ref="formState"
      :disabled="oAuthLoading || otpLoading"
      :state="state"
      :validate="validate"
      :validate-on="['input', 'change']"
      class="grid gap-y-4"
      @submit="handleLogin"
    >
      <UFormField
        label="Email"
        name="email"
      >
        <UInput
          v-model="state.email"
          class="w-full"
          placeholder="you@example.com"
        />
      </UFormField>

      <UButton
        class="justify-center"
        type="submit"
        :loading="otpLoading"
      >
        Sign In
      </UButton>
    </UForm>

    <!--    <USeparator -->
    <!--      class="my-6" -->
    <!--      label="or" -->
    <!--    /> -->

    <!--    <UButton -->
    <!--      class="w-full justify-center" -->
    <!--      :loading="oAuthLoading" -->
    <!--      color="neutral" -->
    <!--      icon="i-line-md:github" -->
    <!--      @click="handleOAuth" -->
    <!--    > -->
    <!--      Continue with GitHub -->
    <!--    </UButton> -->
  </UCard>
</template>
