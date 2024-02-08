CREATE TABLE artists (
    id TEXT PRIMARY KEY,
    internal_id SMALLINT,
    name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    is_archived BOOLEAN NOT NULL DEFAULT false
);


CREATE TABLE urls (
    id TEXT PRIMARY KEY,
    url VARCHAR(255)
);


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


CREATE TABLE offer_snapshots (
    id TEXT PRIMARY KEY,
    collection JSON NOT NULL,
    net_rental_fee TEXT,
    tax FLOAT4,
    sales_tax TEXT,
    total TEXT,
    is_archived BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE offers (
    id TEXT PRIMARY KEY,
    address VARCHAR(255),
    production_name VARCHAR(255),
    set_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    offer_date DATE,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    offer_snapshot_id TEXT,
    FOREIGN KEY (offer_snapshot_id) REFERENCES offer_snapshots (id) ON DELETE CASCADE
);


CREATE TABLE invoices (
    id TEXT PRIMARY KEY,
    date DATE,
    invoice_nr VARCHAR(255),
    description VARCHAR(255),
    text1 VARCHAR(255),
    text2 VARCHAR(255),
    is_archived BOOLEAN NOT NULL DEFAULT false
);


