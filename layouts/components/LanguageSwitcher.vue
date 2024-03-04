<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})

const items = [
  [
    {
      label: "DE",
      click() {
        switchLocalePath("de")
      }
    }
  ],
  [
    {
      label: "EN",
      click() {}
    }
  ]
]

// defineShortcuts({
//   escape: () => console.log("ooo")
// })
</script>

<template>
  <UDropdown class="w-5" :items="items" mode="hover" :popper="{ offsetDistance: 0, placement: 'top-end' }">
    <UButton color="white" icon="i-heroicons-outline:translate" />
  </UDropdown>
</template>