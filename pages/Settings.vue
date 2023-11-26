<template>
  <h1>Settings</h1>
  <!--  <el-menu-->
  <!--    :default-active="activeIndex"-->
  <!--    class="el-menu-demo"-->
  <!--    mode="horizontal"-->
  <!--    :ellipsis="false"-->
  <!--    @select="handleSelect"-->
  <!--  >-->
  <!--    <el-menu-item index="0">LOGO</el-menu-item>-->
  <!--    <div class="flex-grow"/>-->
  <!--    <el-menu-item index="1">Processing Center</el-menu-item>-->
  <!--    <el-menu-item index="2">Processing Center</el-menu-item>-->

  <!--  </el-menu>-->
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1
}
</style>

<script lang="ts">
export default {
  name: "Settings"
}
</script>

<style scoped>

</style>
