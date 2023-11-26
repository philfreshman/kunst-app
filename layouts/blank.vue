<script lang="ts" setup>

import Header from "~/layouts/components/Header.vue"

</script>

<template>
  <el-container>
    <el-header height="500px">
      <Header :blank="true"/>
    </el-header>
    <el-container>
      <el-main>
        <slot/>
      </el-main>
    </el-container>
  </el-container>
</template>

