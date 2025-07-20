import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],

  $development: {
    vite: {
      optimizeDeps: {
        include: [
          '@vue/devtools-core',
          '@vue/devtools-kit',
        ],
      },
    },
  },

  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/tailwind.css'],

  colorMode: { classSuffix: '' },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'night-owl',
          langs: [
            'css',
            'js',
            'ts',
            'tsx',
            'vue',
          ],
        },
      },
    },
    experimental: { nativeSqlite: true },
  },

  runtimeConfig: {
    public: {
      appName: 'Kettlebell Pro',
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    },
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  },

  compatibilityDate: '2025-07-17',

  eslint: { config: { stylistic: true } },

  uiPro: { license: process.env.NUXT_UI_PRO_LICENSE },
})
