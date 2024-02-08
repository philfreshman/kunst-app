export const artistsTableColumns = [
  {
    key: "internal_id",
    label: "#"
  },
  {
    key: "name",
    label: "Name"
  },
  {
    key: "phone",
    label: "Phone"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "actions"
  }
]

export const artworksTableColumns = [
  {
    key: "article_id",
    label: "Artikel ID",
    sortable: true
  },
  {
    key: "url",
    label: "Bild"
  },
  {
    key: "name",
    label: "Künstler",
    sortable: true
  },
  {
    key: "title",
    label: "Titel",
    sortable: true
  },
  {
    key: "height",
    label: "Größe",
    sortable: true
  },
  {
    key: "width",
    label: "Breite",
    sortable: true
  },
  {
    key: "price",
    label: "Wert",
    sortable: true
  }
]

export const offersTableColumns = [
  {
    key: "id",
    label: "#"
  },
  {
    key: "offer_date",
    label: "Datum"
  },
  {
    key: "address",
    label: "Adresse"
  },
  {
    key: "production_name",
    label: "Produktion"
  },
  {
    key: "set_name",
    label: "Set"
  },
  {
    key: "start_date",
    label: "Start"
  },
  {
    key: "end_date",
    label: "Ende"
  },
  {
    key: "is_archived",
    label: "Archiviert"
  },
  {
    key: "collection_id",
    label: "Kollektion"
  },
  {
    key: "actions"
  }
]

export const offersModalTabs = [
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
    label: "Daten"
  },
  {
    index: 1,
    slot: "artworks",
    label: "Kunstwerke",
    defaultOpen: true
  }
]
