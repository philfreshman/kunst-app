<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import { ElTable } from 'element-plus'
import Api from "../tools/axios/index";

interface Artist {
   Id: number
   Name: string
   IsArchived: boolean
}
const response = Api.Artists()
const tableData = ref()
const isLoading = ref(true)
const singleTableRef = ref<InstanceType<typeof ElTable>>()


onMounted( async () => {
   const data = (await response).data
   console.log(data);
   if (data === null) return
   tableData.value = data
   isLoading.value = false
})


// const currentRow = ref()

// const setCurrent = (row?: Artist) => {
//    singleTableRef.value!.setCurrentRow(row)
// }
// const handleCurrentChange = (val: Artist | undefined) => {
//    currentRow.value = val
// }

</script>

<template>
   <el-table
       ref="singleTableRef"
       :data="tableData"
       highlight-current-row
       style="width: 100%"
       v-loading=isLoading
   >
      <el-table-column type="index" width="50" />
      <el-table-column property="Name" label="Name" width="120" />
      <el-table-column property="IsArchived" label="IsArchived" width="120" />
   </el-table>

</template>


