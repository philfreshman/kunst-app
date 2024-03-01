<script setup lang="ts">
const items = [
  [
    {
      label: "DE",
      click() {
        console.log("setting DE")
      }
    }
  ],
  [
    {
      label: "EN",
      click() {
        console.log("setting EN")
      }
    }
  ]
]

defineShortcuts({
  escape: () => console.log("ooo")
})
</script>

<template>
  <UDropdown class="w-5" :items="items" mode="hover" :popper="{ offsetDistance: 0, placement: 'top-end' }">
    <UButton color="white" icon="i-heroicons-outline:translate" />
  </UDropdown>
</template>