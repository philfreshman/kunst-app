<script setup lang="ts">
import type { PropType } from "@vue/runtime-core"

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  isOpen: {
    type: Boolean,
    required: false
  },
  data: {
    type: Object as PropType<Artist | undefined>,
    default: [],
    required: true
  }
})
const modalData = reactive({ data: props.data })
</script>

<template>
  <div>
    <UModal prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800'
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Modal</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" />
          </div>
        </template>

        <div>
          <span v-for="(value, prop) in modalData.data" :key="prop">
            <UFormGroup :label="prop">
              <UInput :value="value" />
            </UFormGroup>
          </span>
        </div>

        <template #footer>
          <div class="w-full flex justify-center">
            <UButton type="green">Save</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
