export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral',
    },
    fonts: false,
  },
  uiPro: {
    footer: { slots: { root: 'mt-auto' } },
    main: { base: 'min-h-full flex-1' },
    // pageHeader: { slots: { container: 'page-container' } },
    pageHero: { slots: { container: 'lg:py-32' } },
    pageSection: { slots: { container: 'py-16 sm:py-16 lg:py-16' } },
    // page: { slots: { root: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8' } },
  },
  toc: {
    title: 'Table of Contents',
    // bottom: {
    //   title: 'Community',
    //   edit: 'https://github.com/nuxt-ui-pro/docs/edit/main/content',
    //   links: [{
    //     icon: 'i-lucide-star',
    //     label: 'Star on GitHub',
    //     to: 'https://github.com/nuxt/ui',
    //     target: '_blank'
    //   }, {
    //     icon: 'i-lucide-book-open',
    //     label: 'Nuxt UI Pro docs',
    //     to: 'https://ui.nuxt.com/getting-started/installation/pro/nuxt',
    //     target: '_blank'
    //   }, {
    //     icon: 'i-simple-icons-nuxtdotjs',
    //     label: 'Purchase a license',
    //     to: 'https://ui.nuxt.com/pro/purchase',
    //     target: '_blank'
    //   }]
    // }
  },
})
