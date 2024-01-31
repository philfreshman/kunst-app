<script setup lang="ts">
import useFilteredArtworks from "~/composables/useSearchFilter"

const search = ref("")
const { filteredRows } = useFilteredArtworks(null, search)
</script>

<template>
  <Container>
    <template #controls>
      <!-- SEARCH -->
      <div class="flex dark:border-gray-700 h-full">
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          v-model="search"
          size="md"
          placeholder="Suche..."
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="search !== ''"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="search = ''"
            />
          </template>
        </UInput>
      </div>

      <UButton icon="i-mdi:receipt-text-outline" size="md" color="gray" variant="solid" trailing>
        Neue Rechnung
      </UButton>
    </template>

    <template #content>
      <UTable> </UTable>
    </template>
  </Container>
</template>
