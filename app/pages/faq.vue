<script setup lang="ts">
useSeoMeta({
  title: 'FAQ - Kettlebell Pro',
  description: 'Find answers to frequently asked questions about kettlebell training, our programs, equipment, and more.',
})

// Mock FAQ data
const mockFAQs: FAQ[] = [
  // Getting Started
  {
    id: '1',
    question: 'What weight kettlebell should I start with?',
    answer: 'For beginners, we recommend starting with 16kg (35lbs) for men and 12kg (26lbs) for women. However, this can vary based on your current fitness level and strength training experience. If you\'re completely new to strength training, you might want to start with 12kg (26lbs) for men and 8kg (18lbs) for women. The key is to choose a weight that allows you to maintain proper form throughout your workout.',
    category: 'Getting Started',
  },
  {
    id: '2',
    question: 'Do I need any prior experience to start kettlebell training?',
    answer: 'No prior experience is necessary! Our beginner programs are designed specifically for people who are new to kettlebell training. We start with fundamental movements and proper form before progressing to more complex exercises. However, if you have any health concerns or injuries, we recommend consulting with a healthcare provider before starting any new exercise program.',
    category: 'Getting Started',
  },
  {
    id: '3',
    question: 'What should I wear for kettlebell training?',
    answer: 'Wear comfortable, breathable athletic clothing that allows for full range of motion. Avoid loose clothing that might get caught on the kettlebell. For footwear, choose flat-soled shoes or train barefoot for better stability. Avoid running shoes with thick, cushioned soles as they can affect your balance during kettlebell exercises.',
    category: 'Getting Started',
  },

  // Training
  {
    id: '4',
    question: 'How often should I train with kettlebells?',
    answer: 'For beginners, 2-3 times per week is ideal, allowing for rest days between sessions for recovery. As you progress and your body adapts, you can increase frequency to 4-5 times per week. Advanced practitioners might train daily with proper programming that varies intensity and focuses on different movement patterns.',
    category: 'Training',
  },
  {
    id: '5',
    question: 'How long should my kettlebell workouts be?',
    answer: 'Kettlebell workouts can be very effective in short time frames. Beginners might start with 15-20 minute sessions, while more advanced practitioners can benefit from 30-45 minute workouts. The intensity of kettlebell training means you can achieve excellent results in shorter time periods compared to traditional gym workouts.',
    category: 'Training',
  },
  {
    id: '6',
    question: 'Can I do kettlebell training if I have back problems?',
    answer: 'Kettlebell training can actually help strengthen your back when done with proper form, but you should consult with a healthcare provider first. Many of our exercises focus on posterior chain strengthening, which can improve back health. We recommend starting with our mobility and movement program and working with a qualified instructor initially.',
    category: 'Training',
  },

  // Equipment
  {
    id: '7',
    question: 'Do I need multiple kettlebells?',
    answer: 'While you can get an excellent workout with just one kettlebell, having 2-3 different weights allows for better progression and exercise variety as you advance. A typical progression might be 12kg → 16kg → 20kg for women, and 16kg → 20kg → 24kg for men. You can also use different weights for different exercises based on muscle group strength.',
    category: 'Equipment',
  },
  {
    id: '8',
    question: 'What\'s the difference between cast iron and competition kettlebells?',
    answer: 'Cast iron kettlebells vary in size based on weight, while competition kettlebells maintain the same dimensions regardless of weight. Competition kettlebells are typically more expensive but offer consistent grip and feel across different weights. For home use, quality cast iron kettlebells are perfectly adequate and more budget-friendly.',
    category: 'Equipment',
  },
  {
    id: '9',
    question: 'How much space do I need for kettlebell training?',
    answer: 'You need surprisingly little space! A 6x6 foot area is sufficient for most kettlebell exercises. Make sure you have enough ceiling height for overhead movements (at least 8 feet) and clear space around you for swinging movements. A garage, basement, or even a living room can work well.',
    category: 'Equipment',
  },

  // Benefits
  {
    id: '10',
    question: 'Can kettlebell training help with weight loss?',
    answer: 'Yes! Kettlebell training is excellent for weight loss as it combines strength training with cardiovascular conditioning, burning calories both during and after your workout (EPOC effect). The compound movements work multiple muscle groups simultaneously, leading to higher calorie burn compared to isolation exercises.',
    category: 'Benefits',
  },
  {
    id: '11',
    question: 'Will kettlebell training make me bulky?',
    answer: 'No, kettlebell training typically creates lean, functional muscle rather than bulk. The high-rep, dynamic nature of most kettlebell exercises promotes muscle endurance and cardiovascular fitness. Building significant muscle mass requires specific programming, nutrition, and typically heavier weights than most people use for kettlebell training.',
    category: 'Benefits',
  },
  {
    id: '12',
    question: 'How quickly will I see results?',
    answer: 'Many people notice improvements in strength and endurance within 2-3 weeks of consistent training. Visible body composition changes typically occur within 4-6 weeks with proper nutrition. Significant strength gains and movement quality improvements continue to develop over months of consistent practice.',
    category: 'Benefits',
  },

  // Programs
  {
    id: '13',
    question: 'What\'s included in your training programs?',
    answer: 'Our programs include detailed workout plans, video demonstrations of all exercises, progression guidelines, nutrition recommendations, and access to our community support. Premium programs also include personalized coaching check-ins and custom modifications based on your goals and limitations.',
    category: 'Programs',
  },
  {
    id: '14',
    question: 'Can I modify the programs for my fitness level?',
    answer: 'Absolutely! All our programs include modifications for different fitness levels and physical limitations. We provide scaling options for exercises, alternative movements for injuries, and progression/regression guidelines so you can adapt the program to your current abilities.',
    category: 'Programs',
  },
  {
    id: '15',
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee on all our programs. If you\'re not satisfied with your purchase for any reason, contact our support team within 30 days for a full refund. We want you to be completely happy with your investment in your fitness journey.',
    category: 'Programs',
  },
]

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref(null)
const expandedItems = ref<Set<string>>(new Set())

