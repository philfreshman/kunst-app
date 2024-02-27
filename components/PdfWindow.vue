<script setup lang="ts" generic="T extends OfferSnapshot & InvoiceSnapshot">
import {
  formatDateSpan,
  formatDateNumeric,
  formatSnapshot,
  textWithLineBreaks,
  formatShortDate,
  dotToComma
} from "~/utils/formater"
import type { PropType } from "@vue/runtime-core"

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as PropType<T>,
    required: true
  }
})
</script>

<template>
  <div class="w-full h-full px-[79px] font-din-light z-50 pdf-preview">
    <span class="absolute top-[18px] right-[47px]">
      <img class="w-[185px]" src="/assets/img/Kunst_fuer_Film_Logo_blau.png" alt="logo" />
    </span>

    <!--ANSCHRIFFT-->
    <!--    <span class="absolute top-[52mm] w-auto">-->
    <div class="absolute top-[200px] w-auto">
      <p class="text-xs">KUNST FÜR FILM, Meininger Straße 12, 10823 Berlin</p>
      <div class="ml-[0.2mm] mt-[1mm] w-[74mm] h-[1px] bg-black"><p>&nbsp</p></div>
      <div class="mt-[4mm] w-300px pt-[1px]">
        <p class="text-13 leading-[3.6mm] tracking-[0.04mm]" v-html="textWithLineBreaks(data.address)" />
      </div>
    </div>

    <!--ANGEBOT-->
    <div class="absolute top-[329px]">
      <h1 class="font-din-bold text-lg">{{ formatSnapshot(data.snapshot_type) }}</h1>
    </div>

    <!--ANGEBOT DETAILS-->
    <div class="absolute top-[366px] leading-[4.2mm] tracking-[0.04mm] text-13">
      <p>Produktion: {{ data.production_name }}</p>
      <p>Set: {{ data.set_name }}</p>
      <p>Leih-Zeitraum: {{ formatDateSpan(data.start_date, data.end_date) }}</p>
      <p v-if="data.invoice_number">Rechnungsnummer: {{ data.invoice_number }}</p>
      <!--      <p v-if="data.offer_number">Angebot-Nr.: {{ data.offer_number }}</p>-->
      <p v-if="data.custom_field">{{ data.custom_field.key }}: {{ data.custom_field.value }}</p>
    </div>

    <!--DOCUMENT DATE-->
    <div>
      <p class="absolute top-[365px] right-[75px] text-13">
        Berlin, {{ formatShortDate(data.offer_date) || formatShortDate(data.invoice_date) }}
      </p>
    </div>

    <!--DOCUMENT ARTWORKS TABLE-->
    <div class="relative top-[470px] w-[639px]">
      <table class="w-full">
        <thead>
          <tr class="font-din-medium text-13 leading-[5.2mm] border-b-[0.5px] border-black">
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
          <tr class="text-13 border-b-[0.5px] border-black" v-for="(artwork, i) in data.collection" :key="artwork">
            <td class="pt-[10px] h-[36px]">
              <p>{{ ++i }}</p>
            </td>
            <td class="pt-[10px]">{{ artwork.article_id }}</td>
            <td><img class="h-[29px] relative top-1" :src="artwork.blob" alt="img" /></td>
            <td class="pt-[10px]">{{ artwork.title }}</td>
            <td class="pt-[10px]">{{ `${artwork.width} x ${artwork.height} cm` }}</td>
            <td class="pt-[10px]">{{ artwork.price }} €</td>
            <td class="pt-[10px] text-right">{{ artwork.rent_price }},00 €</td>
          </tr>
        </tbody>
      </table>
      <!--SUMMARY-->
      <div class="pt-[13px] w-[639px] text-13 leading-[6.2mm]">
        <div class="flex justify-between">
          <p class="">Leihgebühr netto:</p>
          <p class="">{{ dotToComma(data.net_rental_fee) }} €</p>
        </div>
        <div class="flex justify-between">
          <p class="">zzgl. 19% Umsatzsteuer</p>
          <p class="">{{ dotToComma(data.sales_tax) }} €</p>
        </div>
        <div class="flex justify-between font-din-bold">
          <p class="">GESAMT</p>
          <p class="">{{ dotToComma(data.total) }} €</p>
        </div>
        <div class="ml-[0.4mm] mt-[1mm] w-full h-[1px] bg-black"><p>&nbsp</p></div>
      </div>

      <!--INFO-->
      <div class="pt-[33px] w-[639px] text-13 leading-[5.2mm] tracking-[0.04mm]">
        <p>Bei Annahme des Angebotes erklärt sich der Mieter mit folgendem einverstanden:</p>
        <p>Bei Verlust oder Totalschaden wird der volle Warenwert fällig. Bei Teilschaden wird die vom Vermieter</p>
        <p>veranschlagte Reparatursumme sofort in Rechnung gestellt.</p>
        <br />
        <p>Mit freundlichen Grüßen</p>
        <p>Kasia Swiezak</p>
      </div>
    </div>

    <!--DOCUMENT FOOTER-->
    <div class="absolute bottom-[15px] flex w-[660px] text-footer leading-[3.4mm] tracking-[0]">
      <div class="w-1/4">
        <p class="">KUNST FÜR FILM</p>
        <p>0176-215 291 86</p>
        <p>mail@kunstfuerfilm.de</p>
        <p>www.kunstfürfilm.de</p>
        <p>St.-Nr. 18/553/00947</p>
      </div>
      <div class="w-1/4">
        <p>Lageradresse:</p>
        <p>Kunst für Film</p>
        <p>c/o Swiezak/Bell</p>
        <p>Meininger Str. 12</p>
        <p>10823 Berlin</p>
      </div>
      <div class="w-1/4">
        <p>Rechnungsadresse:</p>
        <p>Kunst für Film</p>
        <p>Katharina Swiezak</p>
        <p>Meininger Str. 12</p>
        <p>10823 Berlin</p>
      </div>
      <div class="w-1/4">
        <p>Kontoverbindung:</p>
        <p>Katharina Swiezak</p>
        <p>Consorsbank</p>
        <p>BIC CSDBDE71</p>
        <p>IBAN DE62 7603 0080 0220 7325 74</p>
      </div>
    </div>
  </div>
</template>

<style lang="sass">

.bg-trans
  background-color: rgba(0, 255, 0, 0.22)

.text-right
  text-align: right

.text-center
  text-align: center

.text-footer
  font-size: 8pt

.text-xs
  font-size: 9pt

.text-xs2
  font-size: 10pt

.text-sm2
  font-size: 13px

.text-13
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