import {
  defineContentConfig, defineCollection, z,
} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/**/*.md',
      type: 'page',
      schema: z.object({
        id: z.string().optional(),
        author: z.object({
          avatar: z.object({
            src: z.string().url('Avatar src must be a valid URL').optional(),
            target: z.string().optional(),
          }).optional(),
          name: z.string().optional(),
          to: z.string().optional(),
        }),
        title: z.string().min(1, 'Blog post title is required'),
        image: z.object({
          src: z.string().url('Image src must be a valid URL').optional(),
          alt: z.string().optional(),
        }).optional(),
        description: z.string().min(1, 'Description is required'),
        short: z.string().max(150, 'Short description should not exceed 150 characters').optional(),
        icon: z.string().optional(),
        tags: z.array(z.string()).optional(),
        path: z.string().min(1, 'Path is required').regex(/^\//, 'Path must start with /'),
        slug: z.string()
          .min(1, 'Slug is required')
          .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
        created: z.string().datetime('Created date must be a valid ISO datetime string'),
        lastModified: z.string().datetime('Last modified date must be a valid ISO datetime string').optional(),
      }),
    }),
    exercises: defineCollection({
      source: 'exercises/**',
      type: 'page',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        category: z.string().optional(),
        bodyPart: z.string().optional(),
        targetMuscleGroups: z.array(z.string()).optional(),
        secondaryMuscleGroups: z.array(z.string()).optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
        exerciseType: z.enum(['strength', 'cardio', 'endurance', 'power', 'mobility', 'combination']).optional(),
        bodyPosition: z.enum(['standing', 'kneeling', 'lying', 'sitting', 'multiple']).optional(),
        weight: z.object({
          kg: z.number().positive('Weight in kg must be positive').optional(),
          lbs: z.number().positive('Weight in lbs must be positive').optional(),
        }).refine((data) => {
          // Validate that kg and lbs values are roughly equivalent (1 kg ≈ 2.20462 lbs)
          const expectedLbs = Math.round(data.kg * 2.20462 * 100) / 100
          const tolerance = 0.5 // Allow small rounding differences
          return Math.abs(data.lbs - expectedLbs) <= tolerance
        }, {
          message: 'Weight values in kg and lbs must be equivalent (1 kg ≈ 2.20462 lbs)',
        }).optional(),
        equipment: z.array(z.string()).optional(),
        instructions: z.array(z.string()).optional(),
        sets: z.number().int().positive().optional(),
        reps: z.number().int().positive().optional(),
        duration: z.number().positive().optional(),
        restPeriod: z.number().positive().optional(),
        videoUrl: z.string().url().optional(),
        imageUrl: z.string().url().optional(),
        cautions: z.array(z.string()).optional(),
        commonMistakes: z.array(z.string()).optional(),
        faq: z.array(z.string()),
        relatedExercises: z.array(z.string()).optional(),
        variations: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        tips: z.array(z.string()).optional(),
      }),
    }),
  },
})
