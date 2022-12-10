// import {FormInstance} from "element-plus";


// mapInvoice turns invoice-proxy into Invoice
export function mapToInvoice(form: Invoice): Invoice{
    return {
        Id: null,
        InvoiceDate: form.InvoiceDate,
        InvoiceNr: form.InvoiceNr,
        Description: form.Description,
        Text1: form.Text1,
        Text2: form.Text2,
        IsArchived: false
    }
}

