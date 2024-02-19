CREATE VIEW artworks_available AS
SELECT
    article_id,
    u.url,
    a.name,
    title,
    height,
    width,
    price
FROM
    artworks
    JOIN public.artists a ON artworks.artist_id = a.id
    JOIN public.urls u ON artworks.url_id = u.id
WHERE
    is_available = TRUE;


CREATE VIEW artworks_search AS
SELECT
    artworks.id,
    artworks.title,
    u.url,
    a.name,
    article_id
FROM
    artworks
    JOIN public.artists a ON artworks.artist_id = a.id
    JOIN public.urls u ON artworks.url_id = u.id
WHERE
    is_available = TRUE;


CREATE OR REPLACE FUNCTION create_collection (ids text[])
    RETURNS TABLE (
        id text,
        article_id varchar(255),
        title varchar(255),
        width integer,
        height integer,
        price double precision,
        url varchar(255),
        blob text
        )
AS $$
BEGIN
    RETURN QUERY
        SELECT
            artworks.id,
            artworks.article_id,
            artworks.title,
            artworks.width,
            artworks.height,
            artworks.price,
            u.url
        FROM
            artworks
                JOIN public.urlS u ON artworks.url_id = u.id
        WHERE
            artworks.id = ANY (ids)
          AND is_available = TRUE;
END;
$$
LANGUAGE plpgsql;

CREATE VIEW offers_snapshots AS
SELECT
    o.*,
    s.collection,
    s.snapshot_type,
    s.net_rental_fee,
    s.tax,
    s.sales_tax,
    s.total
FROM
    offers o
    JOIN snapshots s ON o.snapshot_id = s.id;