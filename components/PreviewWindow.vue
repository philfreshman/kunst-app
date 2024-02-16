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
</script>

<template>
  <div class="w-full h-full px-[79px] font-din-light z-50">
    <span class="absolute right-0">
      <img class="w-[185px]" src="/assets/img/pdf-logo.png" alt="logo" />
    </span>

    <!--ANSCHRIFFT-->
    <!--    <span class="absolute top-[52mm] w-auto">-->
    <span class="absolute top-[200px] w-auto">
      <p class="text-xs">KUNST FÜR FILM, Kulmer Str. 20 A, 10783 Berlin</p>
      <div class="ml-[0.4mm] mt-[1mm] w-[68mm] h-[1px] bg-black">&nbsp</div>
      <div class="mt-[4mm] w-300px pt-[1px]">
        <p class="text-sm2 leading-[3.6mm] tracking-[0.055mm]" v-html="textWithLineBreaks(data.address)" />
      </div>
    </span>

    <!--    &lt;!&ndash;ANGEBOT&ndash;&gt;-->
    <!--    <span class="absolute top-[85mm]">-->
    <!--      <h1 class="font-din-bold font-bold text-lg tracking-[0.001mm]">{{ formatSnapshot(data.snapshot_type) }}</h1>-->
    <!--    </span>-->

    <!--    &lt;!&ndash;ANGEBOT DETAILS&ndash;&gt;-->
    <!--    <div class="absolute top-[96.5mm] leading-[4.4mm] tracking-[0.07mm]">-->
    <!--      <p class="text-sm2">Produktion: {{ data.production_name }}</p>-->
    <!--      <p class="text-sm2">Set: {{ data.set_name }}</p>-->
    <!--      <p class="text-sm2">Leih-Zeitraum: {{ formatDateSpan(data.start_date, data.end_date) }}</p>-->
    <!--    </div>-->
  </div>
</template>

<style lang="css" scoped>
.text-xs {
  //-moz-osx-font-smoothing: grayscale;
  font-size: 9pt;
}

.text-sm2 {
  font-size: 13px;
}

.text-lg {
  font-size: 1.13rem;
}
</style>

//text-xs: 0.75rem //text-sm: 0.875rem //text-base: 1rem //text-lg: 1.125rem //text-xl: 1.25rem //text-2xl: 1.5rem
//text-3xl: 1.875rem //text-4xl: 2.25rem //text-5xl: 3rem //text-6xl: 4rem //text-7xl: 5rem //text-8xl: 6rem //text-9xl:
8rem
