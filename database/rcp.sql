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
