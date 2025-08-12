/**
 * Application constants for the Kettlebell Pro application
 */

/**
 * Validation constants
 */
export const VALIDATION = {
  email: {
    pattern: /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
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
    icon: 'i-custom-kettlebell',
    class: '[&_svg]:w-8 [&_svg]:h-8 -ml-1.5 fill-current',
  },
  {
    label: 'Contact',
    to: ROUTES.contact,
    icon: 'i-lucide-mail',
    class: '[&_svg]:mr-1.5',
  },
] as const

export const CONTACT_INFO = [
  {
    icon: 'i-heroicons-envelope',
    label: 'Email',
    value: 'isleychase@gmail.com',
    href: 'mailto:isleychase@gmail.com',
  },
  {
    icon: 'i-heroicons-map-pin',
    label: 'Location',
    value: 'Parrish, FL / Las Vegas, NV',
    href: '#',
  },
] as const
