<script setup lang="ts">
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

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
  const canvas = await html2canvas(divC, { scale: 4 })
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

const zoomValue = ref<string>("0.31")

onBeforeMount(() => {
  const height = window.screen.height

  switch (height) {
    case 1200:
      // zoomValue.value = "0.9635"
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

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      emit("closeModal")
    }
  })
})
</script>

<template>
  <div v-if="open" class="absolute top-0 left-0 h-full w-full">
    <div class="absolute top-0 left-0 h-full w-full z-10" @click="emit('closeModal')">
      <!--      <BackgroundPattern />-->
    </div>
    <div
      class="absolute w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700"
      :style="{ zoom: zoomValue }"
    >
      <div class="relative aspect-ratio parent overflow-scroll drop-shadow-2xl">
        <div id="pdf-div" class="bg-white pdf relative inset-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <img class="w-full h=auto" src="../assets/Angebot.png" alt="pdf" />
          <div class="absolute top-0 left-0 w-full h-full text-black">
            <PreviewWindow class="z-50" :data />
          </div>
        </div>
      </div>
    </div>

    <button class="absolute top-0 right-0 m-4 p-2 bg-green-500 rounded text-white z-20" @click="saveToPdf">
      Download
    </button>

    <button class="absolute top-0 left-0 m-4 p-2 bg-red-500 rounded text-white z-20" @click="emit('closeModal')">
      Close
    </button>
  </div>
</template>

<style lang="sass" scoped>

.pdf
  width: 210mm
  height: 297mm

.aspect-ratio
  aspect-ratio: 2480 / 3508
</style>
