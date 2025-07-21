<script setup lang="ts">
interface Props {
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  exerciseType?: 'strength' | 'cardio' | 'endurance' | 'power' | 'mobility' | 'combination'
  bodyPosition?: 'standing' | 'kneeling' | 'lying' | 'sitting' | 'multiple'
  targetMuscleGroups?: string[]
  secondaryMuscleGroups?: string[]
  equipment?: string[]
  bodyPart?: string
  category?: string
}

withDefaults(defineProps<Props>(), {})

const difficultyColors = {
  beginner: 'green',
  intermediate: 'yellow',
  advanced: 'red',
} as const

const exerciseTypeIcons = {
  strength: 'i-lucide-dumbbell',
  cardio: 'i-lucide-heart',
  endurance: 'i-lucide-timer',
  power: 'i-lucide-zap',
  mobility: 'i-lucide-move',
  combination: 'i-lucide-layers',
} as const

const bodyPositionIcons = {
  standing: 'i-lucide-user',
  kneeling: 'i-lucide-user-check',
  lying: 'i-lucide-bed',
  sitting: 'i-lucide-armchair',
  multiple: 'i-lucide-users',
} as const
</script>

<template>
  <UCard class="mb-6">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-info" class="text-primary" />
        <h3 class="text-lg font-semibold">
          Exercise Details
        </h3>
      </div>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Basic Info -->
      <div class="space-y-4">
        <div v-if="difficulty" class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted-foreground">Difficulty</span>
          <UBadge
            :label="difficulty.charAt(0).toUpperCase() + difficulty.slice(1)"
            :color="difficultyColors[difficulty]"
            variant="solid"
          />
        </div>

        <div v-if="exerciseType" class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted-foreground">Type</span>
          <div class="flex items-center gap-2">
            <UIcon :name="exerciseTypeIcons[exerciseType]" class="w-4 h-4" />
            <UBadge
              :label="exerciseType.charAt(0).toUpperCase() + exerciseType.slice(1)"
              variant="outline"
            />
          </div>
        </div>

        <div v-if="bodyPosition" class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted-foreground">Position</span>
          <div class="flex items-center gap-2">
            <UIcon :name="bodyPositionIcons[bodyPosition]" class="w-4 h-4" />
            <UBadge
              :label="bodyPosition.charAt(0).toUpperCase() + bodyPosition.slice(1)"
              variant="outline"
            />
          </div>
        </div>

        <div v-if="bodyPart" class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted-foreground">Body Part</span>
          <UBadge :label="bodyPart" variant="outline" />
        </div>

        <div v-if="category" class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted-foreground">Category</span>
          <UBadge :label="category" variant="outline" />
        </div>
      </div>

      <!-- Muscle Groups & Equipment -->
      <div class="space-y-4">
        <div v-if="targetMuscleGroups?.length">
          <h4 class="text-sm font-medium text-muted-foreground mb-2">
            Primary Muscles
          </h4>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="muscle in targetMuscleGroups"
              :key="muscle"
              :label="muscle"
              color="primary"
              variant="soft"
            />
          </div>
        </div>

        <div v-if="secondaryMuscleGroups?.length">
          <h4 class="text-sm font-medium text-muted-foreground mb-2">
            Secondary Muscles
          </h4>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="muscle in secondaryMuscleGroups"
              :key="muscle"
              :label="muscle"
              variant="outline"
            />
          </div>
        </div>

        <div v-if="equipment?.length">
          <h4 class="text-sm font-medium text-muted-foreground mb-2">
            Equipment
          </h4>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="item in equipment"
              :key="item"
              :label="item"
              color="gray"
              variant="soft"
            />
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
