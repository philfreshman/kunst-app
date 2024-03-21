<script setup lang="ts">
import { sub } from "date-fns"
import type { Period, Range } from "~/types"
import { useDashboard } from "~/composables/useDashboard"

const { isNotificationsSlideoverOpen } = useDashboard()

const items = [
  [
    {
      label: "New mail",
      icon: "i-heroicons-paper-airplane",
      to: "/inbox"
    },
    {
      label: "New user",
      icon: "i-heroicons-user-plus",
      to: "/users"
    }
  ]
]

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref<Period>("daily")
</script>

<template>
  <DashboardPage>
    <DashboardPanel grow>
      <DashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="-ml-2.5" />

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </DashboardToolbar>

      <DashboardPanelContent>
        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart :period="period" :range="range" />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>
      </DashboardPanelContent>
    </DashboardPanel>
  </DashboardPage>
</template>
