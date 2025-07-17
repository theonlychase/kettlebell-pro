<script setup lang="ts">
import type { Article } from '~/types'

useSeoMeta({
  title: 'Articles - Kettlebell Pro Learning Center',
  description: 'Browse our comprehensive collection of kettlebell training articles. Expert insights, technique guides, and training tips for all levels.',
})

// Mock articles data
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Complete Guide to Kettlebell Swings',
    description: 'Master the fundamental kettlebell movement with proper form, common mistakes to avoid, and progression tips.',
    content: '',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15',
    imageUrl: '/images/articles/kettlebell-swings.jpg',
    tags: ['technique', 'fundamentals', 'beginner'],
    readTime: 8,
  },
  {
    id: '2',
    title: 'Building Your Home Kettlebell Gym',
    description: 'Everything you need to know about setting up an effective kettlebell training space at home.',
    content: '',
    author: 'Mike Chen',
    publishedAt: '2024-01-12',
    imageUrl: '/images/articles/home-gym.jpg',
    tags: ['equipment', 'setup', 'home-training'],
    readTime: 6,
  },
  {
    id: '3',
    title: 'Nutrition for Kettlebell Athletes',
    description: 'Optimize your performance and recovery with proper nutrition strategies for kettlebell training.',
    content: '',
    author: 'Dr. Lisa Martinez',
    publishedAt: '2024-01-10',
    imageUrl: '/images/articles/nutrition.jpg',
    tags: ['nutrition', 'performance', 'recovery'],
    readTime: 12,
  },
  {
    id: '4',
    title: 'Turkish Get-Up: Step-by-Step Guide',
    description: 'Learn the complex but rewarding Turkish Get-Up movement with detailed breakdown and progressions.',
    content: '',
    author: 'Alex Rodriguez',
    publishedAt: '2024-01-08',
    imageUrl: '/images/articles/turkish-getup.jpg',
    tags: ['technique', 'advanced', 'mobility'],
    readTime: 15,
  },
  {
    id: '5',
    title: 'Kettlebell Training for Fat Loss',
    description: 'Discover how to structure your kettlebell workouts for maximum fat burning and body composition changes.',
    content: '',
    author: 'Jennifer Kim',
    publishedAt: '2024-01-05',
    imageUrl: '/images/articles/fat-loss.jpg',
    tags: ['fat-loss', 'programming', 'intermediate'],
    readTime: 10,
  },
  {
    id: '6',
    title: 'Injury Prevention in Kettlebell Training',
    description: 'Essential tips and strategies to train safely and prevent common kettlebell-related injuries.',
    content: '',
    author: 'Dr. Mark Thompson',
    publishedAt: '2024-01-03',
    imageUrl: '/images/articles/injury-prevention.jpg',
    tags: ['safety', 'injury-prevention', 'technique'],
    readTime: 9,
  },
  {
    id: '7',
    title: 'Advanced Kettlebell Flows and Complexes',
    description: 'Take your training to the next level with challenging kettlebell flows and movement complexes.',
    content: '',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-01',
    imageUrl: '/images/articles/advanced-flows.jpg',
    tags: ['advanced', 'flows', 'programming'],
    readTime: 14,
  },
  {
    id: '8',
    title: 'Kettlebell Training During Pregnancy',
    description: 'Safe and effective kettlebell exercises for expecting mothers with modifications and precautions.',
    content: '',
    author: 'Dr. Emily Watson',
    publishedAt: '2023-12-28',
    imageUrl: '/images/articles/pregnancy.jpg',
    tags: ['pregnancy', 'safety', 'modifications'],
    readTime: 11,
  },
]

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref(null)
const selectedTag = ref(null)
const sortBy = ref('newest')

// Filter options
const categoryOptions = [
  { label: 'All Categories', value: null },
  { label: 'Technique', value: 'technique' },
  { label: 'Programming', value: 'programming' },
  { label: 'Nutrition', value: 'nutrition' },
  { label: 'Equipment', value: 'equipment' },
  { label: 'Safety', value: 'safety' },
]

const tagOptions = [
  { label: 'All Tags', value: null },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Fundamentals', value: 'fundamentals' },
  { label: 'Fat Loss', value: 'fat-loss' },
  { label: 'Performance', value: 'performance' },
]

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Shortest Read', value: 'shortest' },
  { label: 'Longest Read', value: 'longest' },
]

// Computed filtered and sorted articles
const filteredArticles = computed(() => {
  const filtered = mockArticles.filter((article) => {
    const matchesSearch = !searchQuery.value
      || article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      || article.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      || article.author.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = !selectedCategory.value
      || article.tags.includes(selectedCategory.value)

    const matchesTag = !selectedTag.value
      || article.tags.includes(selectedTag.value)

    return matchesSearch && matchesCategory && matchesTag
  })

  // Apply sorting
  switch (sortBy.value) {
    case 'oldest':
      filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
      break
    case 'popular':
      // Mock popularity sorting - in real app would use actual metrics
      filtered.sort(() => Math.random() - 0.5)
      break
    case 'shortest':
      filtered.sort((a, b) => a.readTime - b.readTime)
      break
    case 'longest':
      filtered.sort((a, b) => b.readTime - a.readTime)
      break
    case 'newest':
    default:
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      break
  }

  return filtered
})

