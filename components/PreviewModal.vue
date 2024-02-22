<script setup lang="ts">
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import useEsc from "~/composables/uscEsc"

const props = defineProps({
  data: {
    type: Object as PropType<OfferSnapshot | InvoiceSnapshot>
  }
})

const emit = defineEmits<{ closeModal: [] }>()
useEsc().eventListener(emit)

const saveToPdf = async () => {
  const divC = document.getElementById("pdf-div")
  if (!divC) return
  const canvas = await html2canvas(divC, { scale: 4 })
  const imgData = canvas.toDataURL("image/png", 1)
  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    compress: false,
    hotfixes: ["fonts"]
  })
  pdf.addImage(imgData, "PDF", 0, 0, 210, 297, "", "SLOW") // "NONE" | "FAST" | "MEDIUM" | "SLOW";
  pdf.save("document.pdf")
}

const zoomValue = ref("0.31")

onBeforeMount(() => {
  const height = window.screen.height

  switch (height) {
    case 1200:
      zoomValue.value = "0.9635"
      break
    case 1050:
      zoomValue.value = "0.83"
      break
    case 900:
      zoomValue.value = "0.696"
      break
    default:
      zoomValue.value = "0.83"
  }
})
</script>

<template>
  <div class="absolute top-0 left-0 h-full w-full">
    <div
      class="absolute w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700"
      :style="{ zoom: zoomValue }"
    >
      <BackgroundPattern class="absolute h-full overflow-hidden" />
      <div class="relative aspect-ratio parent overflow-scroll drop-shadow-2xl" style="aspect-ratio: 2480 / 3508">
        <div
          id="pdf-div"
          class="bg-white w-[210mm] h-[297mm] relative inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div class="absolute top-0 left-0 w-full h-full text-black">
            <PdfWindow class="z-50" :data />
          </div>
        </div>
      </div>
    </div>

    <UButton
      icon="i-heroicons-x-mark-20-solid"
      color="red"
      class="absolute top-0 left-0 m-4 p-2 bg-red-500 rounded text-white z-20"
      @click="emit('closeModal')"
    />

    <UButton
      icon="i-heroicons-arrow-down-tray"
      class="absolute top-0 right-0 m-4 p-2 bg-green-500 rounded text-white z-20"
      @click="saveToPdf"
    >
      PDF
    </UButton>
  </div>
</template>