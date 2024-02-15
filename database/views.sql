CREATE VIEW artworks_available AS
SELECT article_id, u.url, a.name, title, height, width, price
FROM artworks
         JOIN public.artists a ON artworks.artist_id = a.id
         JOIN public.urls u ON artworks.url_id = u.id
WHERE is_available = true;



CREATE VIEW artworks_search AS
SELECT artworks.id, artworks.title, u.url, a.name, article_id
FROM artworks
         JOIN public.artists a ON artworks.artist_id = a.id
         JOIN public.urls u ON artworks.url_id = u.id
WHERE is_available = true;


-- CREATE OR REPLACE FUNCTION create_collection(artworkIds TEXT[])
--     RETURNS TABLE (
--                       id INT,
--                         article_id TEXT,
--                       title TEXT,
--                         width INT,
--                         height INT,
--                         price INT,
--                       url TEXT
--                   ) AS $$
-- BEGIN
--     RETURN QUERY
--         SELECT artworks.id, artworks.title, u.url, article_id, width, height, price
--         FROM artworks
--                  JOIN public.urls u ON artworks.url_id = u.id
--         WHERE artworks.id = ANY(artworkIds) AND is_available = true;
-- END; $$
--     LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION create_collection(ids TEXT[])
    RETURNS TABLE (
                      id TEXT,
                      article_id VARCHAR(255),
                      title VARCHAR(255),
                      width INTEGER,
                      height INTEGER,
                      price DOUBLE PRECISION,
                      url VARCHAR(255)
                  ) AS $$
BEGIN
    RETURN QUERY
        SELECT artworks.id, artworks.article_id, artworks.title, artworks.width, artworks.height, artworks.price, u.url
        FROM artworks
                 JOIN public.urlS u ON artworks.url_id = u.id
        WHERE artworks.id = ANY(ids) AND is_available = true;
END; $$
    LANGUAGE plpgsql;


CREATE VIEW offers_snapshots AS
SELECT o.*, s.collection, s.snapshot_type, s.net_rental_fee, s.tax, s.sales_tax, s.total
FROM offers o
JOIN snapshots s ON o.snapshot_id = s.id;


