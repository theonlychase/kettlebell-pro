<script setup lang="ts">
useSeoMeta({
  title: 'About Us - Kettlebell Pro',
  description: 'Learn about Kettlebell Pro, our mission to transform fitness through expert kettlebell training, and meet our team of certified trainers.',
})

// Team members
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Lead Kettlebell Instructor',
    bio: 'Certified RKC instructor with over 10 years of experience. Sarah has helped thousands of people discover the power of kettlebell training.',
    image: '/images/team/sarah-johnson.jpg',
    certifications: ['RKC Level 2', 'SFG Level 1', 'NASM-CPT'],
  },
  {
    name: 'Mike Chen',
    role: 'Strength & Conditioning Coach',
    bio: 'Former Olympic weightlifting coach turned kettlebell specialist. Mike brings elite-level training principles to everyday fitness.',
    image: '/images/team/mike-chen.jpg',
    certifications: ['CSCS', 'SFG Level 2', 'USAW Level 1'],
  },
  {
    name: 'Dr. Lisa Martinez',
    role: 'Sports Medicine & Nutrition',
    bio: 'Sports medicine physician and certified nutritionist. Lisa ensures our programs are safe, effective, and scientifically sound.',
    image: '/images/team/lisa-martinez.jpg',
    certifications: ['MD Sports Medicine', 'CISSN', 'ACSM-CEP'],
  },
  {
    name: 'Alex Rodriguez',
    role: 'Movement Specialist',
    bio: 'Functional movement expert specializing in mobility and corrective exercise. Alex helps members move better and train pain-free.',
    image: '/images/team/alex-rodriguez.jpg',
    certifications: ['FMS Level 2', 'SFMA', 'RKC Level 1'],
  },
]

// Company stats
const stats = [
  { label: 'Years of Experience', value: '15+' },
  { label: 'Certified Trainers', value: '25' },
  { label: 'Programs Created', value: '100+' },
  { label: 'Lives Transformed', value: '50K+' },
]

// Core values
const values = [
  {
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we do, from program design to customer service.',
    icon: 'i-heroicons-star',
  },
  {
    title: 'Safety First',
    description: 'Every program is designed with safety as the top priority, ensuring proper form and injury prevention.',
    icon: 'i-heroicons-shield-check',
  },
  {
    title: 'Accessibility',
    description: 'Fitness should be accessible to everyone, regardless of experience level or physical limitations.',
    icon: 'i-heroicons-heart',
  },
  {
    title: 'Community',
    description: 'We believe in the power of community support to help individuals achieve their fitness goals.',
    icon: 'i-heroicons-user-group',
  },
]

// Milestones
const milestones = [
  {
    year: '2010',
    title: 'Company Founded',
    description: 'Started as a small kettlebell training studio with a passion for functional fitness.',
  },
  {
    year: '2015',
    title: 'Online Platform Launch',
    description: 'Launched our first online training programs to reach fitness enthusiasts worldwide.',
  },
  {
    year: '2018',
    title: 'Mobile App Release',
    description: 'Released our mobile app, making kettlebell training accessible anywhere, anytime.',
  },
  {
    year: '2020',
    title: 'Virtual Training Expansion',
    description: 'Expanded virtual training options during the pandemic, helping people stay fit at home.',
  },
  {
    year: '2023',
    title: 'AI-Powered Personalization',
    description: 'Introduced AI-powered program recommendations for personalized training experiences.',
  },
]
</script>

<template>
  <UPage>
    <UPageHero>
      <template #title>
        About Kettlebell Pro
      </template>
      <template #description>
        We're on a mission to transform lives through the power of kettlebell training.
        Since 2010, we've been helping people discover their strength, build confidence,
        and achieve their fitness goals with expert guidance and proven programs.
      </template>
    </UPageHero>

    <UPageBody>
      <!-- Mission Statement -->
      <section class="py-16">
        <UContainer>
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To make kettlebell training accessible, safe, and effective for everyone. We believe that
              fitness should be empowering, not intimidating. Through our comprehensive programs, expert
              instruction, and supportive community, we help people of all fitness levels discover the
              transformative power of kettlebell training.
            </p>
          </div>
        </UContainer>
      </section>

      <!-- Stats Section -->
      <section class="py-16 bg-gray-50 dark:bg-gray-800">
        <UContainer>
          <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center"
            >
              <div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Core Values -->
      <section class="py-16">
        <UContainer>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              Our Core Values
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="value in values"
              :key="value.title"
              class="text-center"
            >
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <UIcon :name="value.icon" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {{ value.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ value.description }}
              </p>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Team Section -->
      <section class="py-16 bg-gray-50 dark:bg-gray-800">
        <UContainer>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              Meet Our Expert Team
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Certified professionals dedicated to your success
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="member in teamMembers"
              :key="member.name"
              class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 text-center"
            >
              <!-- Team Member Image -->
              <div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UIcon name="i-heroicons-user" class="w-12 h-12 text-white" />
              </div>

              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {{ member.name }}
              </h3>
              <p class="text-primary-600 dark:text-primary-400 text-sm font-medium mb-3">
                {{ member.role }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ member.bio }}
              </p>

              <!-- Certifications -->
              <div class="space-y-1">
                <p class="text-xs font-medium text-gray-900 dark:text-white">
                  Certifications:
                </p>
                <div class="flex flex-wrap gap-1 justify-center">
                  <UBadge
                    v-for="cert in member.certifications"
                    :key="cert"
                    :label="cert"
                    variant="soft"
                    color="primary"
                    size="xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Company Timeline -->
      <section class="py-16">
        <UContainer>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              Our Journey
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Key milestones in our mission to transform fitness
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="space-y-8">
              <div
                v-for="(milestone, index) in milestones"
                :key="milestone.year"
                class="flex items-start space-x-4"
              >
                <!-- Timeline Dot -->
                <div class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center relative">
                  <div class="w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full" />
                  <div
                    v-if="index < milestones.length - 1"
                    class="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-200 dark:bg-gray-700"
                  />
                </div>

                <!-- Timeline Content -->
                <div class="flex-1 pb-8">
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {{ milestone.year }}
                    </span>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {{ milestone.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    {{ milestone.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-primary-600 dark:bg-primary-700">
        <UContainer>
          <div class="text-center">
            <h2 class="text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p class="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of people who have transformed their lives with Kettlebell Pro.
              Start with our beginner-friendly programs and expert guidance.
            </p>
            <div class="flex justify-center gap-4">
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
                to="/contact"
                size="xl"
                color="white"
                variant="outline"
                class="font-semibold"
              >
                Contact Us
              </UButton>
            </div>
          </div>
        </UContainer>
      </section>
    </UPageBody>
  </UPage>
</template>
