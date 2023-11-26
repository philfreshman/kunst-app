<script lang="ts" setup>
import {onMounted, ref} from "vue"
import Api from "~/tools/axios"
import useDateFormatter from "../../../kunst-app/composables/dateFormatter"

const response = Api.GetOrder()
const tableData = ref()
const isLoading = ref(true)

onMounted(async () => {
  try {
    const data: Array<Order> = (await response).data
    tableData.value = data
    console.log(data)
    isLoading.value = false
  } catch {
  }
})

</script>

<template>
  <div class="test">
    <el-table
      :v-loading=isLoading
      :data="tableData"
      height="100%"
      sort-by="OrderId"
      width="100%"
    >
      <el-table-column type="index" width="50"/>
      <el-table-column label="Sender" prop="Sender"/>
      <el-table-column label="Address1" prop="Address1"/>
      <el-table-column label="Address2" prop="Address2"/>
      <el-table-column label="Address3" prop="Address3"/>
      <el-table-column label="ProductionName" prop="ProductionName"/>
      <el-table-column :formatter="useDateFormatter" label="StartDate" prop="StartDate"/>
      <el-table-column :formatter="useDateFormatter" label="EndDate" prop="EndDate"/>
      <el-table-column label="Tax" prop="Tax"/>
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
