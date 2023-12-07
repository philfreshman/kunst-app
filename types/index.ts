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
    Id: number
    PeaceIds: string
    IsArchived: boolean
  }

  // Rechnung
  interface Invoice {
    Id?: number | null
    Date: Date
    InvoiceNr: string
    Description: string
    Text1: string
    Text2: string
    IsArchived?: boolean
  }

  // Angebot
  interface Offer {
    Id: number
    SetName: string
    Date: Date
    Text1: string
    Text2: string
    IsArchived: boolean
  }

  // Bestellung
  interface Order {
    Id: number
    Sender: string
    Address1: string
    Address2: string
    Address3: string
    ProductionName: string
    StartDate: Date
    EndDate: Date
    Tax: number
    IsArchived: boolean
    OfferId?: any
    InvoiceId?: any
    CollectionId?: any
  }

  interface Peace {
    Id: number
    InvoiceDate: Date
    InvoiceNr: string
    Description: string
    Text1: string
    Text2: string
    IsArchived: boolean
  }
}


