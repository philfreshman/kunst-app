<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {ElTable} from 'element-plus'
import Api from "../tools/axios/index"

interface Artist {
  Id: number
  Name: string
  IsArchived: boolean
}

const response = Api.GetArtists()
const tableData = ref()
const isLoading = ref(true)
const singleTableRef = ref<InstanceType<typeof ElTable>>()


onMounted(async () => {
  const data = (await response).data
  console.log(data)
  if (data === null) return
  tableData.value = data
  isLoading.value = false
})


</script>

<template>
  <el-table
    v-loading=isLoading
    :data="tableData"
    height="100%"
    sort-by="index"
    width="100%"
  >
    <el-table-column type="index" width="50"/>
    <el-table-column property="Name" label="Name" width="120"/>
    <el-table-column property="IsArchived" label="IsArchived" width="120"/>
  </el-table>

</template>


