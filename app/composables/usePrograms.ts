import type { Program } from '~/types'

// Mock program data - in production this would come from API
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
    ],
    imageUrl: '/images/programs/fat-loss.jpg',
  },
]

export const usePrograms = () => {
  const programs = ref<Program[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all programs
  const fetchPrograms = async () => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      programs.value = mockPrograms
    }
    catch (err) {
      error.value = 'Failed to fetch programs'
      console.error('Error fetching programs:', err)
    }
    finally {
      loading.value = false
    }
  }

  // Fetch single program by ID
  const fetchProgram = async (id: string): Promise<Program | null> => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      const program = mockPrograms.find(p => p.id === id)
      return program || null
    }
    catch (err) {
      error.value = 'Failed to fetch program'
      console.error('Error fetching program:', err)
      return null
    }
    finally {
      loading.value = false
    }
  }

  // Filter programs by criteria
  const filterPrograms = (
    searchQuery?: string,
    level?: string,
    priceRange?: { min: number, max: number },
  ) => {
    return programs.value.filter((program) => {
      const matchesSearch = !searchQuery
        || program.title.toLowerCase().includes(searchQuery.toLowerCase())
        || program.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLevel = !level || program.level === level

      const currentPrice = program.salePrice || program.price
      const matchesPrice = !priceRange
        || (currentPrice >= priceRange.min && currentPrice <= priceRange.max)

      return matchesSearch && matchesLevel && matchesPrice
    })
  }

  // Get programs by level
  const getProgramsByLevel = (level: 'beginner' | 'intermediate' | 'advanced') => {
    return programs.value.filter(program => program.level === level)
  }

  // Get featured programs (first 3 for homepage)
  const getFeaturedPrograms = () => {
    return programs.value.slice(0, 3)
  }

  // Get programs on sale
  const getSalePrograms = () => {
    return programs.value.filter(program => program.salePrice && program.salePrice < program.price)
  }

  // Search programs
  const searchPrograms = (query: string) => {
    return programs.value.filter(program =>
      program.title.toLowerCase().includes(query.toLowerCase())
      || program.description.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Get program price (considering sale price)
  const getProgramPrice = (program: Program) => {
    return program.salePrice || program.price
  }

  // Calculate discount percentage
  const getDiscountPercentage = (program: Program) => {
    if (!program.salePrice) return 0
    return Math.round(((program.price - program.salePrice) / program.price) * 100)
  }

  // Check if program is on sale
  const isProgramOnSale = (program: Program) => {
    return program.salePrice && program.salePrice < program.price
  }

  // Get price range for filtering
  const getPriceRange = () => {
    const prices = programs.value.map(p => p.salePrice || p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  }

  // Sort programs by price
  const sortProgramsByPrice = (ascending = true) => {
    return [...programs.value].sort((a, b) => {
      const priceA = a.salePrice || a.price
      const priceB = b.salePrice || b.price
      return ascending ? priceA - priceB : priceB - priceA
    })
  }

  // Sort programs by popularity (mock - would use actual data)
  const sortProgramsByPopularity = () => {
    // Mock popularity sorting - in real app would use purchase/rating data
    return [...programs.value].sort(() => Math.random() - 0.5)
  }

  return {
    programs: readonly(programs),
    loading: readonly(loading),
    error: readonly(error),
    fetchPrograms,
    fetchProgram,
    filterPrograms,
    getProgramsByLevel,
    getFeaturedPrograms,
    getSalePrograms,
    searchPrograms,
    getProgramPrice,
    getDiscountPercentage,
    isProgramOnSale,
    getPriceRange,
    sortProgramsByPrice,
    sortProgramsByPopularity,
  }
}
