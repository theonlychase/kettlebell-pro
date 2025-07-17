// Mock workout data - in production this would come from database
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

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))

  let filteredWorkouts = [...mockWorkouts]

  // Apply filters based on query parameters
  if (query.difficulty) {
    filteredWorkouts = filteredWorkouts.filter(w => w.difficulty === query.difficulty)
  }

  if (query.duration) {
    const duration = Number(query.duration)
    if (duration === 20) {
      filteredWorkouts = filteredWorkouts.filter(w => w.duration < 20)
    }
    else if (duration === 30) {
      filteredWorkouts = filteredWorkouts.filter(w => w.duration >= 20 && w.duration <= 30)
    }
    else if (duration === 45) {
      filteredWorkouts = filteredWorkouts.filter(w => w.duration > 30)
    }
  }

  if (query.muscleGroup) {
    filteredWorkouts = filteredWorkouts.filter(w =>
      w.muscleGroups.includes(query.muscleGroup as string),
    )
  }

  if (query.search) {
    const searchTerm = (query.search as string).toLowerCase()
    filteredWorkouts = filteredWorkouts.filter(w =>
      w.title.toLowerCase().includes(searchTerm)
      || w.description.toLowerCase().includes(searchTerm)
      || w.tags.some(tag => tag.toLowerCase().includes(searchTerm)),
    )
  }

  return {
    success: true,
    data: filteredWorkouts,
    total: filteredWorkouts.length,
  }
})
