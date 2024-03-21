<script setup lang="ts">
const appConfig = useAppConfig()
const logout = async () => {
  await useSupabaseClient().auth.signOut()
  await useRouter().push(useLocalePath()("/login").toLowerCase())
}
</script>

<template>
  <UTooltip :text="$t('actions.logout')">
    <UButton :icon="appConfig.ui.icons.logout" color="gray" variant="solid" @click="logout" />
  </UTooltip>
</template>
