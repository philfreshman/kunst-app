<template>
  <UTooltip :text="$t('actions.logout')">
    <NuxtLink to="/login">
      <UButton icon="i-heroicons-outline:logout" color="gray" variant="solid" />
    </NuxtLink>
  </UTooltip>
</template>