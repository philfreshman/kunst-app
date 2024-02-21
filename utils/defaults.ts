export function defaultOffer(): Offer {
  return {
    offer_date: "",
    address: "",
    production_name: "",
    set_name: "",
    start_date: "",
    end_date: "",
    is_archived: false,
    snapshot_id: ""
  }
}

export function defaultInvoice(): Invoice {
  return {
    offer_date: "",
    address: "",
    production_name: "",
    set_name: "",
    start_date: "",
    end_date: "",
    is_archived: false,
    snapshot_id: "",
    invoice_number: "",
    custom_field: {}
  }
}