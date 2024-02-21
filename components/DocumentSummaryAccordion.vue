<script setup lang="ts">
import { textWithLineBreaks } from "~/utils/formater"
import type { PropType } from "@vue/runtime-core"
import { accordionTabs } from "~/utils/tableDefinitions"

// Setup
const props = defineProps({
  formData: {
    type: Object as PropType<Offer | Invoice>,
    required: true
  },
  snapshot: {
    type: Object as PropType<Snapshot>,
    required: false
  }
})

const snapType = computed(() => props.snapshot && formatSnapshot(props.snapshot?.snapshot_type))
</script>

<template>
  <UAccordion color="primary" variant="outline" size="sm" :items="accordionTabs">
    <template #data>
      <div v-html="textWithLineBreaks(formData.address)" />
      <br />
      <h1 class="font-bold">{{ snapType }}</h1>
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
        <span class="font-bold">Leih-Zeitraum: </span><span> {{ formData.start_date }} - {{ formData.end_date }}</span>
      </div>
    </template>
    <template #artworks>
      <table v-if="snapshot?.collection" class="w-full h-max">
        <tr class="mb-2">
          <th class="py-2">Pos.</th>
          <th>Artikel nr.</th>
          <th>Titel des Bildes</th>
          <th>Größe</th>
          <th>Wert</th>
          <th class="text-right">Preis</th>
        </tr>
        <tr v-for="(artwork, idx) in snapshot.collection" class="pt-5">
          <td>{{ idx + 1 }}</td>
          <td>{{ artwork.article_id }}</td>
          <td>{{ artwork.title }}</td>
          <td>{{ `${artwork.width} - ${artwork.height}` }}</td>
          <td>{{ `${artwork.price} €` }}</td>
          <td class="text-right">{{ `${artwork.rent_price} €` }}</td>
        </tr>
      </table>
      <br />
      <table v-if="snapshot !== undefined" class="w-full h-max">
        <tr>
          <th></th>
          <th class="w-32"></th>
        </tr>
        <tr>
          <td>Leihgebühr netto:</td>
          <td class="text-right">{{ `${snapshot.net_rental_fee} €` }}</td>
        </tr>
        <tr>
          <td>{{ `zzgl. ${snapshot.tax}% Umsatzsteuer` }}</td>
          <td class="text-right">{{ `${snapshot.sales_tax} €` }}</td>
        </tr>
        <tr>
          <td><strong>GESAMT</strong></td>
          <td class="text-right pt-1">
            <strong> {{ `${snapshot.total} €` }}</strong>
          </td>
        </tr>
      </table>
    </template>
  </UAccordion>
</template>