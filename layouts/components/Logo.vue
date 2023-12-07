<script setup lang="ts">
const props = defineProps({
  height: {type: String, default: "56"}
})
</script>

<template>
  <a href="https://ui.nuxt.com/getting-started">
    <img
      alt="logo"
      src="~/assets/img/logo.svg"
      :style="{
        height: `${props.height}px`
      }"
    />
  </a>
</template>

