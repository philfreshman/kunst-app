<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
  <div class="h-auto flex flex-col">
    <NuxtLink :to="localePath('/offers').toLowerCase()">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/offers') }"
        class="w-full my-1.5"
        icon="i-mdi:offer"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.offers") }}
      </UButton>
    </NuxtLink>

    <NuxtLink :to="localePath('/invoices').toLowerCase()">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/invoices') }"
        class="w-full my-1.5"
        icon="i-mdi:receipt-text-outline"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.invoices") }}
      </UButton>
    </NuxtLink>

    <NuxtLink :to="localePath('/artworks').toLowerCase()">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/artworks') }"
        class="w-full my-1.5"
        icon="i-mdi:palette-outline"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.artworks") }}
      </UButton>
    </NuxtLink>

    <NuxtLink :to="localePath('/artists').toLowerCase()">
      <UButton
        :class="{ 'active-link': $route.path.endsWith('/artists') }"
        class="w-full mb-1.5"
        icon="i-mdi:alien-outline"
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
