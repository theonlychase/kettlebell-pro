<script setup lang="ts">
interface Props {
  tips?: string[]
  cautions?: string[]
  commonMistakes?: string[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Tips & Safety',
})

const items = ref([
  {
    label: 'Pro Tips',
    icon: 'i-lucide-check-circle',
    content: props.tips,
    value: 'tips',
  },
  {
    label: 'Safety Cautions',
    icon: 'i-lucide-alert-triangle',
    content: props.cautions,
    value: 'safety',
  },
  {
    label: 'Common Mistakes to Avoid',
    icon: 'i-lucide-x-circle',
    content: props.commonMistakes,
    value: 'avoid',
  },
])

const active = ref(['tips'])
</script>

<template>
  <UAccordion
    v-model="active"
    :items="items"
  >
    <template #leading="{ item }">
      <UIcon
        :name="item.icon"
        class="w-5 h-5 mr-1"
        :class="{
          'text-success': item.label === 'Pro Tips',
          'text-warning': item.label === 'Safety Cautions',
          'text-error': item.label === 'Common Mistakes to Avoid',
        }"
      />
    </template>
    <template #content="{ item }">
      <div class="flex flex-col gap-4 pl-8 mb-6">
        <div
          v-for="i in item.content"
          :key="i"
        >
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-check-circle"
              class="w-4 h-4"
            />
            <div class="text-sm">
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </UAccordion>
</template>
