<script setup lang="ts">
import useArtworks from "~/composables/useArtworks"
import useFilteredArtworks from "~/composables/useSearchFilter"

const artworks = useArtworks()
artworks.fetchArtworks()

// Search
const search = ref("")
const { filteredRows } = useFilteredArtworks(artworks, search)

// Table settings
const columns = [
  {
    key: "article_id",
    label: "Artikel ID",
    sortable: true,
  },
  {
    key: "img_url",
    label: "Bild",
    class: "w-1/4",
  },
  {
    key: "artists.name",
    label: "Künstler",
    sortable: true,
  },
  {
    key: "title",
    label: "Titel",
    sortable: true,
  },
  {
    key: "height",
    label: "Größe",
    sortable: true,
  },
  {
    key: "width",
    label: "Breite",
    sortable: true,
  },
  {
    key: "price",
    label: "Wert",
    sortable: true,
  },
]
</script>

<template>
  <Container>
    <template #controls>
      <div class="flex dark:border-gray-700 h-full">
        <!-- SEARCH -->
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          v-model="search"
          size="md"
          placeholder="Suche..."
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false" @click="search = ''" />
          </template>
        </UInput>
      </div>
    </template>

    <template #content>
      <UTable :columns="columns" :rows="filteredRows" :loading="artworks.loading.value">
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
