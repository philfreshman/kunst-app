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
    address: "",
    production_name: "",
    set_name: "",
    start_date: "",
    end_date: "",
    is_archived: false,
    snapshot_id: "",
    invoice_number: "",
    invoice_date: "",
    custom_field: {
      key: "",
      value: ""
    }
  }
}