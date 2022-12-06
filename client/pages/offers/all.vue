<script lang="ts" setup>
sessionStorage.setItem("navigation-selected", "5")
</script>

<template>
  <template>
    <el-steps :space="200" :active="1" finish-status="success">
      <el-step title="Done" />
      <el-step title="Processing" />
      <el-step title="Step 3" />
    </el-steps>
  </template>

</template>

<script lang="ts">
export default {
   name: "Offers"
}
</script>

<style scoped>

</style>