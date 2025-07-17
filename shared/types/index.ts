export interface Exercise {
  id: string
  name: string
  description: string
  duration: number
  reps?: number
  sets?: number
  weight?: string
  muscleGroups: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  videoUrl?: string
  imageUrl?: string
  instructions: string[]
  tips?: string[]
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

export interface CartItem {
  programId: string
  program: Program
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Article {
  id: string
  title: string
  description: string
  content: string
  author: string
  publishedAt: string
  imageUrl?: string
  tags: string[]
  readTime: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}
