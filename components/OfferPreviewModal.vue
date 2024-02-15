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
  const canvas = await html2canvas(divC, { scale: 2 })
  const imgData = canvas.toDataURL("image/png", 1)
  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    compress: true
  })
  pdf.addImage(imgData, "PDF", 0, 0, 210, 297, "angebot", "SLOW") // "NONE" | "FAST" | "MEDIUM" | "SLOW";
  pdf.save("solution1.pdf")
}

const zoomValue = ref<string>("0.31")

onBeforeMount(() => {
  const height = window.screen.height

  switch (height) {
    case 1050:
      zoomValue.value = "0.265"
      break
    case 1200:
      zoomValue.value = "0.31"
      break
    case 900:
      zoomValue.value = "0.225"
      break
    default:
      zoomValue.value = "0.25"
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
    <div class="absolute top-0 left-0 h-full w-full z-10">
      <BackgroundPattern />
    </div>
    <div class="absolute w-full h-full flex align-middle justify-center z-40" :style="{ zoom: zoomValue }">
      <div class="relative aspect-ratio parent overflow-scroll">
        <div id="pdf-div" class="bg-blue-600 shadow-2xl pdf relative">
          <img class="w-full absolute h=auto" src="../assets/Angebot.png" alt="pdf" />

          <div class="absolute top-0 left-0 w-full h-full text-black" @click="saveToPdf">
            <PreviewWindow class="z-50" :data />
          </div>
        </div>
      </div>
      <!--      <div @click="saveToPdf" class="flex-grow hover:cursor-pointer"></div>-->
    </div>
  </div>
</template>

<style lang="sass" scoped>

.pdf
  width: 1860pt
  height: 2631pt

.aspect-ratio
  aspect-ratio: 2480 / 3508
</style>
