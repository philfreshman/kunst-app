import type { Ref } from "@vue/reactivity"

export {}

declare global {
  interface Artist {
    id: string
    name: string
    is_archived: boolean
    phone: string
    email: string
  }

  interface Collection {
    id: string
    article_id: string
    width: number
    height: number
    price: number
    rent_price: any
    url: string
    title: string
  }

  // Rechnung
  interface Invoice {
    id?: string | null
    date: Date
    invoice_nr: string
    description: string
    text1: string
    text2: string
    is_archived?: boolean
  }

  // Angebot
  type Offer = {
    id?: string
    offer_date: Date | any
    address: string
    production_name: string
    set_name: string
    start_date: Date | any
    end_date: Date | any
    is_archived?: boolean
    offer_snapshot_id: string
  }

  type OfferSnapshot = {
    collection: Collection[]
    summary: {
      net_rental_fee: string
      tax: number
      sales_tax: string
      total: string
    }
  }

  // Bestellung
  interface Order {
    id: string
    sender: string
    address1: string
    address2: string
    address3: string
    production_name: string
    start_date: Date
    end_date: Date
    tax: number
    is_archived: boolean
    offer_id?: any
    invoice_id?: any
    collection_id?: any
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
