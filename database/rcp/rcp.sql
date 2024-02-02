CREATE OR REPLACE FUNCTION get_artworks_search_materialized() RETURNS SETOF artworks_search_materialized AS $$
BEGIN
    RETURN QUERY SELECT * FROM artworks_search_materialized;
END; $$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_artists() RETURNS SETOF artists AS $$
BEGIN
    RETURN QUERY SELECT * FROM artists;
END; $$ LANGUAGE plpgsql;


