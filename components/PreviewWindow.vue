<script setup lang="ts">
import { formatDateSpan, formatSnapshot, textWithLineBreaks } from "~/utils/formater"
import type { PropType } from "@vue/runtime-core"

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as PropType<OffersSnapshots | InvoiceSnapshots>,
    required: true
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("de-DE", {
    year: "2-digit",
    month: "numeric",
    day: "numeric"
  }).format(date)
}
</script>

<template>
  <div class="w-full h-full px-[79px] font-din-light z-50 pdf-preview">
    <span class="absolute top-[33px] right-[45px]">
      <img class="w-[185px]" src="/assets/img/Kunst_fuer_Film_Logo_blau.png" alt="logo" />
    </span>

    <!--ANSCHRIFFT-->
    <!--    <span class="absolute top-[52mm] w-auto">-->
    <span class="absolute top-[200px] w-auto">
      <p class="text-xs">KUNST FÜR FILM, Kulmer Str. 20 A, 10783 Berlin</p>
      <div class="ml-[0.4mm] mt-[1mm] w-[68mm] h-[1px] bg-black"><p>&nbsp</p></div>
      <div class="mt-[4mm] w-300px pt-[1px]">
        <p class="text-sm2 leading-[3.6mm] tracking-[0.055mm]" v-html="textWithLineBreaks(data.address)" />
      </div>
    </span>

    <!--ANGEBOT-->
    <div class="absolute top-[329px]">
      <h1 class="font-din-bold text-lg">{{ formatSnapshot(data.snapshot_type) }}</h1>
    </div>

    <!--ANGEBOT DETAILS-->
    <div class="absolute top-[366px] leading-[4.2mm] tracking-[0.04mm]">
      <p class="text-sm2">Produktion: {{ data.production_name }}</p>
      <p class="text-sm2">Set: {{ data.set_name }}</p>
      <p class="text-sm2">Leih-Zeitraum: {{ formatDateSpan(data.start_date, data.end_date) }}</p>
    </div>

    <!--DOCUMENT DATE-->
    <div>
      <p class="absolute top-[365px] right-[71px] text-xs">Berlin, {{ data.offer_date }}</p>
    </div>

    <!--DOCUMENT ARTWORKS TABLE-->
    <div class="relative top-[470px] w-[639px] bg-white">
      <table class="w-full">
        <thead>
          <tr class="font-din-medium text-xs leading-[6.2mm] border-b border-b-black">
            <th class="w-[35px]">Pos.</th>
            <th class="w-[87px]">Artikelnr.</th>
            <th class="w-[77px]">Bild</th>
            <th class="w-[197px]">Titel des Bildes</th>
            <th class="w-[125px]">Größe</th>
            <th class="w-[63px]">Warenwert</th>
            <th class="text-right !important">Preis</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-xs border-b border-b-black" v-for="(artwork, i) in data.collection" :key="artwork">
            <td class="pt-[10px] h-[36px]">
              <p>{{ ++i }}</p>
            </td>
            <td class="pt-[10px]">{{ artwork.article_id }}</td>
            <td class="pl-1"><img class="h-[29px]" :src="artwork.url" alt="img" /></td>
            <td class="pt-[10px]">{{ artwork.title }}</td>
            <td class="pt-[10px]">{{ `${artwork.width} x ${artwork.height} cm` }}</td>
            <td class="pt-[10px]">{{ artwork.price }} €</td>
            <td class="pt-[10px] text-right">{{ artwork.rent_price }} €</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="sass">

.bg-trans
  background-color: rgba(0, 255, 0, 0.22)

.text-right
  text-align: right

.text-xs
  font-size: 9pt

.text-sm2
  font-size: 13px

.text-lg
  font-size: 19px
  font-weight: 900

table
  border-collapse: collapse
  border-spacing: 0
  width: 100%

th, td
  padding: 0
  border: none
  text-align: left
</style>