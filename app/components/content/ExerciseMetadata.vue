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
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
    <!-- Basic Info -->
    <div class="space-y-4">
      <div
        v-if="difficulty"
        class="flex flex-wrap items-center justify-between gap-2"
      >
        <span class="text-sm font-medium text-muted-foreground">Difficulty</span>
        <UBadge
          :label="difficulty.charAt(0).toUpperCase() + difficulty.slice(1)"
          variant="outline"
        />
      </div>

      <div
        v-if="exerciseType"
        class="flex items-center justify-between"
      >
        <span class="text-sm font-medium text-muted-foreground">Type</span>
        <div class="flex items-center gap-2">
          <UBadge
            :label="exerciseType.charAt(0).toUpperCase() + exerciseType.slice(1)"
            variant="outline"
          />
        </div>
      </div>

      <div
        v-if="bodyPosition"
        class="flex items-center justify-between"
      >
        <span class="text-sm font-medium text-muted-foreground">Position</span>
        <div class="flex items-center gap-2">
          <UBadge
            :label="bodyPosition.charAt(0).toUpperCase() + bodyPosition.slice(1)"
            variant="outline"
          />
        </div>
      </div>

      <div
        v-if="bodyPart"
        class="flex items-center justify-between"
      >
        <span class="text-sm font-medium text-muted-foreground">Body Part</span>
        <UBadge
          :label="bodyPart"
          variant="outline"
        />
      </div>

      <div
        v-if="category"
        class="flex items-center justify-between"
      >
        <span class="text-sm font-medium text-muted-foreground">Category</span>
        <UBadge
          :label="category"
          variant="outline"
        />
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
            variant="soft"
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
            variant="soft"
          />
        </div>
      </div>
    </div>
  </div>
</template>
