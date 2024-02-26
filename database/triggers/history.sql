
-- Function to set created_at and modified_at
CREATE OR REPLACE FUNCTION set_created_timestamp()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = NOW();
    NEW.modified_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to set modified_at
CREATE OR REPLACE FUNCTION set_modified_timestamp()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to set deleted_at when is_archived is set to TRUE
CREATE OR REPLACE FUNCTION set_deleted_timestamp()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_archived = TRUE THEN
        NEW.deleted_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for offers table
CREATE TRIGGER set_created_timestamps_before_create_offer
    BEFORE INSERT ON offers
    FOR EACH ROW
EXECUTE PROCEDURE set_created_timestamp();

CREATE TRIGGER set_modified_timestamp_before_update_offer
    BEFORE UPDATE ON offers
    FOR EACH ROW
EXECUTE PROCEDURE set_modified_timestamp();

CREATE TRIGGER set_deleted_at_on_archive_after_update_offers
    AFTER UPDATE OF is_archived ON offers
    FOR EACH ROW
    WHEN (OLD.is_archived IS DISTINCT FROM NEW.is_archived)
EXECUTE PROCEDURE set_deleted_timestamp();


-- Triggers for invoices table
CREATE TRIGGER set_created_timestamps_before_create_invoice
    BEFORE INSERT ON invoices
    FOR EACH ROW
EXECUTE PROCEDURE set_created_timestamp();

CREATE TRIGGER set_modified_timestamp_before_update_invoice
    BEFORE UPDATE ON invoices
    FOR EACH ROW
EXECUTE PROCEDURE set_modified_timestamp();

CREATE TRIGGER set_deleted_at_on_archive_after_update_invoices
    AFTER UPDATE OF is_archived ON invoices
    FOR EACH ROW
    WHEN (OLD.is_archived IS DISTINCT FROM NEW.is_archived)
EXECUTE PROCEDURE set_deleted_timestamp();