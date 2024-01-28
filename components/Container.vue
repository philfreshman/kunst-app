<template>
  <div class="w-full rounded-[6px] mb-3">
    <slot name="controls" />
  </div>
  <div
    class="flex-1 w-full rounded-[6px] overflow-auto border border-gray-200 dark:border-gray-800"
  >
    <slot name="content" />
  </div>
</template>
