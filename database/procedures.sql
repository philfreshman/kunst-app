CREATE OR REPLACE PROCEDURE copy_artwork_urls()
    LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO urls (url)
    SELECT img_url FROM artworks;
END;
$$;


CALL copy_artwork_urls();



CREATE OR REPLACE PROCEDURE populate_artwork_urls()
    LANGUAGE plpgsql
AS $$
DECLARE
    artwork_row artworks%ROWTYPE;
    new_url_id UUID;
BEGIN
    FOR artwork_row IN SELECT * FROM artworks
        LOOP
            INSERT INTO urls (url) VALUES (artwork_row.img_url)
            RETURNING id INTO new_url_id;

            INSERT INTO artwork_url (artwork_id, url_id) VALUES (artwork_row.id, new_url_id);
        END LOOP;
END;
$$;

CALL populate_artwork_urls();


CREATE OR REPLACE PROCEDURE copy_prices()
    LANGUAGE plpgsql
AS $$
DECLARE
    artwork_row record;
BEGIN
    FOR artwork_row IN SELECT * FROM artworks2
        LOOP
            UPDATE artworks
            SET price = artwork_row.price
            WHERE article_id = artwork_row.article_id;
        END LOOP;
END;
$$;

CALL copy_prices();
