<script lang="ts" setup>
import { ref } from 'vue'
import OfferForm from "~/components/OfferForm.vue";

const active = ref(0)

const next = () => {
  if (active.value++ > 2) active.value = 0
}
</script>

<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>

  <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <el-tab-pane label="User"><OfferForm/></el-tab-pane>
    <el-tab-pane label="Config">Peaces</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>

  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
</template>


<script lang="ts">
export default {
   name: "new"
}
</script>
