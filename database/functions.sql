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



CREATE OR REPLACE FUNCTION insert_offer(offer offers) RETURNS JSON AS $$
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



/*
========================================
              SNAPSHOTS
========================================
*/


-- CREATE OR REPLACE FUNCTION get_snapshot(snapshot_id text) RETURNS SETOF snapshots AS $$
-- BEGIN
--     RETURN QUERY SELECT * FROM snapshots WHERE id = snapshot_id;
-- END
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_snapshot(snapshot_id text) RETURNS snapshots AS $$
DECLARE
    result snapshots;
BEGIN
    SELECT * INTO result FROM snapshots WHERE id = snapshot_id LIMIT 1;
    RETURN result;
END
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION insert_snapshot(collection JSON, summary Summary) RETURNS JSON AS $$
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


/*
========================================
               COLLECTION
========================================
*/



CREATE OR REPLACE FUNCTION get_collection(ids TEXT[]) RETURNS SETOF collection AS $$
BEGIN
    RETURN QUERY
        SELECT artworks.id, artworks.article_id, artworks.title, artworks.width, artworks.height, artworks.price, u.url
        FROM artworks
                 JOIN public.urls u ON artworks.url_id = u.id
        WHERE artworks.id = ANY(ids) AND is_available = TRUE;
END
$$ LANGUAGE plpgsql;
