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
    pageHeader: { slots: { container: 'page-container' } },
    pageHero: { slots: { container: 'lg:py-32' } },
    pageSection: { slots: { container: 'py-16 sm:py-16 lg:py-16' } },
    // page: { slots: { root: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8' } },
  },
})
