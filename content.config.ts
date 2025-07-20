import {
  defineContentConfig, defineCollection, z,
} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/**/*.md',
      type: 'page',
      schema: z.object({
        id: z.string().min(1, 'Blog post ID is required'),
        author: z.object({
          avatar: z.object({
            src: z.string().url('Avatar src must be a valid URL'),
            target: z.string().min(1, 'Avatar target is required'),
          }).optional(),
          name: z.string().min(1, 'Author name is required'),
          to: z.string().optional(),
        }),
        title: z.string().min(1, 'Blog post title is required').max(200, 'Title should not exceed 200 characters'),
        image: z.object({
          src: z.string().url('Image src must be a valid URL'),
          alt: z.string().min(1, 'Image alt text is required for accessibility'),
        }).optional(),
        description: z.string().min(1, 'Description is required').max(500, 'Description should not exceed 500 characters'),
        short: z.string().max(150, 'Short description should not exceed 150 characters').optional(),
        icon: z.string().optional(),
        tags: z.array(z.string().min(1)).max(10, 'Maximum 10 tags allowed').optional(),
        path: z.string().min(1, 'Path is required').regex(/^\//, 'Path must start with /'),
        slug: z.string()
          .min(1, 'Slug is required')
          .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
          .max(100, 'Slug should not exceed 100 characters'),
        created: z.string().datetime('Created date must be a valid ISO datetime string'),
        lastModified: z.string().datetime('Last modified date must be a valid ISO datetime string'),
      }),
    }),
    exercises: defineCollection({
      source: 'exercises/**',
      type: 'page',
      schema: z.object({
        id: z.string().min(1, 'ID is required'),
        name: z.string().min(1, 'Exercise name is required'),
        description: z.string().min(1, 'Description is required'),
        bodyPart: z.string().min(1, 'Body part is required'),
        targetMuscleGroups: z.array(z.string().min(1)).min(1, 'At least one target muscle group is required'),
        secondaryMuscleGroups: z.array(z.string().min(1)),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        exerciseType: z.enum(['strength', 'cardio', 'endurance', 'power', 'mobility', 'combination']),
        bodyPosition: z.enum(['standing', 'kneeling', 'lying', 'sitting', 'multiple']),
        weight: z.object({
          kg: z.number().positive('Weight in kg must be positive'),
          lbs: z.number().positive('Weight in lbs must be positive'),
        }).refine((data) => {
          // Validate that kg and lbs values are roughly equivalent (1 kg ≈ 2.20462 lbs)
          const expectedLbs = Math.round(data.kg * 2.20462 * 100) / 100
          const tolerance = 0.5 // Allow small rounding differences
          return Math.abs(data.lbs - expectedLbs) <= tolerance
        }, {
          message: 'Weight values in kg and lbs must be equivalent (1 kg ≈ 2.20462 lbs)',
        }),
        equipment: z.array(z.string().min(1)).min(1, 'At least one piece of equipment is required'),
        instructions: z.array(z.string().min(1)).min(1, 'At least one instruction is required'),
        sets: z.number().int().positive().optional(),
        reps: z.number().int().positive().optional(),
        duration: z.number().positive().optional(),
        restPeriod: z.number().positive().optional(),
        videoUrl: z.string().url().optional(),
        imageUrl: z.string().url().optional(),
        cautions: z.array(z.string().min(1)).optional(),
        commonMistakes: z.array(z.string().min(1)).optional(),
        faq: z.array(z.string().min(1)),
        relatedExercises: z.array(z.string().min(1)).optional(),
        variations: z.array(z.string().min(1)).optional(),
        tags: z.array(z.string().min(1)).optional(),
        tips: z.array(z.string().min(1)).optional(),
      }),
    }),
  },
})
