<script setup lang="ts" generic="T extends OfferSnapshot & InvoiceSnapshot">
import { formatDateSpan, formatDateNumeric, formatSnapshot, textWithLineBreaks } from "~/utils/formater"
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
    <span class="absolute top-[33px] right-[45px]">
      <img class="w-[185px]" src="/assets/img/Kunst_fuer_Film_Logo_blau.png" alt="logo" />
    </span>

    <!--ANSCHRIFFT-->
    <!--    <span class="absolute top-[52mm] w-auto">-->
    <div class="absolute top-[200px] w-auto">
      <p class="text-xs">KUNST FÜR FILM, Meininger Straße 12, 10823 Berlin</p>
      <div class="ml-[0.2mm] mt-[1mm] w-[74mm] h-[1px] bg-black"><p>&nbsp</p></div>
      <div class="mt-[4mm] w-300px pt-[1px]">
        <p class="text-sm2 leading-[3.6mm] tracking-[0.055mm]" v-html="textWithLineBreaks(data.address)" />
      </div>
    </div>

    <!--ANGEBOT-->
    <div class="absolute top-[329px]">
      <h1 class="font-din-bold text-lg">{{ formatSnapshot(data.snapshot_type) }}</h1>
    </div>

    <!--ANGEBOT DETAILS-->
    <div class="absolute top-[366px] leading-[4.2mm] tracking-[0.04mm]">
      <p class="text-sm2">Produktion: {{ data.production_name }}</p>
      <p class="text-sm2">Set: {{ data.set_name }}</p>
      <p class="text-sm2">Leih-Zeitraum: {{ formatDateSpan(data.start_date, data.end_date) }}</p>
      <p v-if="data.invoice_number" class="text-sm2">Rechnungsnummer: {{ data.invoice_number }}</p>
      <!--      <p v-if="data.offer_number" class="text-sm2">Angebot-Nr.: {{ data.offer_number }}</p>-->
      <p v-if="data.custom_field" class="text-sm2">{{ data.custom_field.key }}: {{ data.custom_field.value }}</p>
    </div>

    <!--DOCUMENT DATE-->
    <div>
      <p class="absolute top-[365px] right-[71px] text-xs">Berlin, {{ data.offer_date || data.invoice_date }}</p>
    </div>

    <!--DOCUMENT ARTWORKS TABLE-->
    <div class="relative top-[470px] w-[639px]">
      <table class="w-full">
        <thead>
          <tr class="font-din-medium text-xs leading-[5.2mm] border-b border-b-black">
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
            <td class=""><img class="h-[29px] relative top-1" :src="artwork.blob" alt="img" /></td>
            <td class="pt-[10px]">{{ artwork.title }}</td>
            <td class="pt-[10px]">{{ `${artwork.width} x ${artwork.height} cm` }}</td>
            <td class="pt-[10px]">{{ artwork.price }} €</td>
            <td class="pt-[10px] text-right">{{ artwork.rent_price }} €</td>
          </tr>
        </tbody>
      </table>
      <!--SUMMARY-->
      <div class="pt-[13px] w-[639px] text-xs2 leading-[6.2mm]">
        <div class="flex justify-between">
          <p class="">Leihgebühr netto:</p>
          <p class="">{{ data.net_rental_fee }} €</p>
        </div>
        <div class="flex justify-between">
          <p class="">zzgl. 19% Umsatzsteuer</p>
          <p class="">{{ data.sales_tax }} €</p>
        </div>
        <div class="flex justify-between font-din-bold">
          <p class="">GESAMT</p>
          <p class="">{{ data.total }} €</p>
        </div>
        <div class="ml-[0.4mm] mt-[1mm] w-full h-[1px] bg-black"><p>&nbsp</p></div>
      </div>

      <!--INFO-->
      <div class="pt-[33px] w-[639px] text-sm2 leading-[5.2mm] tracking-[0.04mm]">
        <p>Bei Annahme des Angebotes erklärt sich der Mieter mit folgendem einverstanden:</p>
        <p>Bei Verlust oder Totalschaden wird der volle Warenwert fällig. Bei Teilschaden wird die vom Vermieter</p>
        <p>veranschlagte Reparatursumme sofort in Rechnung gestellt.</p>
        <br />
        <p>Mit freundlichen Grüßen</p>
        <p>Kasia Swiezak</p>
      </div>
    </div>

    <!--DOCUMENT FOOTER-->
    <div class="absolute bottom-[15px] flex w-[660px] text-footer leading-[3.4mm] tracking-[0] bggg">
      <div class="w-1/4">
        <p class="">KUNST FÜR FILM</p>
        <p>&nbsp</p>
        <p class="">0176-215 291 86</p>
        <p>mail@kunstfuerfilm.de</p>
        <p>www.kunstfürfilm.de</p>
      </div>
      <div class="w-1/4">
        <p>Lageradresse:</p>
        <p>Kunst für Film</p>
        <p>Kulmer Str. 20 A</p>
        <p>2. Hinterhof</p>
        <p>10783 Berlin</p>
      </div>
      <div class="w-1/4">
        <p>Rechnungsadresse</p>
        <p>Kunst für Film</p>
        <p>Katharina Swiezak</p>
        <p>Meininger Str. 12</p>
        <p>10823 Berlin</p>
      </div>
      <div class="w-1/4">
        <p>Kontoverbindung</p>
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

.text-footer
  font-size: 8pt

.text-xs
  font-size: 9pt

.text-xs2
  font-size: 10pt

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