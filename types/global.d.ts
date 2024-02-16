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
    width: number
    height: number
    price: number
    rent_price: any
    url: string
    title: string
  }

  type Document = {
    id?: string
    offer_date: string
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
    invoice_number: string
    special: string
  } & Document

  // Angebot
  type Offer = {} & Document

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

  type InvoiceSnapshots = {
    id: string
    address: string
    collection: Collection[]
    start_date: string
    end_date: string
    offer_date: string
    production_name: string
    invoice_number: string
    special: string
    set_name: string
    snapshot_id: string
    snapshot_type: snapshotType
    net_rental_fee: number
    tax: number
    sales_tax: number
    total: string
    is_archived: boolean
  }

  type OffersSnapshots = {
    id: string
    address: string
    collection: Collection[]
    start_date: string
    end_date: string
    offer_date: string
    production_name: string
    set_name: string
    snapshot_id: string
    snapshot_type: snapshotType
    net_rental_fee: number
    tax: number
    sales_tax: number
    total: string
    is_archived: boolean
  }

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

  type OffersType = {
    data: Ref<Offer[] | undefined>
    loading: Ref<boolean>
    initOffers: () => Promise<void>
    createOffer: (offer: Offer) => Promise<unknown>
  }
}