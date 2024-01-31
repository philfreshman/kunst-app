<script setup lang="ts">
import useFilteredArtworks from "~/composables/useSearchFilter"
import useOffers from "~/composables/useOffers"

const offers = useOffers()
offers.fetchOffers()

// Modal
const isModalOpen = ref(false)
const setModalOpen = () => (isModalOpen.value = true)
const setModalClosed = () => (isModalOpen.value = false)

// Search
const search = ref("")
const { filteredRows } = useFilteredArtworks(offers.data.value, search)

// Table settings
const columns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "offer_date",
    label: "Datum",
  },
  {
    key: "address",
    label: "Adresse",
  },
  {
    key: "production_name",
    label: "Produktion",
  },
  {
    key: "set_name",
    label: "Set",
  },
  {
    key: "start_date",
    label: "Start",
  },
  {
    key: "end_date",
    label: "Ende",
  },
  {
    key: "is_archived",
    label: "Archiviert",
  },
  {
    key: "collection_id",
    label: "Kollektion",
  },
  {
    key: "actions",
  },
]
</script>

<template>
  <Container>
    <template #controls>
      <!-- SEARCH -->
      <div class="flex dark:border-gray-700 h-full">
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          v-model="search"
          size="md"
          placeholder="Suche..."
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton v-show="search !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false" @click="search = ''" />
          </template>
        </UInput>
      </div>

      <UButton icon="i-mdi:offer" size="md" color="gray" variant="solid" trailing @click="setModalOpen"> Neues Angebot </UButton>
    </template>

    <template #content>
      <UTable :columns :rows="offers.data.value" :loading="offers.loading.value">
        <!--        <template #actions-data="{ row }">-->
        <!--          <UDropdown :items="items(row)">-->
        <!--            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />-->
        <!--          </UDropdown>-->
        <!--        </template>-->
      </UTable>
    </template>
  </Container>

  <!--AddModal-->
  <OffersAddModal v-if="isModalOpen" @closeModal="setModalClosed" />
</template>

<style lang="sass">
.label-padding
  label
    padding-top: 12px

.label-no-padding
  label
    padding-top: 0
</style>
