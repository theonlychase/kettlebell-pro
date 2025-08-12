<script setup lang="ts">
const { email, error, loading, handleSubmit } = useResend()
</script>

<template>
  <UFooter :ui="{ container: '!hidden' }">
    <template #top>
      <div class="flex max-md:flex-wrap items-center justify-between gap-6">
        <div class="flex flex-col items-start">
          <div class="flex items-center md-max:mx-auto">
            <UIcon
              name="i-custom-kettlebell"
              class="w-8 h-8 fill-current"
            />
            <span class="font-bold text-gray-900 dark:text-white">
              Kettlebell Pro
            </span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Transform your fitness with professional kettlebell training exercises.
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <UFormField
            name="email"
            :error="error ? 'Please enter a valid email' : false"
            label="Subscribe for updates"
            size="lg"
          >
            <UButtonGroup>
              <UInput
                v-model="email"
                color="neutral"
                placeholder="Email"
                :ui="{ base: 'w-[250px]' }"
                variant="outline"
              />

              <UButton
                :loading="loading"
                :disabled="loading"
                color="neutral"
                label="Subscribe"
                type="submit"
              />
            </UButtonGroup>
          </UFormField>
        </form>
      </div>
    </template>
  </UFooter>
</template>
