<script lang="ts" setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true
  },
  isWide: {
    type: Boolean,
    required: false,
    default: false
  },
  fullscreen: {
    type: Boolean,
    required: false,
    default: false
  }
})

// const isFullscreen = ref(props.fullscreen)

const isModalOpen: any = computed({
  get: () => props.isOpen,
  set: (value) => (isModalOpen.value = value)
})
</script>

<template>
  <UModal
    v-model="isModalOpen"
    prevent-close
    :ui="{
      base: 'flex flex-col',
      width: isWide ? 'sm:max-w-2xl' : null
    }"
    :fullscreen="props.fullscreen"
  >
    <UCard
      :ui="{
        width: 'sm:max-w-2xl',
        ring: '',
        base: 'flex flex-col',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
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

<style>
[id^="headlessui-dialog-panel-"] {
  transition: all 200ms ease-out !important;
}
</style>
