import type { RuntimeConfig } from 'nuxt/schema'

export function useEmailJs(): { emailJs: EmailJS, emailId: string, emailKey: string, templateId: string, loadEmailJs: () => Promise<void> } {
  const config: RuntimeConfig = useRuntimeConfig()
  const { emailId = '', templateId = '', emailKey = '' } = config.public

  const emailJs: EmailJS = ref(null)

  const loadEmailJs = async () => {
    const loaded = await useInjectScript({
      src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
      id: 'emailjs',
    })

    if (loaded && !emailJs.value) {
      // @ts-expect-error - emailjs on window
      emailJs.value = window?.emailjs
    }
  }

  return {
    emailJs,
    emailId,
    emailKey,
    templateId,
    loadEmailJs,
  }
}
