export {}


declare global{
    interface Artist {
        Id: number;
        Name: string;
        IsArchived: boolean;
    }

    interface Collection {
        Id: number;
        PeaceIds: string;
        IsArchived: boolean;
    }

    interface Invoice {
        Id?: number | null;
        InvoiceDate: Date;
        InvoiceNr: string;
        Description: string;
        Text1: string;
        Text2: string;
        IsArchived?: boolean;
    }



    interface Offer {
        Id: number;
        SetName: string;
        OfferDate: Date;
        Text1: string;
        Text2: string;
        IsArchived: boolean;
    }

    interface Order {
        Id: number;
        Sender: string;
        Address1: string;
        Address2: string;
        Address3: string;
        ProductionName: string;
        StartDate: Date;
        EndDate: Date;
        Tax: number;
        IsArchived: boolean;
        OfferId?: any;
        InvoiceId?: any;
        CollectionId?: any;
    }

    interface Peace {
        Id: number;
        InvoiceDate: Date;
        InvoiceNr: string;
        Description: string;
        Text1: string;
        Text2: string;
        IsArchived: boolean;
    }
}


