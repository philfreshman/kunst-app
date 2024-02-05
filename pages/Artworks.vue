<script setup lang="ts">
import useArtworks from "~/composables/useArtworks"
import useFilteredArtworks from "~/composables/useSearchFilter"
import { artworksTableColumns } from "~/utils/tableDefinitions"
import BaseSearch from "~/components/BaseSearch.vue"

const artworks = useArtworks()

// Search
const { search, filteredRows } = useFilteredArtworks(artworks.data)
</script>

<template>
  <Container>
    <template #controls>
      <BaseSearch v-model="search" />
    </template>

    <template #content>
      <UTable :columns="artworksTableColumns" :rows="filteredRows" :loading="artworks.loading.value">
        <template #url-data="{ row }" class="hello">
          <LazyUPopover class="h-20 w-fit content-fit" mode="hover" :popper="{ placement: 'right' }">
            <template #panel>
              <img :src="row.url" alt="" />
            </template>
            <span class="w-[200px]">
              <img class="h-20" :src="row.url" alt="" />
            </span>
          </LazyUPopover>
        </template>
      </UTable>
    </template>
  </Container>
</template>
