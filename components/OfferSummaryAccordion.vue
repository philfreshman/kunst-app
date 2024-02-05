<script setup lang="ts">
import { textWithLineBreaks } from "~/utils/formater"
import type { PropType } from "@vue/runtime-core"

// Setup
const props = defineProps({
  formData: {
    type: Object as PropType<Offer>,
    required: true
  },
  collectionData: {
    type: Object as PropType<Collection[]>,
    required: true
  }
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
</script>

<template>
  <UAccordion color="primary" variant="outline" size="sm" :items="accordionTabs" :defaultOpen="false" :buttonRe="{}" :closeOthers="true">
    <template #data>
      <div v-html="textWithLineBreaks(formData.address)" />
      <br />
      <h1 class="font-bold">ANGEBOT</h1>
      <br />
      <div class="w-full flex justify-between">
        <span>
          <span class="font-bold">Production:</span>
          <span> {{ formData.production_name }}</span>
        </span>
        <span> {{ formData.offer_date }}</span>
      </div>
      <span class="font-bold">Set: </span><span> {{ formData.set_name }}</span>
      <div>
        <span class="font-bold">Leih-Zeitraum: {{ formData.start_date }} - {{ formData.end_date }}</span>
      </div>
    </template>
    <template #artworks>
      {{ collectionData }}
      <!--      <div v-for="artwork in artworks.dataById.value">-->
      <!--        <a>{{ artwork }}</a>-->
      <!--        <span>{{ artwork.article_id }}</span>-->
      <!--        <span>{{ artwork.artists?.name }}</span>-->
      <!--      </div>-->
    </template>
    <template #prices>
      <h1>prices</h1>
    </template>
  </UAccordion>
</template>

<style scoped></style>
