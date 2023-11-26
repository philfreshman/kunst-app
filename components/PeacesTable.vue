<script lang="ts" setup>
import {onMounted, ref} from "vue"
import Api from "~/tools/axios"
import {sleep} from "@cloudflare/kv-asset-handler/src/mocks"

const response = Api.GetPeaces()
const tableData = ref()
const isLoading = ref(true)

onMounted(async () => {
  const data = (await response).data
  if (data === null) return
  tableData.value = data
  isLoading.value = false

})

</script>

<template>
  <div class="test">
    <el-table
      :data="tableData"
      height="100%"
      width="100%"
      sort-by="ArtistId"
      v-loading=isLoading
    >
      <el-table-column type="index" width="50"/>
      <el-table-column prop="ArticleId" label="ArticleId"/>
      <el-table-column prop="Title" label="Title" width="300"/>
      <el-table-column prop="Width" label="Width" width="80"/>
      <el-table-column prop="Height" label="Height" width="80"/>
      <el-table-column prop="Worth" label="Price" width="80"/>
      <el-table-column prop="IsAvailable" label="IsAvailable"/>
      <el-table-column prop="IsArchived" label="IsArchived"/>
      <!--         <el-table-column prop="ImgUrl" label="ImgUrl"/>-->
      <el-table-column prop="ArtistId" label="ArtistId"/>
    </el-table>
  </div>
</template>


<style lang="sass" scoped>
.test
  height: 100%
  position: relative

.el-table
  position: absolute

</style>
