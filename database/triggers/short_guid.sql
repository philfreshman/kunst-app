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



DO $$
    DECLARE
        table_name text;
        trigger_exists boolean;
    BEGIN
        FOR table_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
            LOOP
                SELECT EXISTS (
                    SELECT 1
                    FROM pg_trigger
                    WHERE tgname = 'trigger_short_guid' AND tgisinternal = false AND tgenabled != 'D' AND tgrelid = (table_name)::regclass
                ) INTO trigger_exists;

                IF NOT trigger_exists THEN
                    EXECUTE format('CREATE TRIGGER trigger_short_guid BEFORE INSERT ON %I FOR EACH ROW EXECUTE PROCEDURE short_guid();', table_name);
                ELSE
                    EXECUTE format('DROP TRIGGER trigger_short_guid ON %I;', table_name);
                    EXECUTE format('CREATE TRIGGER trigger_short_guid BEFORE INSERT ON %I FOR EACH ROW EXECUTE PROCEDURE short_guid();', table_name);
                END IF;
            END LOOP;
    END;
$$;