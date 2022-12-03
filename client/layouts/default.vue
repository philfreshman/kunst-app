<script lang="ts" setup>

import {
   Document,
   Menu as IconMenu,
   Location,
   Setting,
} from '@element-plus/icons-vue'
import Navigation from "~/layouts/components/Navigation.vue";
import Header from "~/layouts/components/Header.vue";
const handleOpen = (key: string, keyPath: string[]) => {
   console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
   console.log(key, keyPath)
}
</script>

<template>
<!--   <div class="common-layout">-->
      <el-container>
         <el-header>
            <Header/>
         </el-header>
         <el-container>
            <el-aside>
               <Navigation/>
            </el-aside>
            <el-main> <slot /></el-main>
         </el-container>
      </el-container>
<!--   </div>-->
</template>


<script lang="ts">
export default {
   name: "default.vue"
}
</script>
