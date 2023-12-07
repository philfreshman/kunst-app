<template>
  <UTooltip text="Einstellungen" :popper="{ placement: 'top' }">
    <NuxtLink to="/settings">
      <UButton
        icon="i-fluent:settings-20-regular"
        color="gray"
        variant="solid"
      />
    </NuxtLink>
  </UTooltip>
</template>
