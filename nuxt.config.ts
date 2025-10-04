import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
  ],

  $development: {
    runtimeConfig: { public: { baseUrl: 'http://localhost:8888' } },
    vite: {
      optimizeDeps: {
        include: [
          '@vue/devtools-core',
          '@vue/devtools-kit',
          '@nuxt/content/utils',
          'zod',
        ],
      },
    },
  },

  $production: {
    runtimeConfig: {
      public: {
        baseUrl: process.env.BASE_URL,
        authRedirectUrl: `${process.env.BASE_URL}/confirm`,
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
      authRedirectUrl: '',
      emailId: '',
      emailKey: '',
      templateId: '',
    },
  },

  features: { devLogs: true },

  experimental: { inlineRouteRules: true },

  compatibilityDate: '2025-07-17',

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  eslint: { config: { stylistic: true } },

  icon: {
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
    mode: 'svg',
    provider: 'iconify',
  },

  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      saveRedirectToCookie: true,
    },
    types: '~/shared/types/database.ts',
  },
})