// Get all unique tags for display
const allTags = computed(() => {
  const tags = new Set<string>()
  mockArticles.forEach((article) => {
    article.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
  selectedTag.value = null
  sortBy.value = 'newest'
}

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <UPage>
    <UPageHeader
      title="Articles"
      description="Expert insights, technique guides, and training tips to enhance your kettlebell journey."
    />

    <UContainer>
      <UPageBody>
        <!-- Search and Filters -->
        <div class="mb-8 space-y-4">
          <!-- Search Bar -->
          <div class="relative">
            <UInput
              v-model="searchQuery"
              placeholder="Search articles..."
              icon="i-heroicons-magnifying-glass"
              size="lg"
              class="w-full"
            />
          </div>

          <!-- Filter Controls -->
          <div class="flex flex-wrap gap-4">
            <USelect
              v-model="selectedCategory"
              :items="categoryOptions"
              placeholder="Category"
              class="min-w-[150px]"
            />
            <USelect
              v-model="selectedTag"
              :items="tagOptions"
              placeholder="Tag"
              class="min-w-[150px]"
            />
            <USelect
              v-model="sortBy"
              :items="sortOptions"
              placeholder="Sort By"
              class="min-w-[150px]"
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
            {{ filteredArticles.length }} article{{ filteredArticles.length !== 1 ? 's' : '' }} found
          </div>
        </div>

        <!-- Articles Grid -->
        <div
          v-if="filteredArticles.length > 0"
          class="space-y-8"
        >
          <!-- Featured Article (First Article) -->
          <article
            v-if="filteredArticles.length > 0"
            class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-lg hover:ring-primary-500"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <!-- Article Image -->
              <div class="aspect-video lg:aspect-square bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20" />
                <div class="absolute top-4 left-4">
                  <UBadge
                    label="Featured"
                    color="white"
                    variant="solid"
                  />
                </div>
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="flex items-center justify-between text-white text-sm">
                    <span>{{ filteredArticles[0].readTime }} min read</span>
                    <div class="flex flex-wrap gap-1">
                      <UBadge
                        v-for="tag in filteredArticles[0].tags.slice(0, 3)"
                        :key="tag"
                        :label="tag"
                        variant="soft"
                        color="white"
                        size="xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Article Content -->
              <div class="p-8 flex flex-col justify-center">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-4">
                  {{ filteredArticles[0].title }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                  {{ filteredArticles[0].description }}
                </p>

                <!-- Article Meta -->
                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <div>
                      <div class="font-medium text-gray-900 dark:text-white">
                        {{ filteredArticles[0].author }}
                      </div>
                      <div>{{ formatDate(filteredArticles[0].publishedAt) }}</div>
                    </div>
                  </div>
                </div>

                <!-- Read More Button -->
                <div>
                  <UButton
                    :to="`/content/articles/${filteredArticles[0].id}`"
                    color="primary"
                    size="lg"
                  >
                    Read Article
                    <UIcon
                      name="i-heroicons-arrow-right"
                      class="ml-2 w-4 h-4"
                    />
                  </UButton>
                </div>
              </div>
            </div>
          </article>

          <!-- Regular Articles Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="article in filteredArticles.slice(1)"
              :key="article.id"
              class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-lg hover:ring-primary-500"
            >
              <!-- Article Image -->
              <div class="aspect-video bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20" />
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="flex items-center justify-between text-white text-sm">
                    <span>{{ article.readTime }} min read</span>
                    <div class="flex flex-wrap gap-1">
                      <UBadge
                        v-for="tag in article.tags.slice(0, 2)"
                        :key="tag"
                        :label="tag"
                        variant="soft"
                        color="white"
                        size="xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Article Content -->
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                  {{ article.title }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {{ article.description }}
                </p>

                <!-- Article Meta -->
                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span>{{ article.author }}</span>
                  </div>
                  <time>{{ formatDate(article.publishedAt) }}</time>
                </div>

                <!-- Read More Button -->
                <div>
                  <UButton
                    :to="`/content/articles/${article.id}`"
                    variant="ghost"
                    color="primary"
                    size="sm"
                    block
                  >
                    Read Article
                    <UIcon
                      name="i-heroicons-arrow-right"
                      class="ml-1 w-3 h-3"
                    />
                  </UButton>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="text-center py-12"
        >
          <UIcon
            name="i-heroicons-document-text"
            class="mx-auto h-12 w-12 text-gray-400"
          />
          <h3 class="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No articles found
          </h3>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or clearing the filters.
          </p>
          <UButton
            class="mt-4"
            variant="outline"
            @click="clearFilters"
          >
            Clear All Filters
          </UButton>
        </div>

        <!-- Popular Tags -->
        <section
          v-if="filteredArticles.length > 0"
          class="mt-16 py-8 border-t border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Popular Tags
          </h3>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="tag in allTags.slice(0, 12)"
              :key="tag"
              :variant="selectedTag === tag ? 'solid' : 'soft'"
              :color="selectedTag === tag ? 'primary' : 'gray'"
              size="xs"
              @click="selectedTag = selectedTag === tag ? '' : tag"
            >
              {{ tag }}
            </UButton>
          </div>
        </section>
      </UPageBody>
    </UContainer>
  </UPage>
</template>
