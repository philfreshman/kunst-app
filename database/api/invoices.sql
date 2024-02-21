/*
========================================
               INVOICES
========================================
*/


CREATE OR REPLACE FUNCTION get_invoices() RETURNS SETOF invoices AS $$
BEGIN
    RETURN QUERY SELECT * FROM invoices WHERE is_archived = false;
END
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION delete_invoice(invoice_id text) RETURNS boolean AS $$
DECLARE
    rows_affected INTEGER;
BEGIN
    UPDATE invoices SET is_archived = true
    WHERE invoices.id = invoice_id;
    GET DIAGNOSTICS rows_affected = ROW_COUNT;
    RETURN rows_affected > 0;
EXCEPTION
    WHEN others THEN
        RETURN false;
END
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION create_invoice(invoice invoices) RETURNS JSON AS $$
DECLARE
    new_invoice_id TEXT;
    result JSON;
BEGIN
    INSERT INTO invoices (address, production_name, custom_field, set_name, start_date, end_date, invoice_date, snapshot_id)
    VALUES (
        invoice.address,
        invoice.production_name,
        invoice.custom_field,
        invoice.set_name,
        invoice.start_date,
        invoice.end_date,
        invoice.invoice_date,
        invoice.snapshot_id
    )
    RETURNING id INTO new_invoice_id;

    RETURN json_build_object('id', new_invoice_id);
EXCEPTION
    WHEN others THEN
        SELECT json_build_object('error', SQLERRM) INTO result;
        RETURN result;
END
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION update_invoice(invoice invoices) RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    UPDATE invoices
    SET address = invoice.address,
        production_name = invoice.production_name,
        custom_field = invoice.custom_field,
        set_name = invoice.set_name,
        start_date = invoice.start_date,
        end_date = invoice.end_date,
        invoice_date = invoice.invoice_date
    WHERE id = invoice.id;

    RETURN json_build_object('id', invoice.id);
EXCEPTION
    WHEN others THEN
        SELECT json_build_object('error', SQLERRM) INTO result;
        RETURN result;
END;
$$ LANGUAGE plpgsql;