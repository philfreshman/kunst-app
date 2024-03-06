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
const dropdownItems = (t: any, row: Invoice) => [
  [
    {
      label: t("actions.preview"),
      icon: "i-heroicons-eye-20-solid",
      click: () => initPreviewModalOpen(row)
    },
    {
      label: t("actions.edit"),
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => setEditInvoiceId(row)
    },
    {
      label: t("actions.delete"),
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
const deleteInvoice = async () => {
  if (deleteModalInvoice.value?.id === undefined) return
  isDeleteModalOpen.value = false
  await invoices.deleteInvoice(deleteModalInvoice.value.id)
  await invoices.initInvoices()
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

const sort = ref({
  column: "internal_id",
  direction: "asc"
})
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
        {{ $t("actions.new-invoice") }}
      </UButton>
    </template>

    <template #content>
      <UTable
        :sort
        :columns="invoiceTableColumns($t)"
        :rows="filteredRows"
        :loading="invoices.loading.value"
        :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: $t('messages.no-data') }"
      >
        <template #id-data="{ row }"> {{ id }} </template>
        <template #date_span-data="{ row }">
          {{ formatDateSpan(row.start_date, row.end_date) }}
        </template>
        <template #invoice_date-data="{ row }">
          {{ formatShortDate(row.invoice_date) }}
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="dropdownItems($t, row)">
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