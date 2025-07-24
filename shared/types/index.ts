interface Exercise {
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

export interface BlogPost {
  id: string
  author: {
    avatar?: {
      src: string
      target: string
    }
    name: string
    to?: string
  }
  title: string
  image?: {
    src: string
    alt: string
  }
  description: string
  short?: string
  icon?: string
  tags?: string[]
  path: string
  slug: string
  created: string
  lastModified: string
}

export interface Workout {
  id: string
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exercises: Exercise[]
  tags: string[]
  imageUrl?: string
  equipment: string[]
  caloriesBurned?: number
  muscleGroups: string[]
}

export interface Program {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  workouts: Workout[]
  features: string[]
  imageUrl?: string
  salePrice?: number
}
