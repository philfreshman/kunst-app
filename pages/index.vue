<script setup lang="ts">
import { sub } from "date-fns"
import type { Period, Range } from "~/types"

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref<Period>("daily")
</script>

<template>
  <div class="flex flex-1 w-full min-w-0">
    <DashboardPanel grow>
      <DashboardToolbar>
        <template #left>
          <HomeDateRangePicker v-model="range" class="-ml-2.5" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </DashboardToolbar>

      <DashboardPanelContent>
        <HomeChart :period="period" :range="range" />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <HomeSales />

          <HomeCountries />
        </div>
      </DashboardPanelContent>
    </DashboardPanel>
  </div>
</template>
