CREATE TABLE artists (
    id TEXT PRIMARY KEY,
    internal_id SMALLINT,
    name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    is_archived BOOLEAN NOT NULL DEFAULT false
);

CREATE TRIGGER trigger_short_guid BEFORE INSERT ON artists FOR EACH ROW EXECUTE PROCEDURE short_guid();



CREATE TABLE urls (
    id TEXT PRIMARY KEY,
    url VARCHAR(255)
);
CREATE TRIGGER trigger_short_guid BEFORE INSERT ON urls FOR EACH ROW EXECUTE PROCEDURE short_guid();



CREATE TABLE artworks (
    id TEXT PRIMARY KEY,
    article_id VARCHAR(255),
    title VARCHAR(255),
    width INTEGER,
    height INTEGER,
    price FLOAT,
    is_available BOOLEAN DEFAULT true,
    is_archived BOOLEAN DEFAULT false,
    img_url VARCHAR(255),
    artist_id TEXT,
    url_id TEXT,
    FOREIGN KEY (url_id) REFERENCES urls (id),
    FOREIGN KEY (artist_id) REFERENCES artists (id)
);
CREATE TRIGGER trigger_short_guid BEFORE INSERT ON artworks FOR EACH ROW EXECUTE PROCEDURE short_guid();


CREATE VIEW artworks_available AS
SELECT article_id, u.url, a.name, title, height, width, price
FROM artworks
    JOIN public.artists a ON artworks.artist_id = a.id
    JOIN public.urls u ON artworks.url_id = u.id
WHERE is_available = true;




CREATE TABLE collections (
    id TEXT PRIMARY KEY,
    artwork_collection JSON,
    is_archived BOOLEAN NOT NULL DEFAULT false
);
CREATE TRIGGER trigger_short_guid BEFORE INSERT ON collections FOR EACH ROW EXECUTE PROCEDURE short_guid();



CREATE TABLE invoices (
    id TEXT PRIMARY KEY,
    date DATE,
    invoice_nr VARCHAR(255),
    description VARCHAR(255),
    text1 VARCHAR(255),
    text2 VARCHAR(255),
    is_archived BOOLEAN NOT NULL DEFAULT false
);
CREATE TRIGGER trigger_short_guid BEFORE INSERT ON invoices FOR EACH ROW EXECUTE PROCEDURE short_guid();



CREATE TABLE offers (
    id TEXT PRIMARY KEY,
    offer_date DATE,
    address VARCHAR(255),
    production_name VARCHAR(255),
    set_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    collection_id TEXT,
    FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
);
CREATE TRIGGER trigger_short_guid BEFORE INSERT ON offers FOR EACH ROW EXECUTE PROCEDURE short_guid();




-- DO
-- $$
--     DECLARE
--         table_name text;
--     BEGIN
--         FOR table_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
--             LOOP
--                 EXECUTE format('CREATE TRIGGER trigger_short_guid BEFORE INSERT ON %I FOR EACH ROW EXECUTE PROCEDURE short_guid();', table_name);
--             END LOOP;
--     END;
-- $$
