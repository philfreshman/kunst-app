<script setup lang="ts">
const colorMode = useColorMode()
const appConfig = useAppConfig()

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
        :icon="isDark ? appConfig.ui.icons.dark : appConfig.ui.icons.light"
        color="gray"
        variant="solid"
        @click="isDark = !isDark"
      />
    </UTooltip>

    <template #fallback>
      <UButton :icon="appConfig.ui.icons.light" color="gray" variant="solid" aria-label="Theme" />
    </template>
  </ClientOnly>
</template>
