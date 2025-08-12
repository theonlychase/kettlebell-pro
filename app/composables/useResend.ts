export function useResend(): {
  email: Ref<string>
  error: Ref<boolean>
  loading: Ref<boolean>
  handleSubmit: (e: Event) => Promise<void>
  sendSubscriptionEmail: (payload: { email: string }) => Promise<void>
} {
  const email = ref('')
  const error = ref(false)
  const loading = ref(false)
  const toast = useToast()

  const sendSubscriptionEmail = async (payload: { email: string }) => {
    await $fetch('/api/email/send', {
      method: 'POST',
      body: payload,
    })
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    error.value = false
    console.log('Email:', email.value)

    const isValid = validateEmail(email.value)

    if (!isValid) {
      error.value = true
      return
    }

    error.value = false

    loading.value = true
    await sendSubscriptionEmail({ email: email.value })
    loading.value = false
    email.value = ''
    // Set Success Always for now until set up
    toast.add({
      title: 'Subscribed!',
      description: 'You\'ve been subscribed to the newsletter.',
      icon: 'i-heroicons-check-circle',
      color: 'primary',
    })
  }

  return {
    email,
    error,
    loading,
    handleSubmit,
    sendSubscriptionEmail,
  }
}
