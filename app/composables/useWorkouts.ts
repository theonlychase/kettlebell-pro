import type { Workout } from '~/types'

// Mock data - in production this would come from API
const mockWorkouts: Workout[] = [
  {
    id: '1',
    title: 'Beginner Kettlebell Basics',
    description: 'Perfect introduction to kettlebell training with fundamental movements and proper form.',
    duration: 20,
    difficulty: 'beginner',
    exercises: [
      {
        id: '1',
        name: 'Kettlebell Swing',
        description: 'The fundamental kettlebell movement that targets your posterior chain.',
        duration: 45,
        reps: 20,
        sets: 3,
        weight: '16kg',
        muscleGroups: ['glutes', 'hamstrings', 'core'],
        difficulty: 'beginner',
        instructions: [
          'Stand with feet shoulder-width apart, kettlebell on the ground in front of you',
          'Hinge at the hips and grab the kettlebell with both hands',
          'Drive through your hips to swing the kettlebell up to chest height',
          'Let the kettlebell swing back down between your legs',
          'Repeat for the specified number of reps',
        ],
        tips: [
          'Keep your back straight throughout the movement',
          'The power comes from your hips, not your arms',
          'Squeeze your glutes at the top of the swing',
        ],
      },
      {
        id: '2',
        name: 'Goblet Squat',
        description: 'A squat variation holding the kettlebell at chest level.',
        duration: 60,
        reps: 15,
        sets: 3,
        weight: '16kg',
        muscleGroups: ['quadriceps', 'glutes', 'core'],
        difficulty: 'beginner',
        instructions: [
          'Hold the kettlebell by the horns at chest level',
          'Stand with feet slightly wider than shoulder-width',
          'Lower into a squat, keeping your chest up',
          'Drive through your heels to return to standing',
          'Repeat for the specified number of reps',
        ],
        tips: [
          'Keep your elbows pointing down',
          'Go as low as your mobility allows',
          'Keep your weight on your heels',
        ],
      },
    ],
    tags: ['beginner', 'fundamentals', 'form'],
    imageUrl: '/images/workouts/beginner-basics.jpg',
    equipment: ['16kg kettlebell'],
    caloriesBurned: 180,
    muscleGroups: ['full-body', 'core', 'legs'],
  },
  {
    id: '2',
    title: 'HIIT Kettlebell Blast',
    description: 'High-intensity interval training with kettlebells for maximum calorie burn and conditioning.',
    duration: 30,
    difficulty: 'intermediate',
    exercises: [],
    tags: ['hiit', 'cardio', 'fat-burn'],
    imageUrl: '/images/workouts/hiit-blast.jpg',
    equipment: ['20kg kettlebell'],
    caloriesBurned: 350,
    muscleGroups: ['full-body', 'cardio'],
  },
  {
    id: '3',
    title: 'Advanced Strength Circuit',
    description: 'Complex kettlebell movements for experienced athletes focusing on strength and power.',
    duration: 45,
    difficulty: 'advanced',
    exercises: [],
    tags: ['strength', 'power', 'complex'],
    imageUrl: '/images/workouts/advanced-strength.jpg',
    equipment: ['24kg kettlebell', '32kg kettlebell'],
    caloriesBurned: 420,
    muscleGroups: ['full-body', 'strength'],
  },
]

export const useWorkouts = () => {
  const workouts = ref<Workout[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all workouts
  const fetchWorkouts = async () => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      workouts.value = mockWorkouts
    }
    catch (err) {
      error.value = 'Failed to fetch workouts'
      console.error('Error fetching workouts:', err)
    }
    finally {
      loading.value = false
    }
  }

  // Fetch single workout by ID
  const fetchWorkout = async (id: string): Promise<Workout | null> => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      const workout = mockWorkouts.find(w => w.id === id)
      return workout || null
    }
    catch (err) {
      error.value = 'Failed to fetch workout'
      console.error('Error fetching workout:', err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  // Filter workouts by criteria
  const filterWorkouts = (
    searchQuery?: string,
    difficulty?: string,
    duration?: string,
    muscleGroup?: string,
  ) => {
    return workouts.value.filter((workout) => {
      const matchesSearch = !searchQuery
        || workout.title.toLowerCase().includes(searchQuery.toLowerCase())
        || workout.description.toLowerCase().includes(searchQuery.toLowerCase())
        || workout.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesDifficulty = !difficulty || workout.difficulty === difficulty

      const matchesDuration = !duration
        || (duration === '20' && workout.duration < 20)
        || (duration === '30' && workout.duration >= 20 && workout.duration <= 30)
        || (duration === '45' && workout.duration > 30)

      const matchesMuscleGroup = !muscleGroup
        || workout.muscleGroups.includes(muscleGroup)

      return matchesSearch && matchesDifficulty && matchesDuration && matchesMuscleGroup
    })
  }

  // Get workouts by difficulty
  const getWorkoutsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return workouts.value.filter(workout => workout.difficulty === difficulty)
  }

  // Get featured workouts (first 3 for homepage)
  const getFeaturedWorkouts = () => {
    return workouts.value.slice(0, 3)
  }

  // Search workouts
  const searchWorkouts = (query: string) => {
    return workouts.value.filter(workout =>
      workout.title.toLowerCase().includes(query.toLowerCase())
      || workout.description.toLowerCase().includes(query.toLowerCase())
      || workout.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())),
    )
  }

  return {
    workouts: readonly(workouts),
    loading: readonly(loading),
    error: readonly(error),
    fetchWorkouts,
    fetchWorkout,
    filterWorkouts,
    getWorkoutsByDifficulty,
    getFeaturedWorkouts,
    searchWorkouts,
  }
}
