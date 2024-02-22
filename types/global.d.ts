import type { Ref } from "@vue/reactivity"

export {}

declare global {
  type Artist = {
    id: string
    name: string
    is_archived: boolean
    phone: string
    email: string
  }

  type Collection = {
    id: string
    article_id: string
    title: string
    width: number
    height: number
    price: number
    url: string
    blob: string
    rent_price: any
  }

  type KunstDocument = {
    id?: string
    address: string
    production_name: string
    set_name: string
    start_date: string
    end_date: string
    is_archived: boolean
    snapshot_id: string
  }

  // Rechnung
  type Invoice = {
    invoice_date: string
    invoice_number: string
    custom_field: {
      key: string
      value: string
    }
  } & KunstDocument

  // Angebot
  type Offer = {
    offer_date: string
  } & KunstDocument

  type snapshotType = "offer" | "invoice"

  type Snapshot = {
    id?: string
    collection: Collection[]
    snapshot_type: snapshotType
    net_rental_fee: string
    tax: number
    sales_tax: string
    total: string
    is_archived?: boolean
  }

  type InvoiceSnapshot = {
    snapshot_type: snapshotType
    net_rental_fee: number
    tax: number
    sales_tax: number
    total: string
    collection: Collection[]
  } & Invoice

  type OfferSnapshot = {
    snapshot_type: snapshotType
    net_rental_fee: number
    tax: number
    sales_tax: number
    total: string
    collection: Collection[]
  } & Offer

  type Artwork = {
    id: string
    article_id: string
    title: string
    width: number
    height: number
    price: number
    is_available: boolean
    is_archived: boolean
    img_url: string
    artist_id: number
  }

  // For searching
  type ArtworkLight = {
    id: string
    article_id: string
    url: string
    name: string
    title: string
  }
}