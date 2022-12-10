<script lang="ts" setup>


import Navigation from "~/layouts/components/Navigation.vue";
import Header from "~/layouts/components/Header.vue";
import Main from "~/layouts/components/Main.vue";
const handleOpen = (key: string, keyPath: string[]) => {
   console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
   console.log(key, keyPath)
}
</script>

<template>
      <el-container>
         <el-header>
            <Header/>
         </el-header>
         <el-container>
            <el-aside>
               <Navigation/>
            </el-aside>
            <el-main>
              <slot />
            </el-main>
         </el-container>
      </el-container>
</template>


<script lang="ts">
export default {
   name: "default.vue"
}
</script>
