<script setup lang="ts"></script>
<template>
  <div class="h-auto flex flex-col">
    <NuxtLink to="/artists">
      <UButton
        :class="{ 'active-link': $route.path === '/artists' }"
        class="w-full mb-1.5"
        icon="i-mdi:alien-outline"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.artists") }}
      </UButton>
    </NuxtLink>

    <NuxtLink to="/artworks">
      <UButton
        :class="{ 'active-link': $route.path === '/artworks' }"
        class="w-full my-1.5"
        icon="i-mdi:palette-outline"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.artworks") }}
      </UButton>
    </NuxtLink>

    <NuxtLink to="/offers">
      <UButton
        :class="{ 'active-link': $route.path === '/offers' }"
        class="w-full my-1.5"
        icon="i-mdi:offer"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.offers") }}
      </UButton>
    </NuxtLink>

    <NuxtLink to="/invoices">
      <UButton
        :class="{ 'active-link': $route.path === '/invoices' }"
        class="w-full my-1.5"
        icon="i-mdi:receipt-text-outline"
        size="md"
        color="gray"
        variant="solid"
      >
        {{ $t("sidenav.invoices") }}
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