\
<script lang="ts" setup>
import Header from "~/layouts/components/Header.vue"
</script>

<template>
  <div class="h-screen w-full flex flex-col">
    <div class="h-auto z-10">
      <Header />
    </div>

    <div class="h-full w-full overflow-scroll">
      <slot />
    </div>
  </div>
</template>
