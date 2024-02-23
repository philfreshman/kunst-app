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

const fileName = computed(() => {
  if (!props.data) return ""
  const prefix = props.data.snapshot_type === "invoice" ? "Rechnung" : "Angebot"
  const date = new Date()
  const day = date.getDate()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString().slice(-2)
  return `${prefix}${year}${month}${day}_.pdf`
})

const isRendering = ref(false)
watchEffect(() => {
  if (isRendering.value) {
    document.body.style.cursor = "progress"
  } else {
    document.body.style.cursor = "default"
  }
})

const saveToPdf = async () => {
  const divC = document.getElementById("pdf-div")
  if (!divC) return
  isRendering.value = true
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
  isRendering.value = false
  pdf.save(fileName.value)
}

const zoomValue = ref("0.31")

// linear function to calculate zoom value based on screen height
onBeforeMount(() => {
  const screenHeight = window.screen.height
  const slope = (0.9635 - 0.696) / (1200 - 900)
  const yIntercept = 0.9635 - slope * 1200
  zoomValue.value = (slope * screenHeight + yIntercept).toFixed(4)
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
      :disabled="isRendering"
      icon="i-heroicons-x-mark-20-solid"
      color="red"
      class="absolute top-0 left-0 m-4 p-2 bg-red-500 rounded text-white z-20"
      @click="!isRendering && emit('closeModal')"
    />

    <UButton
      :loading="isRendering"
      :disabled="isRendering"
      icon="i-heroicons-arrow-down-tray"
      class="absolute top-0 right-0 m-4 p-2 bg-green-500 rounded text-white z-20"
      @click="saveToPdf"
    >
      PDF
    </UButton>
  </div>
</template>