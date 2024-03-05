<script setup lang="ts">
const search = defineModel({ required: true })
</script>

<template>
  <div class="flex dark:border-gray-700 h-full">
    <!-- SEARCH -->
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      v-model="search"
      size="md"
      :placeholder="$t('actions.search') + '...'"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          v-show="search !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="() => (search = '')"
        />
      </template>
    </UInput>
  </div>
</template>