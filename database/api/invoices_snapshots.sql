/*
========================================
              OFFERS_SNAPSHOTS
========================================
*/



CREATE OR REPLACE FUNCTION get_invoice_snapshot(invoice_id TEXT) RETURNS public.invoices_snapshots AS $$
DECLARE
    result invoices_snapshots;
BEGIN
    SELECT * INTO result FROM invoices_snapshots WHERE id = invoice_id;
    RETURN result;
END
$$ LANGUAGE plpgsql;