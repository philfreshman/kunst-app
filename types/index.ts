export {}

declare global {
  interface Artist {
    id: number
    name: string
    is_archived: boolean
    phone: string
    email: string
  }

  interface Collection {
    id: number
    peace_ids: string
    is_archived: boolean
  }

  // Rechnung
  interface Invoice {
    id?: number | null
    date: Date
    invoice_nr: string
    description: string
    text1: string
    text2: string
    is_archived?: boolean
  }

  // Angebot
  interface Offer {
    id: number
    set_name: string
    date: Date
    text1: string
    text2: string
    is_archived: boolean
  }

  // Bestellung
  interface Order {
    id: number
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

  interface Artwork {
    id: number
    invoice_date: Date
    invoice_nr: string
    description: string
    text1: string
    text2: string
    is_archived: boolean
  }
}
