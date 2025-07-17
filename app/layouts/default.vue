<script setup lang="ts">
</script>

<template>
  <div id="app">
    <Header />

    <UMain>
      <slot />
    </UMain>

    <USeparator
      class="h-px"
    />

    <Footer />
  </div>
</template>
