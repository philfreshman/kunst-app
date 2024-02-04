<script setup lang="ts">
import useArtworks from "~/composables/useArtworks"
import useFilteredArtworks from "~/composables/useSearchFilter"
import { artworksTableColumns } from "~/utils/tableDefinitions"
import BaseSearch from "~/components/BaseSearch.vue"

const artworks = useArtworks()
artworks.fetchArtworks()

// Search
const { search, filteredRows } = useFilteredArtworks(artworks)
</script>

<template>
  <Container>
    <template #controls>
      <BaseSearch v-model="search" />
    </template>

    <template #content>
      <UTable :columns="artworksTableColumns" :rows="filteredRows" :loading="artworks.loading.value">
        <template #img_url-data="{ row }" class="bg-red-50">
          <LazyUPopover class="h-20 w-fit content-fit bg-red-500" mode="hover" :popper="{ placement: 'right' }">
            <template #panel class="bg-red-50">
              <img class="" :src="row.img_url" alt="" />
            </template>
            <img class="h-20" :src="row.img_url" alt="" />
          </LazyUPopover>
        </template>
      </UTable>
    </template>
  </Container>
</template>
