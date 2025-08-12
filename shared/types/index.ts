import type { Ref } from 'vue'

export interface Exercise {
  id: string
  title: string
  description: string
  category?: string
  bodyPart?: string
  targetMuscleGroups?: string[]
  secondaryMuscleGroups?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  exerciseType?: 'strength' | 'cardio' | 'endurance' | 'power' | 'mobility' | 'combination'
  bodyPosition?: 'standing' | 'kneeling' | 'lying' | 'sitting' | 'multiple'
  weight?: {
    kg?: number
    lbs?: number
  }
  equipment?: string[]
  instructions?: string[]
  sets?: number
  reps?: number
  duration?: number
  restPeriod?: number
  videoUrl?: string
  imageUrl?: string
  cautions?: string[]
  commonMistakes?: string[]
  faq?: string[]
  relatedExercises?: string[]
  variations?: string[]
  tags?: string[]
  tips?: string[]
}

export type EmailJS = Ref<{
  init: (key: string) => void
  send: (
    serviceId: string,
    templateId: string,
    templateParams: Record<string, unknown>,
    options?: Record<string, unknown>,
  ) => Promise<{
    status: number
    text: string
  }>
} | null>
