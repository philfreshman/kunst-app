CREATE VIEW artworks_available AS
SELECT
    article_id,
    i.url,
    a.name,
    title,
    height,
    width,
    price
FROM
    artworks
    JOIN public.artists a ON artworks.artist_id = a.id
    JOIN public.images i ON artworks.img_id = i.id
WHERE
    is_available = TRUE;



CREATE VIEW artworks_search AS
SELECT
    artworks.id,
    artworks.title,
    i.url,
    a.name,
    article_id
FROM
    artworks
    JOIN public.artists a ON artworks.artist_id = a.id
    JOIN public.images i ON artworks.img_id = i.id
WHERE
    is_available = TRUE;


CREATE OR REPLACE FUNCTION create_collection (ids text[])
    RETURNS TABLE (
        id TEXT,
        article_id TEXT,
        title TEXT,
        width INTEGER,
        height INTEGER,
        price DOUBLE PRECISION,
        url TEXT,
        blob TEXT
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
            i.url
        FROM
            artworks
                JOIN public.images i ON artworks.img_id = i.id
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

CREATE VIEW invoices_snapshots AS
SELECT
    i.*,
    s.collection,
    s.snapshot_type,
    s.net_rental_fee,
    s.tax,
    s.sales_tax,
    s.total
FROM
    invoices i
        JOIN snapshots s ON i.snapshot_id = s.id;