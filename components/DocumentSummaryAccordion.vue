<script setup lang="ts" generic="T extends Offer & Invoice">
import { textWithLineBreaks } from "~/utils/formater"
import type { PropType } from "@vue/runtime-core"
import { accordionTabs } from "~/utils/tableDefinitions"

// Setup
const props = defineProps({
  formData: {
    type: Object as PropType<T>,
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
        <div>
          <strong>Production: </strong> <span> {{ formData.production_name }}</span>
        </div>
        <span> {{ formData.offer_date || formData.invoice_date }}</span>
      </div>
      <strong>Set: </strong><span> {{ formData.set_name }}</span>
      <div>
        <strong>Leih-Zeitraum: </strong>
        <span> {{ formData.start_date }} - {{ formData.end_date }}</span>
      </div>
      <div v-if="formData.hasOwnProperty('invoice_number')">
        <strong> Rechnungsnummer: </strong>
        <span> {{ formData.invoice_number }}</span>
      </div>
      <div v-if="formData.hasOwnProperty('custom_field')">
        <strong v-if="formData.custom_field.key"> {{ formData.custom_field.key }}: </strong>
        <span> {{ formData.custom_field.value }} </span>
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
          <td class="text-right">{{ `${artwork.price} €` }}</td>
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