<script setup lang="ts">
import type { Article, FAQ } from '~/types'

useSeoMeta({
  title: 'Learning Center - Kettlebell Pro',
  description: 'Expand your kettlebell knowledge with our comprehensive learning center. Articles, guides, FAQs, and expert tips to enhance your training.',
})

// Mock featured articles
const featuredArticles: Article[] = [
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
]

// Mock popular FAQs
const popularFAQs: FAQ[] = [
  {
    id: '1',
    question: 'What weight kettlebell should I start with?',
    answer: 'For beginners, we recommend starting with 16kg (35lbs) for men and 12kg (26lbs) for women. However, this can vary based on your current fitness level and strength training experience.',
    category: 'Getting Started',
  },
  {
    id: '2',
    question: 'How often should I train with kettlebells?',
    answer: 'For beginners, 2-3 times per week is ideal, allowing for rest days between sessions. As you progress, you can increase frequency to 4-5 times per week with proper programming.',
    category: 'Training',
  },
  {
    id: '3',
    question: 'Can kettlebell training help with weight loss?',
    answer: 'Yes! Kettlebell training is excellent for weight loss as it combines strength training with cardiovascular conditioning, burning calories both during and after your workout.',
    category: 'Benefits',
  },
  {
    id: '4',
    question: 'Do I need multiple kettlebells?',
    answer: 'While you can get an excellent workout with just one kettlebell, having 2-3 different weights allows for better progression and exercise variety as you advance.',
    category: 'Equipment',
  },
]

// Learning categories
const learningCategories = [
  {
    title: 'Technique Guides',
    description: 'Master proper form and technique for all kettlebell exercises',
    icon: 'i-heroicons-academic-cap',
    color: 'blue',
    articleCount: 25,
    href: '/content/articles?category=technique',
  },
  {
    title: 'Training Programs',
    description: 'Structured workout plans for all fitness levels',
    icon: 'i-heroicons-clipboard-document-list',
    color: 'green',
    articleCount: 18,
    href: '/content/articles?category=programs',
  },
  {
    title: 'Nutrition & Recovery',
    description: 'Optimize your performance with proper nutrition and recovery',
    icon: 'i-heroicons-heart',
    color: 'red',
    articleCount: 15,
    href: '/content/articles?category=nutrition',
  },
  {
    title: 'Equipment & Setup',
    description: 'Choose the right gear and set up your training space',
    icon: 'i-heroicons-wrench-screwdriver',
    color: 'purple',
    articleCount: 12,
    href: '/content/articles?category=equipment',
  },
]

// Stats
const stats = [
  { label: 'Articles', value: '100+' },
  { label: 'Video Guides', value: '50+' },
  { label: 'Expert Contributors', value: '15' },
  { label: 'Monthly Readers', value: '25K+' },
]
</script>

<template>
  <UPage>
    <UPageHero>
      <template #title>
        Learning Center
      </template>
      <template #description>
        Expand your kettlebell knowledge with expert articles, technique guides,
        and comprehensive resources to enhance your training journey.
      </template>
      <template #links>
        <div class="mt-8">
          <UInput
            placeholder="Search articles, guides, and FAQs..."
            icon="i-heroicons-magnifying-glass"
            size="lg"
            class="max-w-md mx-auto"
          />
        </div>
      </template>
    </UPageHero>

    <UPageBody>
      <!-- Stats Section -->
      <section class="py-16 bg-gray-50 dark:bg-gray-800 -mt-8 relative z-10 rounded-t-3xl">
        <UContainer>
          <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center"
            >
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {{ stat.value }}
              </div>
              <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Learning Categories -->
      <section class="py-16">
        <UContainer>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              Explore by Category
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Find the information you need to improve your kettlebell training
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NuxtLink
              v-for="category in learningCategories"
              :key="category.title"
              :to="category.href"
              class="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-lg hover:ring-primary-500"
            >
              <div class="flex items-center space-x-4 mb-4">
                <div :class="`w-12 h-12 bg-${category.color}-100 dark:bg-${category.color}-900 rounded-lg flex items-center justify-center`">
                  <UIcon :name="category.icon" :class="`w-6 h-6 text-${category.color}-600 dark:text-${category.color}-400`" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ category.title }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ category.articleCount }} articles
                  </p>
                </div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ category.description }}
              </p>
            </NuxtLink>
          </div>
        </UContainer>
      </section>

      <!-- Featured Articles -->
      <section class="py-16 bg-gray-50 dark:bg-gray-800">
        <UContainer>
          <div class="flex items-center justify-between mb-12">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                Featured Articles
              </h2>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Latest insights from our expert contributors
              </p>
            </div>
            <UButton
              to="/content/articles"
              variant="outline"
              color="primary"
            >
              View All Articles
              <UIcon name="i-heroicons-arrow-right" class="ml-2 w-4 h-4" />
            </UButton>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="article in featuredArticles"
              :key="article.id"
              class="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 transition-all hover:shadow-lg hover:ring-primary-500"
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
                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span>{{ article.author }}</span>
                  </div>
                  <time>{{ new Date(article.publishedAt).toLocaleDateString() }}</time>
                </div>

                <!-- Read More Button -->
                <div class="mt-4">
                  <UButton
                    :to="`/content/articles/${article.id}`"
                    variant="ghost"
                    color="primary"
                    size="sm"
                  >
                    Read Article
                    <UIcon name="i-heroicons-arrow-right" class="ml-1 w-3 h-3" />
                  </UButton>
                </div>
              </div>
            </article>
          </div>
        </UContainer>
      </section>

      <!-- Popular FAQs -->
      <section class="py-16">
        <UContainer>
          <div class="flex items-center justify-between mb-12">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Quick answers to common kettlebell training questions
              </p>
            </div>
            <UButton
              to="/content/faq"
              variant="outline"
              color="primary"
            >
              View All FAQs
              <UIcon name="i-heroicons-arrow-right" class="ml-2 w-4 h-4" />
            </UButton>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="faq in popularFAQs"
              :key="faq.id"
              class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
            >
              <div class="flex items-start space-x-3 mb-3">
                <UBadge
                  :label="faq.category"
                  variant="soft"
                  color="primary"
                  size="xs"
                />
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
                {{ faq.question }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-primary-600 dark:bg-primary-700">
        <UContainer>
          <div class="text-center">
            <h2 class="text-3xl font-bold text-white">
              Ready to Start Training?
            </h2>
            <p class="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
              Put your knowledge into practice with our comprehensive workout programs and expert guidance.
            </p>
            <div class="mt-8 flex justify-center gap-4">
              <UButton
                to="/programs"
                size="xl"
                color="white"
                variant="solid"
                class="font-semibold"
              >
                Browse Programs
              </UButton>
              <UButton
                to="/workouts"
                size="xl"
                color="white"
                variant="outline"
                class="font-semibold"
              >
                Free Workouts
              </UButton>
            </div>
          </div>
        </UContainer>
      </section>
    </UPageBody>
  </UPage>
</template>
