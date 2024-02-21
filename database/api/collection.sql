/*
========================================
               COLLECTION
========================================
*/



CREATE OR REPLACE FUNCTION get_collection(ids TEXT[]) RETURNS SETOF collection AS $$
BEGIN
    RETURN QUERY
        SELECT artworks.id, artworks.article_id, artworks.title, artworks.width, artworks.height, artworks.price, i.url, i.blob
        FROM artworks
                 JOIN public.images i ON artworks.img_id = i.id
        WHERE artworks.id = ANY(ids) AND is_available = TRUE;
END
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION get_collection_ids_from_snap(snapshot_id text)
    RETURNS json AS $$
DECLARE
    ids text[];
BEGIN
    SELECT array_agg(json_object->>'id') INTO ids
    FROM snapshots, json_array_elements(snapshots.collection::json) AS json_object
    WHERE snapshots.id = snapshot_id;

    RETURN json_build_object('artwork_ids', ids);
END;
$$ LANGUAGE plpgsql;