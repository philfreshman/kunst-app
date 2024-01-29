<template>
  <div class="h-auto flex flex-col">
    <NuxtLink to="/artists">
      <UButton
        class="w-full mb-1.5"
        icon="i-mdi:alien-outline"
        size="md"
        color="gray"
        variant="solid"
      >
        Künstler
      </UButton>
    </NuxtLink>

    <NuxtLink to="/artworks">
      <UButton
        class="w-full my-1.5"
        icon="i-mdi:palette-outline"
        size="md"
        color="gray"
        variant="solid"
      >
        Kunstwerke
      </UButton>
    </NuxtLink>

    <NuxtLink to="/offers">
      <UButton
        class="w-full my-1.5"
        icon="i-mdi:offer"
        size="md"
        color="gray"
        variant="solid"
      >
        Angebote
      </UButton>
    </NuxtLink>

    <NuxtLink to="/invoices">
      <UButton
        class="w-full my-1.5"
        icon="i-mdi:receipt-text-outline"
        size="md"
        color="gray"
        variant="solid"
      >
        Rechnungen
      </UButton>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts"></script>
