<script lang="ts" setup>
import ToggleButton from "~/layouts/components/ToggleButton.vue"
import Logo from "~/layouts/components/Logo.vue"

const props = defineProps({
  blank: {type: Boolean, default: false}
})

</script>

<style>
.flex-grow {
  flex-grow: 1
}
</style>

<template>


  <el-menu
    mode="horizontal"
    :ellipsis="false"
  >
    <div v-if="!props.blank" style="width: 100px"></div>

    <Logo/>

    <el-sub-menu v-if="!props.blank" index="1">
      <template #title>Menu</template>
      <el-menu-item index="1-1">Logout</el-menu-item>
      <el-menu-item index="1-2">Register</el-menu-item>
      <el-menu-item index="1-3">
        <ToggleButton/>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>




