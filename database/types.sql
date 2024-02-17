CREATE TYPE Summary AS (
    snapshot_type  TEXT,
    net_rental_fee TEXT,
    tax            INTEGER,
    sales_tax      TEXT,
    total          TEXT
);


CREATE TYPE Collection AS (
    id       TEXT,
    article_id VARCHAR(255),
    title    VARCHAR(255),
    width    INTEGER,
    height   INTEGER,
    price    double precision,
    url      VARCHAR(255),
    blob     TEXT
);