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
    is_archived BOOLEAN DEFAULT false,
    img_url VARCHAR(255),
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists (id)
);

CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    artwork_collection JSON,
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

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    offer_date DATE,
    address VARCHAR(255),
    production_name VARCHAR(255),
    set_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    collection_id INTEGER,
    FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE
);
