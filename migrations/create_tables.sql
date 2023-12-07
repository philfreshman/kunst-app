CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    phone varchar(255),
    email varchar(255),
    is_archived bool not null default false
);

CREATE TABLE peaces (
    Id SERIAL PRIMARY KEY,
    ArticleId varchar(255),
    Title varchar(255),
    Width int,
    Height int,
    Worth float,
    IsAvailable bool default true,
    IsArchived bool not null default false,
    ImgUrl varchar(255),
    ArtistId int NOT NULL,
    FOREIGN KEY (ArtistId) references artists (Id)
);

CREATE TABLE collections (
    Id SERIAL PRIMARY KEY,
    PeaceIds JSON,
    IsArchived bool not null default false
);

CREATE TABLE offers (
    Id SERIAL PRIMARY KEY,
    SetName varchar(255),
    Date date,
    Text1 varchar(255),
    Text2 varchar(255),
    IsArchived bool not null default false
);

CREATE TABLE invoices (
    Id SERIAL PRIMARY KEY,
    Date date,
    InvoiceNr varchar(255),
    Description varchar(255),
    Text1 varchar(255),
    Text2 varchar(255),
    IsArchived bool not null default false
);


CREATE TABLE orders (
    Id SERIAL PRIMARY KEY,
    Sender varchar(255),
    Address1 varchar(255),
    Address2 varchar(255),
    Address3 varchar(255),
    ProductionName varchar(255),
    StartDate date,
    EndDate date,
    Tax float,
    IsArchived bool not null default false,
    OfferId int,
    InvoiceId int,
    CollectionId int,
    FOREIGN KEY (OfferId) references offers (Id)  ON DELETE CASCADE,
    FOREIGN KEY (InvoiceId) references invoices (Id)  ON DELETE CASCADE,
    FOREIGN KEY (CollectionId) references collections (Id)  ON DELETE CASCADE
);
