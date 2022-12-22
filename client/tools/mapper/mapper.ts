
// mapInvoice turns invoice-proxy into Invoice object
export function mapToInvoice(form: Invoice): Invoice{
    return {
        Id: form.Id,
        Date: form.Date,
        InvoiceNr: form.InvoiceNr,
        Description: form.Description,
        Text1: form.Text1,
        Text2: form.Text2,
        IsArchived: false
    }
}

// mapInvoice turns invoice-proxy into Invoice object
export function mapToOffer(form: Offer): Offer{
    return {
        Id: form.Id,
        SetName: form.SetName,
        Date: form.Date,
        Text1: form.Text1,
        Text2: form.Text2,
        IsArchived: false
    }
}