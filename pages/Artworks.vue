<script setup lang="ts">
import useArtworks from "~/composables/useArtworks"

const artworks = useArtworks()
await artworks.fetchArtworks()

onBeforeMount(() => {
  artworks.fetchArtworks()
})

const q = ref("")

const filteredRows = computed(() => {
  if (!q.value) {
    return artworks.data.value
  }
  if (!artworks.data.value) {
    return artworks.data.value
  }
  return artworks.data.value.filter((artwork) => {
    return Object.values(artwork).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

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
  {
    key: "title",
    label: "Titel",
    sortable: true,
  },
]

const log = (value: any) => {
  console.log(value)
}
</script>

<template>
  <!-- SEARCH -->
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" placeholder="Filter people..." />
  </div>

  <UTable :columns="columns" :rows="filteredRows">
    <template #img_url-data="{ row }" class="bg-red-50">
      <LazyUPopover
        class="h-20 w-fit content-fit bg-red-500"
        mode="hover"
        :popper="{ placement: 'right' }"
      >
        <template #panel class="bg-red-50">
          <img class="" :src="row.img_url" alt="" />
        </template>
        <img class="h-20" :src="row.img_url" alt="" />
      </LazyUPopover>
    </template>
  </UTable>
</template>
