<script lang="ts" setup>
import {
   Document,
   Menu as IconMenu,
   Setting,
     Location
} from '@element-plus/icons-vue'
import {ref} from "vue";


const navigationIndex = ref()
const pathLvl1 = location.pathname.split('/')[1]?.toString().toLowerCase();
const pathLvl2 = location.pathname.split('/')[2]?.toString().toLowerCase()
const storedIndex = sessionStorage.getItem("navigation-selected")
const isIndexSet = storedIndex != null
const isPath1Empty = pathLvl1 == undefined
const isPath2Empty = pathLvl2 == undefined


const routes: any = {
  artists: "2",
  peaces: "3",
  orders: { new: "4.1", all: "4.2" },
  offers: { new: "5.1", all: "5.2" },
  invoices: { new: "6.1", all: "6.2" },
  settings: "7"
};

// is index page
if(isPath1Empty && isPath2Empty){
  navigationIndex.value = "1"
}

// is one level
if (!isPath1Empty && isPath2Empty){
  const newIndex = routes[`${pathLvl1}`]
  navigationIndex.value = newIndex
  console.log(newIndex);
}

// is two level
if (!isPath1Empty && !isPath2Empty){
  const newIndex = routes[`${pathLvl1}`][`${pathLvl2}`]
  navigationIndex.value = newIndex
  console.log(newIndex);
}


// if (isIndexSet){
//    navigationIndex.value = storedIndex.toString()
// }
//
// const handleSelect = (key: string) => {
//    sessionStorage.setItem("navigation-selected", key)
//    navigationIndex.value = key
// }
</script>

<!--@select="handleSelect"-->

<template>
   <el-row class="tac">
      <el-col>
         <el-menu
             :default-active="navigationIndex"
             class="el-menu-vertical-demo"
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


           <el-sub-menu index="4">
              <template #title>
                 <el-icon><document /></el-icon>
                 <span>Orders</span>
              </template>
                 <NuxtLink to="/orders/new">
                   <el-menu-item index="4-1">New</el-menu-item>
                 </NuxtLink>
                  <NuxtLink to="/orders/all">
                    <el-menu-item index="4-2">All</el-menu-item>
                  </NuxtLink>
           </el-sub-menu>



           <el-sub-menu index="5">
             <template #title>
               <el-icon><document /></el-icon>
               <span>Offers</span>
             </template>
             <NuxtLink to="/offers/new">
               <el-menu-item index="5-1">New</el-menu-item>
             </NuxtLink>
             <NuxtLink to="/offers/all">
               <el-menu-item index="5-2">All</el-menu-item>
             </NuxtLink>
           </el-sub-menu>


           <el-sub-menu index="6">
             <template #title>
               <el-icon><document /></el-icon>
               <span>Invoices</span>
             </template>
             <NuxtLink to="/invoices/new">
               <el-menu-item index="6-1">New</el-menu-item>
             </NuxtLink>
             <NuxtLink to="/invoices/all">
               <el-menu-item index="6-2">All</el-menu-item>
             </NuxtLink>
           </el-sub-menu>



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