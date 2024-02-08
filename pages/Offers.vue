<script setup lang="ts">
import useFilteredArtworks from "~/composables/useSearchFilter"
import useOffers from "~/composables/useOffers"
import { offersTableColumns } from "~/utils/tableDefinitions"
import BaseSearch from "~/components/BaseSearch.vue"

const offers = useOffers()

// Modal
const isModalOpen = ref(false)
const setModalOpen = () => (isModalOpen.value = true)
const setModalClosed = () => (isModalOpen.value = false)

// Search
const { search, filteredRows } = useFilteredArtworks(offers.data)
</script>

<template>
  <Container>
    <template #controls>
      <BaseSearch v-model="search" />

      <UButton icon="i-mdi:offer" size="md" color="gray" variant="solid" trailing @click="setModalOpen"> Neues Angebot </UButton>
    </template>

    <template #content>
      <UTable :columns="offersTableColumns" :rows="filteredRows" :loading="offers.loading.value">
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
