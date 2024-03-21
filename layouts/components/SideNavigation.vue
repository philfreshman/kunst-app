<script setup lang="ts">
const appConfig = useAppConfig()

const localePath = useLocalePath()
</script>
<template>
  <div class="h-auto flex flex-col">
    <NuxtLink :to="localePath('/')">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/') }"
        class="w-full mb-1.5"
        :icon="appConfig.ui.icons.dashboard"
        size="md"
        color="gray"
        variant="solid"
      >
        Home
      </UButton>
    </NuxtLink>

    <NuxtLink :to="localePath('/offers')">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/offers') }"
        class="w-full my-1.5"
        :icon="appConfig.ui.icons.offer"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.offers") }}
      </UButton>
    </NuxtLink>

    <NuxtLink :to="localePath('/invoices')">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/invoices') }"
        class="w-full my-1.5"
        :icon="appConfig.ui.icons.receipt"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.invoices") }}
      </UButton>
    </NuxtLink>

    <NuxtLink :to="localePath('/artworks')">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/artworks') }"
        class="w-full my-1.5"
        :icon="appConfig.ui.icons.palette"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.artworks") }}
      </UButton>
    </NuxtLink>

    <NuxtLink :to="localePath('/artists')">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/artists') }"
        class="w-full my-1.5"
        :icon="appConfig.ui.icons.alien"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.artists") }}
      </UButton>
    </NuxtLink>
  </div>
</template>

<style>
html.light .active-link {
  box-shadow: 0 0 10px rgb(52, 98, 157);
}

html.dark .active-link {
  box-shadow: 0 0 10px rgb(75, 222, 128);
}
</style>
