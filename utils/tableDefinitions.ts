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
    key: "img_url",
    label: "Bild",
    class: "w-1/4"
  },
  {
    key: "artists.name",
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
