<script lang="ts" setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const isModalOpen: any = computed({
  get: () => props.isOpen,
  set: (value) => (isModalOpen.value = value),
})
</script>

<template>
  <UModal v-model="isModalOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <slot name="header" />
      </template>

      <slot name="default" />

      <template #footer>
        <slot name="footer" />
      </template>
    </UCard>
  </UModal>
</template>
