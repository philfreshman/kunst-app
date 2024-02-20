CREATE TYPE Summary AS (
    snapshot_type text,
    net_rental_fee text,
    tax integer,
    sales_tax text,
    total text
);

CREATE TYPE Collection AS (
    id text,
    article_id varchar ( 255),
    title VARCHAR(255),
    width INTEGER,
    height INTEGER,
    price double precision,
    url VARCHAR(255),
    blob TEXT
);

-- https://sqlformat.darold.net/