// Categories
const categories = [
  { label: 'All Categories', value: null },
  { label: 'Getting Started', value: 'Getting Started' },
  { label: 'Training', value: 'Training' },
  { label: 'Equipment', value: 'Equipment' },
  { label: 'Benefits', value: 'Benefits' },
  { label: 'Programs', value: 'Programs' },
]

// Computed filtered FAQs
const filteredFAQs = computed(() => {
  return mockFAQs.filter((faq) => {
    const matchesSearch = !searchQuery.value
      || faq.question.toLowerCase().includes(searchQuery.value.toLowerCase())
      || faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = !selectedCategory.value || faq.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

// Group FAQs by category
const groupedFAQs = computed(() => {
  const groups: Record<string, FAQ[]> = {}
  filteredFAQs.value.forEach((faq) => {
    if (!groups[faq.category]) {
      groups[faq.category] = []
    }
    groups[faq.category].push(faq)
  })
  return groups
})

// Toggle FAQ expansion
const toggleFAQ = (id: string) => {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id)
  }
  else {
    expandedItems.value.add(id)
  }
}

// Clear filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
}

// Category stats
const categoryStats = computed(() => {
  const stats: Record<string, number> = {}
  mockFAQs.forEach((faq) => {
    stats[faq.category] = (stats[faq.category] || 0) + 1
  })
  return stats
})
</script>

<template>
  <UPage>
    <UPageHeader
      title="Frequently Asked Questions"
      description="Find answers to common questions about kettlebell training, our programs, and getting started."
    />

    <UPageBody class="page-container">
      <!-- Search and Filters -->
      <div class="mb-8 space-y-4">
        <!-- Search Bar -->
        <div class="relative">
          <UInput
            v-model="searchQuery"
            placeholder="Search FAQs..."
            icon="i-heroicons-magnifying-glass"
            size="lg"
            class="w-full"
          />
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap gap-4">
          <USelect
            v-model="selectedCategory"
            :items="categories"
            placeholder="Category"
            class="min-w-[200px]"
          />
          <UButton
            variant="outline"
            color="gray"
            @click="clearFilters"
          >
            Clear Filters
          </UButton>
        </div>

        <!-- Results Count -->
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {{ filteredFAQs.length }} question{{ filteredFAQs.length !== 1 ? 's' : '' }} found
        </div>
      </div>

      <!-- Category Overview (when no category selected) -->
      <div
        v-if="!selectedCategory && !searchQuery"
        class="mb-12"
      >
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Browse by Category
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            v-for="category in categories.slice(1)"
            :key="category.value"
            class="text-left p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:shadow-md hover:ring-primary-500 transition-all"
            @click="selectedCategory = category.value"
          >
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
              {{ category.label }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ categoryStats[category.value] || 0 }} questions
            </p>
          </button>
        </div>
      </div>

      <!-- FAQ List -->
      <div v-if="selectedCategory || searchQuery || filteredFAQs.length > 0">
        <!-- Grouped by Category -->
        <div
          v-if="!selectedCategory && !searchQuery"
          class="space-y-12"
        >
          <div
            v-for="(faqs, category) in groupedFAQs"
            :key="category"
            class="space-y-6"
          >
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ category }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="faq in faqs"
                :key="faq.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
              >
                <button
                  class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  @click="toggleFAQ(faq.id)"
                >
                  <h3 class="font-semibold text-gray-900 dark:text-white pr-4">
                    {{ faq.question }}
                  </h3>
                  <UIcon
                    :name="expandedItems.has(faq.id) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                    class="w-5 h-5 text-gray-400 flex-shrink-0"
                  />
                </button>
                <div
                  v-if="expandedItems.has(faq.id)"
                  class="px-6 pb-6"
                >
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filtered Results -->
        <div
          v-else
          class="space-y-4"
        >
          <div
            v-for="faq in filteredFAQs"
            :key="faq.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
          >
            <button
              class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              @click="toggleFAQ(faq.id)"
            >
              <div class="flex-1 pr-4">
                <div class="flex items-center space-x-2 mb-1">
                  <UBadge
                    :label="faq.category"
                    variant="soft"
                    color="primary"
                    size="xs"
                  />
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  {{ faq.question }}
                </h3>
              </div>
              <UIcon
                :name="expandedItems.has(faq.id) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                class="w-5 h-5 text-gray-400 flex-shrink-0"
              />
            </button>
            <div
              v-if="expandedItems.has(faq.id)"
              class="px-6 pb-6"
            >
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center py-12"
      >
        <UIcon
          name="i-heroicons-question-mark-circle"
          class="mx-auto h-12 w-12 text-gray-400"
        />
        <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          No questions found
        </h3>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or clearing the filters.
        </p>
        <UButton
          class="mt-4"
          variant="outline"
          @click="clearFilters"
        >
          Clear Filters
        </UButton>
      </div>
    </UPageBody>
    <!-- Contact Support -->
    <section class="py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Still have questions?
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Can't find the answer you're looking for? Our support team is here to help you get started with your kettlebell training journey.
        </p>
        <div class="flex justify-center gap-4">
          <UButton
            to="/contact"
            color="primary"
            size="lg"
          >
            Contact Support
            <UIcon
              name="i-heroicons-envelope"
              class="ml-2 w-4 h-4"
            />
          </UButton>
          <UButton
            to="/content"
            variant="outline"
            color="primary"
            size="lg"
          >
            Browse Articles
            <UIcon
              name="i-heroicons-book-open"
              class="ml-2 w-4 h-4"
            />
          </UButton>
        </div>
      </div>
    </section>
  </UPage>
</template>
