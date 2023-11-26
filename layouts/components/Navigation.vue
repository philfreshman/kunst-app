<template>
  <el-row class="tac h-full">
    <el-col class="h-full">
      <el-menu class="h-full">

        <div class="h-4"></div>

        <NuxtLink to="/artists">
          <el-menu-item index="3">
            <MdiIcon class="iconSize" icon="mdiAlienOutline"/>
            <span>Künstler</span>
          </el-menu-item>
        </NuxtLink>

        <NuxtLink to="/orders">
          <el-menu-item index="2">
            <MdiIcon class="iconSize" icon="mdiCartOutline"/>
            <span>Bestellungen</span>
          </el-menu-item>
        </NuxtLink>

        <NuxtLink to="/offers">
          <el-menu-item index="1">
            <MdiIcon class="iconSize" icon="mdiBomb"/>
            <span>Angebote</span>
          </el-menu-item>
        </NuxtLink>

        <NuxtLink to="/invoices">
          <el-menu-item index="4">
            <MdiIcon class="iconSize" icon="mdiReceiptTextOutline"/>
            <span>Rechnungen</span>
          </el-menu-item>
        </NuxtLink>

        <NuxtLink to="/Settings">
          <el-menu-item index="5">
            <MdiIcon class="iconSize" icon="mdiCogOutline"/>
            <span>Einstellungen</span>
          </el-menu-item>
        </NuxtLink>

      </el-menu>
    </el-col>

  </el-row>
</template>

<style scoped lang="sass">
.iconSize
  height: 40px
  width: 30px
  margin-right: 10px

a
  color: inherit
  /* blue colors for links too */
  text-decoration: inherit
/* no underline */

</style>
<script setup lang="ts">
</script>
