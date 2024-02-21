/*
========================================
              OFFERS_SNAPSHOTS
========================================
*/



CREATE OR REPLACE FUNCTION get_offer_snapshot(offer_id TEXT) RETURNS public.offers_snapshots AS $$
DECLARE
    result offers_snapshots;
BEGIN
    SELECT * INTO result FROM offers_snapshots WHERE id = offer_id;
    RETURN result;
END
$$ LANGUAGE plpgsql;