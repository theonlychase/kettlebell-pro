<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { navigation } = defineProps<{ navigation?: ContentNavigationItem[] }>()
const { getUser, signOut } = useAuth()

const user = useState('supabase_user')

if (!user.value) {
  user.value = await getUser()
}

const handleSignOut = async () => {
  const { error } = await signOut() ?? {}

  if (!error) {
    user.value = null
  }
}
</script>

<template>
  <UHeader :ui="{ center: 'flex-1' }">
    <template #left>
      <NuxtLink
        :to="ROUTES.home"
        class="flex items-center"
      >
        <UIcon
          mode="svg"
          name="i-custom-kettlebell"
          class="w-12 h-12 fill-current"
        />

        <span class="text-xl font-bold text-gray-900 dark:text-white">
          Kettlebell Pro
        </span>
      </NuxtLink>
    </template>

    <UContentSearchButton
      class="flex-1"
      :collapsed="false"
      label="Search Exercises..."
      :kbds="[]"
    />

    <template #right>
      <div class="flex items-center space-x-2">
        <UContentSearchButton
          class="lg:hidden"
          label="Search Exercises..."
          :kbds="[]"
        />
        <UColorModeButton />

        <UButton
          v-if="!user"
          label="Sign in"
          color="neutral"
          variant="outline"
          to="/login"
          class="hidden lg:inline-flex"
        />

        <UButton
          v-if="!user"
          label="Sign up"
          color="neutral"
          trailing-icon="i-lucide-arrow-right"
          class="hidden lg:inline-flex"
          to="/signup"
        />

        <UButton
          v-if="user"
          label="Sign Out"
          color="neutral"
          leading-icon="i-lucide-arrow-left"
          class="hidden lg:inline-flex"
          @click="async () => await handleSignOut()"
        />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="NAVIGATION"
        highlight
        orientation="vertical"
      />

      <USeparator
        type="dashed"
        class="mt-4 mb-6"
      />

      <div class="flex gap-x-4 items-center max-w-fit">
        <UButton
          v-if="!user"
          label="Sign in"
          color="neutral"
          variant="outline"
          to="/login"
        />

        <UButton
          v-if="!user"
          label="Sign up"
          color="neutral"
          trailing-icon="i-lucide-arrow-right"
          to="/signup"
        />

        <UButton
          v-if="user"
          label="Sign Out"
          color="neutral"
          leading-icon="i-lucide-arrow-left"
          @click="async () => await handleSignOut()"
        />
      </div>

      <USeparator
        type="dashed"
        class="mt-4 mb-6"
      />

      <UContentNavigation
        :navigation="navigation"
        highlight
        :ui="{ linkTrailingBadge: 'font-semibold uppercase' }"
      />
    </template>
  </UHeader>
</template>
