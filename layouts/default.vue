<script lang="ts" setup>

import Navigation from "~/layouts/components/Navigation.vue"
import Header from "~/layouts/components/Header.vue"

</script>

<template>
  <el-container>
    <el-header height="500px">
      <Header/>
    </el-header>
    <el-container>
      <el-aside>
        <Navigation/>
      </el-aside>
      <el-main>
        <slot/>
      </el-main>
    </el-container>
  </el-container>
</template>
