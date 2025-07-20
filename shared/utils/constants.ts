/**
 * Application constants for the Kettlebell Pro application
 */

/**
 * Application metadata
 */
export const APP_CONFIG = {
  name: 'Kettlebell Pro',
  description: 'Professional kettlebell workout programs and training',
  version: '1.0.0',
  author: 'Kettlebell Pro Team',
} as const

/**
 * API configuration
 */
export const API_CONFIG = {
  baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  retries: 3,
} as const

/**
 * Workout-related constants
 */
export const WORKOUT_CONSTANTS = {
  minDuration: 5, // minutes
  maxDuration: 300, // minutes
  defaultDuration: 30, // minutes
  minSets: 1,
  maxSets: 10,
  defaultSets: 3,
  minReps: 1,
  maxReps: 100,
  defaultReps: 10,
  minWeight: 0.5, // kg or lbs
  maxWeight: 1000, // kg or lbs
  defaultWeight: 16, // kg (35 lbs kettlebell)
} as const

/**
 * Exercise difficulty levels
 */
export const DIFFICULTY_LEVELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
} as const

/**
 * Exercise categories
 */
export const EXERCISE_CATEGORIES = {
  strength: 'Strength',
  cardio: 'Cardio',
  flexibility: 'Flexibility',
  balance: 'Balance',
  endurance: 'Endurance',
  power: 'Power',
} as const

/**
 * Equipment types
 */
export const EQUIPMENT_TYPES = {
  kettlebell: 'Kettlebell',
  dumbbell: 'Dumbbell',
  barbell: 'Barbell',
  bodyweight: 'Bodyweight',
  resistance_band: 'Resistance Band',
  medicine_ball: 'Medicine Ball',
  none: 'No Equipment',
} as const

/**
 * Program types
 */
export const PROGRAM_TYPES = {
  beginner: 'Beginner Program',
  weight_loss: 'Weight Loss',
  strength_building: 'Strength Building',
  endurance: 'Endurance Training',
  hiit: 'HIIT Training',
  rehabilitation: 'Rehabilitation',
} as const

/**
 * User roles
 */
export const USER_ROLES = {
  user: 'user',
  trainer: 'trainer',
  admin: 'admin',
} as const

/**
 * Subscription tiers
 */
export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic workouts', 'Exercise library'],
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    features: ['All workouts', 'Custom programs', 'Progress tracking'],
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    features: ['Everything in Pro', 'Personal trainer', '1-on-1 sessions'],
  },
} as const

/**
 * UI constants
 */
export const UI_CONSTANTS = {
  breakpoints: {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
  },
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  debounceDelay: 300,
  toastDuration: 5000,
} as const

/**
 * Validation constants
 */
export const VALIDATION_CONSTANTS = {
  email: {
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  },
} as const

/**
 * Storage keys for localStorage/sessionStorage
 */
export const STORAGE_KEYS = {
  user: 'kettlebell_pro_user',
  cart: 'kettlebell_pro_cart',
  preferences: 'kettlebell_pro_preferences',
  theme: 'kettlebell_pro_theme',
  workoutHistory: 'kettlebell_pro_workout_history',
} as const

/**
 * Route paths
 */
export const ROUTES = {
  home: '/',
  workouts: '/workouts',
  programs: '/programs',
  content: '/content',
  cart: '/cart',
  profile: '/profile',
  login: '/auth/login',
  register: '/auth/register',
  dashboard: '/dashboard',
} as const

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  server: 'Server error. Please try again later.',
} as const

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  saved: 'Successfully saved!',
  updated: 'Successfully updated!',
  deleted: 'Successfully deleted!',
  created: 'Successfully created!',
  login: 'Welcome back!',
  logout: 'Successfully logged out!',
  register: 'Account created successfully!',
} as const

export const NAVIGATION = [
  {
    label: 'Workouts',
    to: ROUTES.workouts,
    icon: 'i-heroicons-fire',
  },
  {
    label: 'Programs',
    to: ROUTES.programs,
    icon: 'i-heroicons-academic-cap',
  },
  {
    label: 'Content',
    to: ROUTES.content,
    icon: 'i-heroicons-book-open',
  },
] as const
