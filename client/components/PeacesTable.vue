<script lang="ts" setup>
import {onMounted, ref} from "vue";
import Api from "~/tools/axios";

const response = Api.Peaces()
const tableData = ref()
const isLoading = ref(true)

onMounted( async () => {
   const data = (await response).data
   console.log(data);
   if (data === null) return
   tableData.value = data
   isLoading.value = false
})

</script>

<template>
   <div class="test">
      <el-table :data="tableData" height="100%" width="100%" >
         <el-table-column prop="date" label="Date" width="180" />
         <el-table-column prop="name" label="Name" width="180" />
         <el-table-column prop="address" label="Address" />
      </el-table>
   </div>
</template>




<style lang="scss" scoped>
   .test{
      height: 100%;
      position: relative;
   }

   .el-table{
      position:absolute;
   }
</style>