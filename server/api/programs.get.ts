import type { Program } from '~/types'

// Mock program data - in production this would come from database
const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Beginner Kettlebell Mastery',
    description: 'A comprehensive 4-week program designed for complete beginners. Learn proper form, build strength, and develop confidence with kettlebell training.',
    price: 49.99,
    salePrice: 39.99,
    duration: '4 weeks',
    level: 'beginner',
    workouts: [], // Would be populated with actual workout data
    features: [
      '20+ guided video workouts',
      'Progressive difficulty levels',
      'Proper form instruction',
      'Nutrition guidelines',
      'Progress tracking tools',
      'Community support access',
      'Downloadable workout PDFs',
      'Email support from trainers',
      'Mobile app access',
      '30-day money-back guarantee',
    ],
    imageUrl: '/images/programs/beginner-mastery.jpg',
  },
  {
    id: '2',
    title: 'Intermediate Strength Builder',
    description: 'Take your kettlebell training to the next level with this 6-week intermediate program focusing on strength, power, and conditioning.',
    price: 79.99,
    duration: '6 weeks',
    level: 'intermediate',
    workouts: [],
    features: [
      '30+ challenging workouts',
      'Advanced movement patterns',
      'Strength and power focus',
      'Periodized training plan',
      'Recovery protocols',
      'Performance tracking',
      'Nutrition optimization',
      'Form analysis videos',
      'Community challenges',
      'Progress assessments',
    ],
    imageUrl: '/images/programs/intermediate-strength.jpg',
  },
  {
    id: '3',
    title: 'Advanced Athletic Performance',
    description: 'Elite-level kettlebell training program for serious athletes. 8 weeks of intense, sport-specific conditioning and strength development.',
    price: 99.99,
    salePrice: 79.99,
    duration: '8 weeks',
    level: 'advanced',
    workouts: [],
    features: [
      '40+ elite-level workouts',
      'Sport-specific training',
      'Advanced periodization',
      'Competition preparation',
      'Injury prevention protocols',
      'One-on-one coaching calls',
      'Custom program modifications',
      'Performance analytics',
      'Recovery optimization',
      'Mental training modules',
    ],
    imageUrl: '/images/programs/advanced-performance.jpg',
  },
  {
    id: '4',
    title: 'Fat Loss Accelerator',
    description: 'High-intensity kettlebell program designed for maximum fat loss. Combine strength training with metabolic conditioning.',
    price: 59.99,
    duration: '6 weeks',
    level: 'intermediate',
    workouts: [],
    features: [
      '25+ HIIT workouts',
      'Metabolic conditioning focus',
      'Nutrition meal plans',
      'Body composition tracking',
      'Supplement guidance',
      'Progress photos system',
      'Calorie burn optimization',
      'Recipe database',
      'Meal prep guides',
      'Lifestyle coaching',
    ],
    imageUrl: '/images/programs/fat-loss.jpg',
  },
  {
    id: '5',
    title: 'Kettlebell Strength & Power',
    description: 'Build explosive power and raw strength with advanced kettlebell techniques. Perfect for athletes and serious fitness enthusiasts.',
    price: 89.99,
    salePrice: 69.99,
    duration: '8 weeks',
    level: 'advanced',
    workouts: [],
    features: [
      '35+ power-focused workouts',
      'Olympic lifting integration',
      'Plyometric combinations',
      'Strength testing protocols',
      'Power development tracking',
      'Competition preparation',
      'Advanced grip training',
      'Explosive movement patterns',
      'Recovery protocols',
      'Performance benchmarks',
    ],
    imageUrl: '/images/programs/strength-power.jpg',
  },
  {
    id: '6',
    title: 'Mobility & Movement',
    description: 'Improve flexibility, mobility, and movement quality with kettlebell-based corrective exercises and flows.',
    price: 39.99,
    duration: '4 weeks',
    level: 'beginner',
    workouts: [],
    features: [
      '15+ mobility workouts',
      'Movement assessment tools',
      'Corrective exercise protocols',
      'Flexibility improvement plans',
      'Joint health optimization',
      'Pain prevention strategies',
      'Daily mobility routines',
      'Posture correction',
      'Breathing techniques',
      'Stress relief methods',
    ],
    imageUrl: '/images/programs/mobility-movement.jpg',
  },
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))

  let filteredPrograms = [...mockPrograms]

  // Apply filters based on query parameters
  if (query.level) {
    filteredPrograms = filteredPrograms.filter(p => p.level === query.level)
  }

  if (query.priceRange) {
    const [min, max] = (query.priceRange as string).split('-').map(Number)
    filteredPrograms = filteredPrograms.filter((p) => {
      const currentPrice = p.salePrice || p.price
      return currentPrice >= min && currentPrice <= max
    })
  }

  if (query.search) {
    const searchTerm = (query.search as string).toLowerCase()
    filteredPrograms = filteredPrograms.filter(p =>
      p.title.toLowerCase().includes(searchTerm)
      || p.description.toLowerCase().includes(searchTerm),
    )
  }

  // Apply sorting
  if (query.sortBy) {
    switch (query.sortBy) {
      case 'price-asc':
        filteredPrograms.sort((a, b) => {
          const priceA = a.salePrice || a.price
          const priceB = b.salePrice || b.price
          return priceA - priceB
        })
        break
      case 'price-desc':
        filteredPrograms.sort((a, b) => {
          const priceA = a.salePrice || a.price
          const priceB = b.salePrice || b.price
          return priceB - priceA
        })
        break
      case 'newest':
        filteredPrograms.reverse()
        break
      case 'popularity':
      default:
        // Keep original order for popularity (mock)
        break
    }
  }

  // Handle single program request by ID
  if (query.id) {
    const program = mockPrograms.find(p => p.id === query.id)
    if (program) {
      return {
        success: true,
        data: program,
      }
    }
    else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Program not found',
      })
    }
  }

  return {
    success: true,
    data: filteredPrograms,
    total: filteredPrograms.length,
    filters: {
      levels: ['beginner', 'intermediate', 'advanced'],
      priceRanges: [
        { label: 'Under $50', value: '0-50' },
        { label: '$50 - $75', value: '50-75' },
        { label: '$75+', value: '75-999' },
      ],
    },
  }
})
