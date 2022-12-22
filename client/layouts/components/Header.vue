<script lang="ts" setup>
import { ref } from 'vue'
import ToggleButton from "~/layouts/components/ToggleButton.vue";



// const value6 = ref(true)
</script>

<style>
.flex-grow {
   flex-grow: 1;
}
</style>

<template>
<!--  <NuxtLoadingIndicator />-->

<!--   <header>-->
<!--      <div class="box header-left">-->
<!--      </div>-->
<!--      <div class="box header-center">-->
<!--&lt;!&ndash;         <img id="logo" src="~/assets/img/kunstfuerfilm_logo_shadow.svg" alt="kff"/>&ndash;&gt;-->
<!--      </div>-->
<!--      <div class="box header-right">-->
<!--&lt;!&ndash;         <Hamburger/>&ndash;&gt;-->

<!--      </div>-->
<!--   </header>-->
   <el-menu
       mode="horizontal"
       :ellipsis="false"
   >
      <a href="https://element-plus.org/en-US/component/button.html" target="_blank"><img id="logo" src="~/assets/img/kunstfuerfilm_logo_shadow.svg" alt="kff"/></a>

      <el-sub-menu index="1">
         <template #title>Menu</template>
         <el-menu-item index="1-1">Logout</el-menu-item>
         <el-menu-item index="1-2">Register</el-menu-item>
<!--         <el-menu-item>   <el-switch-->
<!--             v-model="value6"-->
<!--             class="ml-2"-->
<!--             width="60"-->
<!--             inline-prompt-->
<!--             active-text="超出省略"-->
<!--             inactive-text="超出省略"-->
<!--         /></el-menu-item>-->
         <el-menu-item index="1-3"><ToggleButton/></el-menu-item>
      </el-sub-menu>
   </el-menu>
</template>




