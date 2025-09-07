import { useStorage, useDebounceFn } from '@vueuse/core'

export const useWorkoutBuilder = () => {
  // Get user for authentication
  const user = useSupabaseUser()

  // Import useWorkouts composable for saving functionality
  const { createWorkout, updateWorkout } = useWorkouts()

  // VueUse storage for draft persistence
  const draftKey = computed(() => `workout-builder-draft-${user.value?.id || 'anonymous'}`)
  const initialState: WorkoutBuilderState = {
    currentWorkout: {
      name: '',
      description: '',
      difficulty_level: 'beginner',
      estimated_duration: 0,
      is_template: false,
    },
    exercises: [],
    isDirty: false,
    isLoading: false,
    error: null,
  }

  const builderState = useStorage<WorkoutBuilderState>(draftKey.value, initialState)

  // VueUse debounce for auto-save functionality
  const debouncedAutoSave = useDebounceFn(async () => {
    if (builderState.value.isDirty && builderState.value.currentWorkout.name) {
      await autoSave()
    }
  }, 2000) // Auto-save after 2 seconds of inactivity

  // Watch for changes to trigger auto-save
  watch(
    () => [builderState.value.currentWorkout, builderState.value.exercises],
    () => {
      builderState.value.isDirty = true
      debouncedAutoSave()
    },
    { deep: true },
  )

  /**
   * Add an exercise to the current workout
   */
  const addExerciseToWorkout = (exercise: Omit<WorkoutExercise, 'id' | 'workout_id' | 'created_at'>) => {
    try {
      const newExercise: WorkoutExercise = {
        id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        workout_id: 'temp',
        order_index: builderState.value.exercises.length,
        created_at: new Date().toISOString(),
        ...exercise,
      }

      builderState.value.exercises.push(newExercise)
      builderState.value.isDirty = true
      builderState.value.error = null

      // Recalculate duration
      calculateWorkoutDuration()

      return newExercise
    }
    catch (error) {
      builderState.value.error = error instanceof Error ? error.message : 'Failed to add exercise'
      throw error
    }
  }

  /**
   * Remove an exercise from the workout by index
   */
  const removeExerciseFromWorkout = (index: number) => {
    try {
      if (index < 0 || index >= builderState.value.exercises.length) {
        throw new Error('Invalid exercise index')
      }

      builderState.value.exercises.splice(index, 1)

      // Reorder remaining exercises
      builderState.value.exercises.forEach((exercise, i) => {
        exercise.order_index = i
      })

      builderState.value.isDirty = true
      builderState.value.error = null

      // Recalculate duration
      calculateWorkoutDuration()

      return true
    }
    catch (error) {
      builderState.value.error = error instanceof Error ? error.message : 'Failed to remove exercise'
      throw error
    }
  }

  /**
   * Reorder exercises by moving from one index to another
   */
  const reorderExercises = (fromIndex: number, toIndex: number) => {
    try {
      const exercises = builderState.value.exercises

      if (fromIndex < 0 || fromIndex >= exercises.length
        || toIndex < 0 || toIndex >= exercises.length) {
        throw new Error('Invalid exercise indices')
      }

      // Move exercise from fromIndex to toIndex
      const [movedExercise] = exercises.splice(fromIndex, 1)
      exercises.splice(toIndex, 0, movedExercise)

      // Update order_index for all exercises
      exercises.forEach((exercise, index) => {
        exercise.order_index = index
      })

      builderState.value.isDirty = true
      builderState.value.error = null

      return exercises
    }
    catch (error) {
      builderState.value.error = error instanceof Error ? error.message : 'Failed to reorder exercises'
      throw error
    }
  }

  /**
   * Update exercise parameters at a specific index
   */
  const updateExerciseParams = (index: number, params: Partial<WorkoutExercise>) => {
    try {
      if (index < 0 || index >= builderState.value.exercises.length) {
        throw new Error('Invalid exercise index')
      }

      const exercise = builderState.value.exercises[index]
      Object.assign(exercise, params)

      builderState.value.isDirty = true
      builderState.value.error = null

      // Recalculate duration if duration-related params changed
      if ('duration' in params || 'rest_time' in params || 'sets' in params) {
        calculateWorkoutDuration()
      }

      return exercise
    }
    catch (error) {
      builderState.value.error = error instanceof Error ? error.message : 'Failed to update exercise'
      throw error
    }
  }

  /**
   * Calculate the estimated workout duration based on exercises
   */
  const calculateWorkoutDuration = () => {
    try {
      let totalDuration = 0

      builderState.value.exercises.forEach((exercise, index) => {
        // Calculate exercise time
        if (exercise.duration) {
          // Time-based exercise
          const sets = exercise.sets || 1
          totalDuration += (exercise.duration * sets)
        }
        else if (exercise.sets && exercise.reps) {
          // Rep-based exercise - estimate 2 seconds per rep
          totalDuration += (exercise.sets * exercise.reps * 2)
        }
        else {
          // Default estimation - 30 seconds per set
          const sets = exercise.sets || 1
          totalDuration += (sets * 30)
        }

        // Add rest time between exercises (except for last exercise)
        if (index < builderState.value.exercises.length - 1) {
          const restTime = exercise.rest_time || 60 // Default 60 seconds rest
          totalDuration += restTime
        }
      })

      // Convert to minutes and round up
      const durationInMinutes = Math.ceil(totalDuration / 60)
      builderState.value.currentWorkout.estimated_duration = durationInMinutes

      return durationInMinutes
    }
    catch (error) {
      builderState.value.error = error instanceof Error ? error.message : 'Failed to calculate duration'
      return 0
    }
  }

  /**
   * Auto-save the current workout as a draft
   */
  const autoSave = async () => {
    try {
      // Auto-save is handled by VueUse storage automatically
      // This is a placeholder for additional auto-save logic if needed
      console.log('Auto-saving workout draft...')
      builderState.value.isDirty = false
    }
    catch (error) {
      console.warn('Auto-save failed:', error)
    }
  }

  /**
   * Save the workout to the database
   */
  const saveWorkout = async (workoutId?: string) => {
    if (!user.value) {
      throw new Error('User must be authenticated to save workouts')
    }

    if (!builderState.value.currentWorkout.name?.trim()) {
      throw new Error('Workout name is required')
    }

    if (builderState.value.exercises.length === 0) {
      throw new Error('Workout must have at least one exercise')
    }

    builderState.value.isLoading = true
    builderState.value.error = null

    try {
      // Prepare workout data
      const workoutData: WorkoutCreatePayload = {
        name: builderState.value.currentWorkout.name.trim(),
        description: builderState.value.currentWorkout.description,
        difficulty_level: builderState.value.currentWorkout.difficulty_level!,
        estimated_duration: builderState.value.currentWorkout.estimated_duration,
        is_template: builderState.value.currentWorkout.is_template || false,
        exercises: builderState.value.exercises.map(exercise => ({
          exercise_slug: exercise.exercise_slug,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          duration: exercise.duration,
          rest_time: exercise.rest_time,
          order_index: exercise.order_index,
          notes: exercise.notes,
        })),
      }

      let savedWorkout: Workout

      if (workoutId) {
        // Update existing workout
        savedWorkout = await updateWorkout(workoutId, workoutData)
      }
      else {
        // Create new workout
        savedWorkout = await createWorkout(workoutData)
      }

      // Clear the draft after successful save
      clearWorkout()

      return savedWorkout
    }
    catch (error) {
      builderState.value.error = error instanceof Error ? error.message : 'Failed to save workout'
      throw error
    }
    finally {
      builderState.value.isLoading = false
    }
  }

  /**
   * Clear the current workout and reset builder state
   */
  const clearWorkout = () => {
    builderState.value.currentWorkout = {
      name: '',
      description: '',
      difficulty_level: 'beginner',
      estimated_duration: 0,
      is_template: false,
    }
    builderState.value.exercises = []
    builderState.value.isDirty = false
    builderState.value.error = null
  }

  /**
   * Load a workout into the builder for editing
   */
  const loadWorkout = (workout: Workout) => {
    try {
      builderState.value.currentWorkout = {
        name: workout.name,
        description: workout.description,
        difficulty_level: workout.difficulty_level,
        estimated_duration: workout.estimated_duration,
        is_template: workout.is_template,
      }

      builderState.value.exercises = workout.exercises || []
      builderState.value.isDirty = false
      builderState.value.error = null

      // Recalculate duration to ensure consistency
      calculateWorkoutDuration()

      return true
    }
    catch (error) {
      builderState.value.error = error instanceof Error ? error.message : 'Failed to load workout'
      throw error
    }
  }

  /**
   * Get a preview of the current workout
   */
  const getWorkoutPreview = () => {
    return {
      ...builderState.value.currentWorkout,
      exercises: [...builderState.value.exercises],
      exerciseCount: builderState.value.exercises.length,
      estimatedDuration: builderState.value.currentWorkout.estimated_duration,
    }
  }

  return {
    // Core functions
    addExerciseToWorkout,
    removeExerciseFromWorkout,
    reorderExercises,
    updateExerciseParams,
    calculateWorkoutDuration,
    saveWorkout,

    // Utility functions
    clearWorkout,
    loadWorkout,
    getWorkoutPreview,

    // Reactive state (readonly)
    currentWorkout: readonly(computed(() => builderState.value.currentWorkout)),
    exercises: readonly(computed(() => builderState.value.exercises)),
    isDirty: readonly(computed(() => builderState.value.isDirty)),
    isLoading: readonly(computed(() => builderState.value.isLoading)),
    error: readonly(computed(() => builderState.value.error)),
  }
}
