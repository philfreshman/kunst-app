<script setup lang="ts">
import useFilteredArtworks from "~/composables/useSearchFilter"
import useOffers from "~/composables/useOffers"
import { offersTableColumns } from "~/utils/tableDefinitions"
import BaseSearch from "~/components/BaseSearch.vue"
import useSnapshot from "~/composables/useSnapshot"

const offers = useOffers()
onMounted(() => offers.initOffers())

const dropdownItems = (row: Offer) => [
  [
    {
      label: "Preview",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log(row)
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log(row)
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => setDeleteModalOpen(row)
    }
  ]
]

// Add Modal
const isAddModalOpen = ref(false)
const setAddModalOpen = () => (isAddModalOpen.value = true)
const setAddModalClosed = async () => {
  isAddModalOpen.value = false
  offers.initOffers().then()
}

// Delete Modal
const deleteModalOffer = ref<Offer>()
const isDeleteModalOpen = ref(false)
const setDeleteModalOpen = (row: Offer) => {
  deleteModalOffer.value = row
  isDeleteModalOpen.value = true
}
const setDeleteModalClosed = () => {
  isDeleteModalOpen.value = false
}
const deleteOffer = () => {
  if (deleteModalOffer.value?.id === undefined) return
  isDeleteModalOpen.value = false
  offers.deleteOffer(deleteModalOffer.value.id).then()
  offers.initOffers().then()
}

// Search
const { search, filteredRows } = useFilteredArtworks(offers.data)
</script>

<template>
  <Container>
    <template #controls>
      <BaseSearch v-model="search" />

      <UButton icon="i-mdi:offer" size="md" color="gray" variant="solid" trailing @click="setAddModalOpen"> Neues Angebot </UButton>
    </template>

    <template #content>
      <UTable :columns="offersTableColumns" :rows="filteredRows" :loading="offers.loading.value">
        <template #actions-data="{ row }">
          <UDropdown :items="dropdownItems(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </template>
  </Container>

  <!--AddModal-->
  <OffersAddModal :offers v-if="isAddModalOpen" @closeModal="setAddModalClosed" />

  <!--DeleteModal-->
  <OffersDeleteModal :formData="deleteModalOffer" v-if="isDeleteModalOpen" @closeModal="setDeleteModalClosed" />
</template>

<style lang="sass">
.label-padding
  label
    padding-top: 12px

.label-no-padding
  label
    padding-top: 0
</style>
