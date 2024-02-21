create type snapshot_type as enum ('invoice', 'offer');


CREATE TYPE Summary AS (
    snapshot_type TEXT,
    net_rental_fee TEXT,
    tax integer,
    sales_tax TEXT,
    total TEXT
);


CREATE TYPE Collection AS (
    id TEXT,
    article_id TEXT,
    title TEXT,
    width INTEGER,
    height INTEGER,
    price double precision,
    url TEXT,
    blob TEXT
);

-- https://sqlformat.darold.net/