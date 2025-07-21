/**
 * Application constants for the Kettlebell Pro application
 */

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
 * Route paths
 */
export const ROUTES = {
  home: '/',
  exercises: '/exercises',
  workouts: '/workouts',
  programs: '/programs',
  blog: '/blog',
  contact: '/contact',
} as const

export const NAVIGATION = [
  {
    label: 'Exercises',
    to: ROUTES.exercises,
    icon: 'i-lucide-dumbbell',
  },
  // {
  //   label: 'Blog',
  //   to: ROUTES.blog,
  //   icon: 'i-heroicons-book-open',
  // },
  {
    label: 'Contact',
    to: ROUTES.contact,
    icon: 'i-lucide-mail',
  },
] as const
