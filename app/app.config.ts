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
    // page: { slots: { root: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8' } },
  },
})
