--  short guid trigger
--  ==================
--  This trigger will generate a short guid for a table with a uuid primary key.


CREATE OR REPLACE FUNCTION short_guid() RETURNS TRIGGER AS $$
DECLARE
    short_id TEXT;
BEGIN
    IF NEW.id IS NULL THEN
        SELECT uuid_generate_v4() INTO NEW.id;
    END IF;
    SELECT encode(NEW.id::bytea, 'base64') INTO short_id;
    short_id := replace(short_id, '/', '_');
    short_id := replace(short_id, '+', '-');
    NEW.id := substring(short_id from 1 for 11);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- CREATE TRIGGER trigger_short_guid BEFORE INSERT ON artists2 FOR EACH ROW EXECUTE PROCEDURE short_guid();
