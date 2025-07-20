<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <ProseOl v-if="items?.length">
    <li
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </li>
  </ProseOl>
  <div v-else>
    Coming soon...
  </div>
</template>
