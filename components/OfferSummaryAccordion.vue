<script setup lang="ts">
import { textWithLineBreaks } from "~/utils/formater"
import type { PropType } from "@vue/runtime-core"

// Setup
const props = defineProps({
  modalData: {
    type: Object as PropType<Offer>,
    required: true
  },
  selected: {
    type: Array as PropType<any[]>,
    required: true
  }
})

const artworks = useArtworks()

onBeforeMount(async () => {
  await artworks.fetchArtworksById(props.selected)
  console.log(artworks.dataById.value)
})

// Accordion
const accordionTabs = [
  {
    index: 0,
    slot: "data",
    label: "Daten",
    defaultOpen: true,
    closeOthers: true
  },
  {
    index: 1,
    slot: "artworks",
    label: "Bilder",
    defaultOpen: false
  },
  {
    index: 2,
    slot: "prices",
    label: "Preise",
    defaultOpen: false
  }
]

// onMounted(() => console.log(props.selected))
</script>

<template>
  <UAccordion color="primary" variant="outline" size="sm" :items="accordionTabs" :defaultOpen="false" :buttonRe="{}" :closeOthers="true">
    <template #data>
      <div v-html="textWithLineBreaks(modalData.address)" />
      <br />
      <h1 class="font-bold">ANGEBOT</h1>
      <br />
      <div class="w-full flex justify-between">
        <span>
          <span class="font-bold">Production:</span>
          <span> {{ modalData.production_name }}</span>
        </span>
        <span> {{ modalData.offer_date }}</span>
      </div>
      <span class="font-bold">Set: </span><span> {{ modalData.set_name }}</span>
      <div>
        <span class="font-bold">Leih-Zeitraum: {{ modalData.start_date }} - {{ modalData.end_date }}</span>
      </div>
    </template>
    <template #artworks>
      <div v-for="artwork in artworks.dataById.value">
        <a>{{ artwork }}</a>
        <span>{{ artwork.article_id }}</span>
        <span>{{ artwork.artists?.name }}</span>
      </div>
      <a>artworks</a><br />
      <a>artworks</a><br />
      <a>artworks</a><br />
      <a>artworks</a><br />
      <a>artworks</a><br />
    </template>
    <template #prices>
      <h1>prices</h1>
    </template>
  </UAccordion>
</template>

<style scoped></style>
