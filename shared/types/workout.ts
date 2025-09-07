export interface Workout {
  id: string
  user_id: string
  name: string
  description?: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  estimated_duration?: number // in minutes
  is_template: boolean
  created_at: string
  updated_at: string
  exercises?: WorkoutExercise[]
}

export interface WorkoutExercise {
  id: string
  workout_id: string
  exercise_slug: string // matches content slugs
  sets?: number
  reps?: number
  weight?: number // in kg
  duration?: number // in seconds
  rest_time?: number // in seconds
  order_index: number
  notes?: string
  created_at?: string
}

export interface WorkoutTemplate {
  name: string
  description: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  estimated_duration?: number
  exercises: Omit<WorkoutExercise, 'id' | 'workout_id' | 'created_at'>[]
}

export interface WorkoutCreatePayload {
  name: string
  description?: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  estimated_duration?: number
  is_template?: boolean
  exercises: Omit<WorkoutExercise, 'id' | 'workout_id' | 'created_at'>[]
}

export interface WorkoutUpdatePayload {
  name?: string
  description?: string
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
  estimated_duration?: number
  is_template?: boolean
}

// For workout builder state management
export interface WorkoutBuilderState {
  currentWorkout: Partial<Workout>
  exercises: WorkoutExercise[]
  isDirty: boolean
  isLoading: boolean
  error: string | null
}

// Database table types for better type safety
export interface WorkoutTable {
  Row: Workout
  Insert: Omit<Workout, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string
    updated_at?: string
  }
  Update: Partial<WorkoutTable['Insert']>
}

export interface WorkoutExerciseTable {
  Row: WorkoutExercise
  Insert: Omit<WorkoutExercise, 'id' | 'created_at'> & {
    id?: string
    created_at?: string
  }
  Update: Partial<WorkoutExerciseTable['Insert']>
}
