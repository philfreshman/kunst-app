<script setup lang="ts">
import useFilteredArtworks from "~/composables/useSearchFilter"
import { invoiceTableColumns } from "~/utils/tableDefinitions"
import BaseSearch from "~/components/BaseSearch.vue"
import useSnapshot from "~/composables/useSnapshot"
import { formatDateSpan, formatShortDate } from "~/utils/formater"
import useInvoices from "~/composables/useInvoices"

const invoices = useInvoices()
onMounted(() => invoices.initInvoices())

// Table
const { search, filteredRows } = useFilteredArtworks(invoices.data)
const dropdownItems = (row: Invoice) => [
  [
    {
      label: "Preview",
      icon: "i-heroicons-eye-20-solid",
      click: () => initPreviewModalOpen(row)
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => setEditInvoiceId(row)
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => setDeleteModalOpen(row)
    }
  ]
]

// Add-Edit Modal
const isAddModalOpen = ref(false)
const editInvoice = ref<Invoice | undefined>()
const setAddEditModalOpen = () => (isAddModalOpen.value = true)
const setAddEditModalClosed = async () => {
  isAddModalOpen.value = false
  invoices.initInvoices().then()
}
const setEditInvoiceId = (row: Invoice) => {
  if (invoices.data.value === undefined) return
  editInvoice.value = invoices.data.value.find((invoice) => invoice.id === row.id)
  setAddEditModalOpen()
}

// Delete Modal
const deleteModalInvoice = ref<Invoice>()
const isDeleteModalOpen = ref(false)
const setDeleteModalClosed = () => (isDeleteModalOpen.value = false)
const setDeleteModalOpen = (row: Invoice) => {
  deleteModalInvoice.value = row
  isDeleteModalOpen.value = true
}
const deleteInvoice = () => {
  if (deleteModalInvoice.value?.id === undefined) return
  isDeleteModalOpen.value = false
  invoices.deleteInvoice(deleteModalInvoice.value.id).then()
  invoices.initInvoices().then()
}

// Preview Modal
const invoiceSnapshot = ref<Snapshot>()
const isPreviewModalOpen = ref(false)
const openPreviewModal = () => (isPreviewModalOpen.value = true)
const closePreviewModal = () => (isPreviewModalOpen.value = false)
const initPreviewModalOpen = async (row: Invoice) => {
  if (row.id === undefined) return
  useSnapshot()
    .getInvoiceSnapshotById(row.id)
    .then((res) => {
      invoiceSnapshot.value = res
      openPreviewModal()
    })
    .catch(() => closePreviewModal())
}
</script>

<template>
  <Container>
    <template #controls>
      <BaseSearch v-model="search" />
      <UButton
        size="md"
        color="gray"
        variant="solid"
        trailing
        @click="
          () => {
            editInvoice = undefined
            setAddEditModalOpen()
          }
        "
      >
        Neue Rechnung
      </UButton>
    </template>

    <template #content>
      <UTable :columns="invoiceTableColumns" :rows="filteredRows" :loading="invoices.loading.value">
        <template #date_span-data="{ row }">
          {{ formatDateSpan(row.start_date, row.end_date) }}
        </template>
        <template #invoice_date-data="{ row }">
          {{ formatShortDate(row.invoice_date) }}
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="dropdownItems(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </template>
  </Container>

  <!--AddModal-->
  <InvoiceAddEditModal v-if="isAddModalOpen" :editInvoice @closeModal="setAddEditModalClosed" />

  <!--PreviewModal-->
  <LazyPreviewModal v-if="isPreviewModalOpen" :data="invoiceSnapshot" @closeModal="closePreviewModal" />

  <!--DeleteModal-->
  <InvoiceDeleteModal
    v-if="isDeleteModalOpen"
    :formData="deleteModalInvoice"
    @closeModal="setDeleteModalClosed"
    @delete="deleteInvoice"
  />
</template>

<style lang="sass">
//.label-padding
//  label
//    padding-top: 12px
//
//.label-no-padding
//  label
//    padding-top: 0
</style>