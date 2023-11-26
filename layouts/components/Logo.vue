<script setup lang="ts">
const props = defineProps({
  height: {type: Number, default: 70}
})
</script>

<template>
  <a
    href="https://element-plus.org/en-US/component/button.html"
    target="_blank">
    <img
      :style="`height:${props.height}px`"
      id="logo"
      src="~/assets/img/kunstfuerfilm_logo_shadow.svg"
      alt="kff"
    />
  </a>
</template>

<style scoped>

</style>
