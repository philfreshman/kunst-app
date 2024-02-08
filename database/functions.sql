/*
========================================
               ARTISTS
========================================
*/


CREATE OR REPLACE FUNCTION get_artists() RETURNS SETOF artists AS $$
BEGIN
    RETURN QUERY SELECT * FROM artists ORDER BY internal_id;
END; $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_artist(artist Artists) RETURNS text AS $$
BEGIN
    UPDATE artists
    SET name = artist.name,
        phone = artist.phone,
        email = artist.email
    WHERE id = artist.id;
    RETURN 'Artist updated successfully';
EXCEPTION
    WHEN others THEN
        RETURN 'Error updating artist';
END;
$$ LANGUAGE plpgsql;


/*
========================================
               ARTWORKS
========================================
*/


CREATE OR REPLACE FUNCTION get_artworks() RETURNS SETOF artworks_available AS $$
BEGIN
    RETURN QUERY SELECT * FROM artworks_available;
END
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_artworks_search() RETURNS SETOF artworks_search AS $$
BEGIN
    RETURN QUERY SELECT * FROM artworks_search;
END
$$ LANGUAGE plpgsql;


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


CREATE OR REPLACE FUNCTION create_offer(offer offers) RETURNS JSON AS $$
DECLARE
    new_offer_id TEXT;
    result JSON;
BEGIN
    INSERT INTO offers (address, end_date, offer_date, offer_snapshot_id, production_name, set_name, start_date)
    VALUES (
            offer.address,
            offer.end_date,
            offer.offer_date,
            offer.offer_snapshot_id,
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



/*
========================================
               OFFER SNAPSHOTS
========================================
*/


CREATE OR REPLACE FUNCTION insert_offer_snapshot(collection JSON, summary Summary) RETURNS JSON AS $$
DECLARE
    new_id TEXT;
    result JSON;
BEGIN
    INSERT INTO offer_snapshots (collection, net_rental_fee, tax, sales_tax, total)
    VALUES (collection, summary.net_rental_fee, summary.tax, summary.sales_tax, summary.total)
    RETURNING id INTO new_id;

    SELECT json_build_object('data', new_id) INTO result;

    RETURN result;
EXCEPTION
    WHEN others THEN
        SELECT json_build_object('error', SQLERRM) INTO result;
        RETURN result;
END;
$$ LANGUAGE plpgsql;




