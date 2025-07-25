import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-og-image',
    // 'nuxt-llms',
    '@vueuse/nuxt',
  ],

  $development: {
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

  // $production: {
  //   image: {
  //     provider: 'netlifyImageCdn',
  //   },
  // },

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

  uiPro: { license: process.env.NUXT_UI_PRO_LICENSE },
})
