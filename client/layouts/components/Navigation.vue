<script lang="ts" setup>
import {
   Document,
   Menu as IconMenu,
   Setting,
     Location
} from '@element-plus/icons-vue'
import {ref} from "vue";

// const navigationIndex = ref()
// const pathLvl1 = location.pathname.split('/')[1].toString();
// const pathLvl2 = location.pathname.split('/')[2].toString();
// const storedIndex = sessionStorage.getItem("navigation-selected")
// const isIndexSet = storedIndex != null
// const isPathEmpty = pathLvl1 === ""
//
//
//
// // path to index mapping
// const routes = new Map([
//    ["artists", "2"],
//    ["peaces", "3"],
//    ["orders", "4"],
//    ["offers", "5"],
//    ["invoices", "6"],
//    ["settings", "7"]
// ])
//
// const routes2 = {
//    artists: "2",
//    peaces: "3",
//    orders: { new: "4.1", all: "4.2" },
//    offers: "5",
//    invoices: "6",
//    settings: "7"
// };
//
//
//
// // const d = routes2[`${a}.${c}`]
//
//
// if(!isPathEmpty){
//    navigationIndex.value = routes.get(pathLvl1.toLowerCase())
// } else{
//    navigationIndex.value = "1"
// }
//
// if (isIndexSet){
//    navigationIndex.value = storedIndex.toString()
// }
//
// const handleSelect = (key: string) => {
//    sessionStorage.setItem("navigation-selected", key)
//    navigationIndex.value = key
// }
</script>


<template>
   <el-row class="tac">
      <el-col>
         <el-menu
             :default-active="navigationIndex"
             class="el-menu-vertical-demo"
             @select="handleSelect"
         >
            <NuxtLink to="/">
               <el-menu-item index="1">
                  <el-icon><icon-menu /></el-icon>
                     <span>Default</span>
               </el-menu-item>
            </NuxtLink>

            <NuxtLink to="/artists">
               <el-menu-item index="2">
                  <el-icon><document /></el-icon>
                     <span>Artists</span>
               </el-menu-item>
            </NuxtLink>

            <NuxtLink to="/peaces">
               <el-menu-item index="3">
                  <el-icon><document /></el-icon>
                  <span>Peaces</span>
               </el-menu-item>
            </NuxtLink>


            <!--            <NuxtLink to="/orders">-->
               <el-sub-menu index="4">
                  <template #title>
                     <el-icon><document /></el-icon>
                     <span>Orders</span>
                  </template>
                  <el-menu-item index="4-1">New order</el-menu-item>
                  <el-menu-item index="4-2">All orders</el-menu-item>
               </el-sub-menu>
            <!--            </NuxtLink>-->


            <NuxtLink to="/Offers">
               <el-menu-item index="5">
                  <el-icon><document /></el-icon>
                  <span>Offers</span>
               </el-menu-item>
            </NuxtLink>

            <NuxtLink to="/Invoices">
               <el-menu-item index="6">
                  <el-icon><document /></el-icon>
                  <span>Invoices</span>
            </el-menu-item>
            </NuxtLink>

            <NuxtLink to="/Settings">
               <el-menu-item index="7">
                  <el-icon><setting /></el-icon>
                  <span>Settings</span>
               </el-menu-item>
            </NuxtLink>

         </el-menu>
      </el-col>

   </el-row>
</template>




<style scoped lang="scss">
a {
   color: inherit; /* blue colors for links too */
   text-decoration: inherit; /* no underline */
}
</style>