export const artistsTableColumns = (t: any) => [
  {
    key: "internal_id",
    label: "#"
  },
  {
    key: "name",
    label: t("common.name")
  },
  {
    key: "phone",
    label: t("common.phone")
  },
  {
    key: "email",
    label: t("common.email")
  },
  {
    key: "actions"
  }
]

export const artworksTableColumns = (t: any) => [
  {
    key: "article_id",
    label: t("common.article-id"),
    sortable: true
  },
  {
    key: "url",
    label: t("common.artwork")
  },
  {
    key: "name",
    label: t("common.artwork"),
    sortable: true
  },
  {
    key: "title",
    label: t("common.title"),
    sortable: true
  },
  {
    key: "width",
    label: t("common.width"),
    sortable: true
  },
  {
    key: "height",
    label: t("common.height"),
    sortable: true
  },
  {
    key: "price",
    label: t("common.price"),
    sortable: true
  }
]

export const offersTableColumns = (t: any) => [
  {
    key: "internal_id",
    label: "#"
  },
  {
    key: "production_name",
    label: t("common.production")
  },
  {
    key: "set_name",
    label: t("common.set")
  },
  {
    key: "date_span",
    label: t("common.period")
  },
  {
    key: "offer_date",
    label: t("common.offer-date")
  },
  {
    key: "actions"
  }
]

export const invoiceTableColumns = (t: any) => [
  {
    key: "internal_id",
    label: "#"
  },
  {
    key: "invoice_number",
    label: t("common.invoice-number")
  },
  {
    key: "production_name",
    label: t("common.production")
  },
  {
    key: "set_name",
    label: t("common.set")
  },
  {
    key: "date_span",
    label: t("common.period")
  },
  {
    key: "invoice_date",
    label: t("common.invoice-date")
  },
  {
    key: "actions"
  }
]

export const addEditModalTabs = [
  {
    index: 0,
    slot: "data",
    label: "Daten",
    defaultOpen: true
  },
  {
    index: 1,
    slot: "artworks",
    label: "Kunstwerke"
  },
  {
    index: 2,
    slot: "summary",
    label: "Zusammenfassung"
  }
]

// Accordion
export const accordionTabs = [
  {
    index: 0,
    slot: "data",
    label: "Daten",
    defaultOpen: true
  },
  {
    index: 1,
    slot: "artworks",
    label: "Kunstwerke"
  }
]
