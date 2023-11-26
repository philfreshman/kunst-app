<script lang="ts" setup>
import {onMounted, ref} from "vue"
import Api from "~/tools/axios"
import useDateFormatter from "../../../kunst-app/composables/dateFormatter"

const response = Api.GetInvoice()
const tableData = ref()
const isLoading = ref(true)

onMounted(async () => {
  try {
    tableData.value = (await response).data
    isLoading.value = false
  } catch {

  }

})

</script>

<template>
  <div class="test">
    <el-table
      v-loading=isLoading
      :data="tableData"
      height="100%"
      sort-by="InvoiceId"
      width="100%"
    >
      <el-table-column type="index" width="50"/>
      <el-table-column label="InvoiceNr" prop="InvoiceNr" width="80"/>
      <el-table-column label="Description" prop="Description" width="80"/>

      <el-table-column :formatter="useDateFormatter" label="InvoiceDate" prop="InvoiceDate" width="300"/>
      <el-table-column label="Text1" prop="Text1" width="80"/>
      <el-table-column label="Text2" prop="Text2" width="80"/>
      <el-table-column label="IsArchived" prop="IsArchived"/>
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
