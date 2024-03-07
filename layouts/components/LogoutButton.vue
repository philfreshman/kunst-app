<script setup lang="ts">
const logout = async () => {
  await useSupabaseClient().auth.signOut()
  await useRouter().push(useLocalePath()("/login").toLowerCase())
}
</script>

<template>
  <UTooltip :text="$t('actions.logout')">
    <UButton icon="i-heroicons-outline:logout" color="gray" variant="solid" @click="logout" />
  </UTooltip>
</template>