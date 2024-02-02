<script setup lang="ts">
import limitTextarea from "~/utils/textareaLimiter"

// Setup
const emit = defineEmits<{ closeModal: [] }>()
onMounted(() => artworks.fetchArtworksLight2())

// Data
const artworks = useArtworks()
const selected = ref([1, 2, 3])

// Modal
const tabIndex = ref(0)
const modalData = reactive<Offer>({
  address: "LETTERBOX FILMPRODUKTION GMBH\n" + "Jenfelder Allee 80\n" + "D- 22039 Hamburg\n" + "Germany",
  production_name: "The next Level",
  set_name: "NY Apt Josh",
  start_date: "2024-01-17",
  end_date: "2024-01-22",
  offer_date: "2024-01-16",
  collection_id: 0
})
const modalTabs = [
  {
    index: 0,
    slot: "basics",
    label: "Basics",
    defaultOpen: true
  },
  {
    index: 1,
    slot: "artworks",
    label: "Kunstwerke"
  },
  {
    index: 2,
    slot: "price",
    label: "Preise"
  }
]

const items = [
  {
    label: "Getting Started",
    icon: "i-heroicons-information-circle",
    defaultOpen: true,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate."
  },
  {
    label: "Installation",
    icon: "i-heroicons-arrow-down-tray",
    defaultOpen: false,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate."
  }
]

const formatArtwork = (artwork: ArtworkLight) => {
  return `${artwork.article_id} | ${artwork.artists?.name} | ${artwork.title}`
}

const removeSelected = (artIndex: number) => {
  selected.value = selected.value.filter((item) => item !== artIndex)
}

const log = (val) => {
  console.log(val)
}
</script>

<template>
  <BaseModal :isWide="tabIndex !== 0">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">Angebot erstellen</h2>
        <UButton @click="emit('closeModal')" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" />
      </div>
    </template>

    <div>
      <UTabs :items="modalTabs" class="h-[464px] w-full custom-height flex flex-col" @change="(idx) => (tabIndex = idx)">
        <template #basics="{ item }">
          <UCard>
            <UForm :state="modalData" class="label-padding">
              <UFormGroup label="Anschrift" class="label-no-padding">
                <UTextarea v-model="modalData.address" :rows="4" type="text" @input="limitTextarea" />
              </UFormGroup>
              <UFormGroup label="Production">
                <UInput v-model="modalData.production_name" type="text" />
              </UFormGroup>
              <UFormGroup label="Set">
                <UInput v-model="modalData.set_name" type="text" />
              </UFormGroup>
              <div class="w-full flex flex-row">
                <UFormGroup label="Leih-Zeitraum" class="w-[47%]">
                  <UInput v-model="modalData.start_date" type="date" />
                </UFormGroup>
                <div class="w-[6%] flex justify-end flex-col">
                  <h1 class="pl-1 pb-1">-></h1>
                </div>
                <UFormGroup label="&nbsp" class="w-[47%]">
                  <UInput v-model="modalData.end_date" type="date" />
                </UFormGroup>
              </div>
              <div class="w-[47%]">
                <UFormGroup label="Rechnungsdatum">
                  <UInput v-model="modalData.offer_date" type="date" />
                </UFormGroup>
              </div>
            </UForm>
          </UCard>
        </template>

        <template #artworks="{ item }" class="h-full">
          <div class="h-full">
            <UCard class="w-full h-full">
              <USelectMenu
                placeholder="Suche Kunstwerke..."
                icon="i-heroicons-magnifying-glass-20-solid"
                v-model="selected"
                multiple
                searchable
                :options="artworks.dataLight.value"
                value-attribute="id"
                option-attribute="id"
                :search-attributes="['artists.name', 'article_id', 'title']"
              >
                <template #option="{ option: artwork }">
                  <code>{{ formatArtwork(artwork) }}</code>
                </template>
              </USelectMenu>
              <br />

              <div class="w-full h-full overflow-scroll">
                <ul class="h-[310px]">
                  <li v-for="(val, key) in selected" :key="item">
                    <div
                      class="flex justify-between mb-2 px-3 rounded-md ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 p-1"
                    >
                      <UTooltip :openDelay="1000" :ui="{ base: 'h-auto', width: 'max-w-2xl' }">
                        <template #text>
                          <img class="h-96" :src="artworks.dataLight.value?.[val - 1].img_url" alt="artwork" />
                          <span class="w-full flex flex-row justify-center items-center h-4">
                            <span class="italic">{{ artworks.dataLight.value[val - 1].title }}</span>
                          </span>
                        </template>
                        <div class="w-[536px] whitespace-nowrap overflow-ellipsis overflow-hidden pr-3">
                          <code class="">{{ `${key + 1} ${formatArtwork(artworks.dataLight.value[val - 1])}` }}</code>
                        </div>
                      </UTooltip>

                      <UIcon
                        class="mt-1 hover:cursor-pointer"
                        dynamic
                        @click="removeSelected(val)"
                        color="gray"
                        variant="link"
                        name="i-heroicons-x-mark-20-solid"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </UCard>
          </div>
        </template>

        <template #price="{ item }">
          <UCard>
            <LazyOfferSummaryAccordion :modalData :selected />
          </UCard>
        </template>
      </UTabs>
    </div>

    <template #footer>
      <div class="w-full flex justify-center">
        <UButton>Save</UButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="sass">
.custom-height>div:nth-child(2)
    flex: 1
    height: 100%

div[tabindex="-1"]
  height: 100% !important

code
  overflow: hidden
  max-width: 100%
  text-overflow: ellipsis
  width: fit-content
  white-space: nowrap
</style>
