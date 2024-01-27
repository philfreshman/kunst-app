CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    is_archived BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE artworks (
    id SERIAL PRIMARY KEY,
    article_id VARCHAR(255),
    title VARCHAR(255),
    width INTEGER,
    height INTEGER,
    price FLOAT,
    is_available BOOLEAN DEFAULT true,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    img_url VARCHAR(255),
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists (id)
);

CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    artwork_ids JSON,
    is_archived BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    set_name VARCHAR(255),
    date DATE,
    text1 VARCHAR(255),
    text2 VARCHAR(255),
    is_archived BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    date DATE,
    invoice_nr VARCHAR(255),
    description VARCHAR(255),
    text1 VARCHAR(255),
    text2 VARCHAR(255),
    is_archived BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    sender VARCHAR(255),
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    address3 VARCHAR(255),
    production_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    tax FLOAT,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    offer_id INTEGER,
    invoice_id INTEGER,
    collection_id INTEGER,
    FOREIGN KEY (offer_id) REFERENCES offers (id) ON DELETE CASCADE,
    FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE,
    FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
);
