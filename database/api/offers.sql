/*
========================================
               OFFERS
========================================
*/


CREATE OR REPLACE FUNCTION get_offers() RETURNS SETOF offers AS $$
BEGIN
    RETURN QUERY SELECT * FROM offers WHERE is_archived = false;
END
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION delete_offer(offer_id text) RETURNS boolean AS $$
DECLARE
    rows_affected INTEGER;
BEGIN
    UPDATE offers SET is_archived = true WHERE offers.id = offer_id;
    GET DIAGNOSTICS rows_affected = ROW_COUNT;
    RETURN rows_affected > 0;
EXCEPTION
    WHEN others THEN
        RETURN false;
END
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION create_offer(offer offers) RETURNS JSON AS $$
DECLARE
    new_offer_id TEXT;
    result JSON;
BEGIN
    INSERT INTO offers (address, end_date, offer_date, snapshot_id, production_name, set_name, start_date)
    VALUES (
               offer.address,
               offer.end_date,
               offer.offer_date,
               offer.snapshot_id,
               offer.production_name,
               offer.set_name,
               offer.start_date
           )
    RETURNING id INTO new_offer_id;

    RETURN json_build_object('id', new_offer_id);
EXCEPTION
    WHEN others THEN
        SELECT json_build_object('error', SQLERRM) INTO result;
        RETURN result;
END
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION update_offer(offer offers) RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    UPDATE offers
    SET address = offer.address,
        end_date = offer.end_date,
        offer_date = offer.offer_date,
        production_name = offer.production_name,
        set_name = offer.set_name,
        start_date = offer.start_date
    WHERE id = offer.id;

    RETURN json_build_object('id', offer.id);
EXCEPTION
    WHEN others THEN
        SELECT json_build_object('error', SQLERRM) INTO result;
        RETURN result;
END;
$$ LANGUAGE plpgsql;