<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  }
})
</script>

<template>
  <ClientOnly>
    <UTooltip :text="$t('actions.toggle')">
      <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        color="gray"
        variant="solid"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
    </UTooltip>

    <template #fallback>
      <UButton icon="i-heroicons-sun-20-solid" color="gray" variant="solid" aria-label="Theme" />
    </template>
  </ClientOnly>
</template>