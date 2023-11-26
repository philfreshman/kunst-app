<script lang="ts" setup>
import {onMounted, ref} from "vue"
import Api from "~/tools/axios"
import useDateFormatter from "../../../kunst-app/composables/dateFormatter"

const response = Api.GetOffer()
const tableData = ref()
const isLoading = ref(true)

onMounted(async () => {
  try {
    const data: Array<Offer> = (await response).data
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
      sort-by="InvoiceId"
      width="100%"
    >
      <el-table-column type="index" width="50"/>
      <el-table-column label="SetName" prop="SetName"/>
      <el-table-column :formatter="useDateFormatter" label="OfferDate" prop="OfferDate"/>
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
