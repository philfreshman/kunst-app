CREATE TABLE artists (
    id TEXT PRIMARY KEY,
    internal_id SMALLINT,
    name TEXT,
    phone TEXT,
    email TEXT,
    is_archived BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE images (
    id TEXT PRIMARY KEY,
    url TEXT,
    blob TEXT
);

CREATE TABLE artworks (
    id TEXT PRIMARY KEY,
    article_id TEXT,
    title TEXT,
    width INTEGER,
    height INTEGER,
    price FLOAT,
    is_available BOOLEAN DEFAULT true,
    is_archived BOOLEAN DEFAULT false,
    img_url TEXT,
    artist_id TEXT,
    img_id TEXT,
    FOREIGN KEY (img_id) REFERENCES images (id),
    FOREIGN KEY (artist_id) REFERENCES artists (id)
);


CREATE TABLE snapshots (
    id TEXT PRIMARY KEY,
    collection JSON NOT NULL,
    snapshot_type snapshot_type,
    net_rental_fee TEXT,
    tax FLOAT4,
    sales_tax TEXT,
    total TEXT,
    is_archived BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE offers (
    id TEXT PRIMARY KEY,
    address TEXT,
    production_name TEXT,
    set_name TEXT,
    start_date DATE,
    end_date DATE,
    offer_date DATE,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    snapshot_id TEXT,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (snapshot_id) REFERENCES snapshots (id) ON DELETE CASCADE
);

CREATE TABLE invoices (
    id TEXT PRIMARY KEY,
    address TEXT,
    production_name TEXT,
    custom_field JSON,
    invoice_number TEXT,
    set_name TEXT,
    start_date DATE,
    end_date DATE,
    invoice_date DATE,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    snapshot_id TEXT,
    created_at TIMESTAMP,
    modified_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (snapshot_id) REFERENCES snapshots (id) ON DELETE CASCADE
);