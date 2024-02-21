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