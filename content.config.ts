import {
  defineContentConfig, defineCollection, z,
} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection(
      {
        source: '**',
        type: 'page',
      },
    ),
  },
})
