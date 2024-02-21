/*
========================================
              SNAPSHOTS
========================================
*/


CREATE OR REPLACE FUNCTION get_snapshot(snapshot_id text) RETURNS snapshots AS $$
DECLARE
    result snapshots;
BEGIN
    SELECT * INTO result FROM snapshots WHERE id = snapshot_id LIMIT 1;
    RETURN result;
END
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION create_snapshot(collection JSON, summary Summary) RETURNS JSON AS $$
DECLARE
    new_id TEXT;
    result JSON;
BEGIN
    INSERT INTO snapshots (collection, snapshot_type, net_rental_fee, tax, sales_tax, total)
    VALUES (collection, summary.snapshot_type::snapshot_type, summary.net_rental_fee, summary.tax, summary.sales_tax, summary.total)
    RETURNING id INTO new_id;

    SELECT json_build_object('data', new_id) INTO result;

    RETURN result;
EXCEPTION
    WHEN others THEN
        SELECT json_build_object('error', SQLERRM) INTO result;
        RETURN result;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_snapshot(snapshot_id text, new_collection JSON, new_summary Summary) RETURNS text AS $$
BEGIN
    UPDATE snapshots
    SET collection = new_collection,
        snapshot_type = new_summary.snapshot_type::snapshot_type,
        net_rental_fee = new_summary.net_rental_fee,
        tax = new_summary.tax,
        sales_tax = new_summary.sales_tax,
        total = new_summary.total
    WHERE id = snapshot_id;
    RETURN 'Snapshot updated successfully';
EXCEPTION
    WHEN others THEN
        RETURN 'Error updating snapshot';
END;
$$ LANGUAGE plpgsql;