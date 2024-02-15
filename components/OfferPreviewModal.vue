<script setup lang="ts">
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import PreviewWindow from "~/components/PreviewWindow.vue"

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as PropType<OffersSnapshots>
  }
})

const open = computed(() => {
  return props.isOpen
})

const emit = defineEmits<{ closeModal: [] }>()
const saveToPdf = async () => {
  const divC = document.getElementById("pdf-div")
  if (divC === null) return
  const canvas = await html2canvas(divC, { scale: 4, dpi: 300 })
  const imgData = canvas.toDataURL("image/png", 1)
  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    compress: false
  })
  pdf.addImage(imgData, "PDF", 0, 0, 210, 297, "angebot", "SLOW") // "NONE" | "FAST" | "MEDIUM" | "SLOW";
  pdf.save("solution1.pdf")
}
</script>

<template>
  <UModal v-model="open" fullscreen>
    <div class="w-full h-full flex flex-row overflow-scroll">
      <div class="flex-grow" @click="emit('closeModal')">
        <BackgroundPattern />
      </div>
      <div @click="saveToPdf" id="pdf-div" class="bg-yellow-200 w-[210mm] aspect-ratio shadow-2xl relative">
        <img class="w-full h=auto" src="../assets/Angebot.png" alt="pdf" />
        <div class="absolute top-0 left-0 w-full h-full text-black">
          <PreviewWindow :data />
        </div>
      </div>
      <div class="flex-grow" @click="saveToPdf">
        <BackgroundPattern />
      </div>
    </div>
  </UModal>
</template>

<style lang="sass" scoped>
.aspect-ratio
  aspect-ratio: 2480 / 3508
</style>
