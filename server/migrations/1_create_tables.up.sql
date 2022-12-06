CREATE TABLE Artists (
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(255),
    IsArchived bool not null default 0,
    PRIMARY KEY (Id)
);

CREATE TABLE Peaces (
    Id int NOT NULL AUTO_INCREMENT,
    ArticleId varchar(255),
    Title varchar(255),
    Width int,
    Height int,
    Worth float,
    IsAvailable bool default 1,
    IsArchived bool not null default 0,
    ImgUrl varchar(255),
    ArtistId int NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (ArtistId) references Artists (Id)
);

CREATE TABLE Collections (
    Id int NOT NULL AUTO_INCREMENT,
    PeaceIds JSON,
    IsArchived bool not null default 0,
    PRIMARY KEY (Id)
);

CREATE TABLE Offers (
   Id int NOT NULL AUTO_INCREMENT,
   SetName varchar(255),
   OfferDate date,
   Text1 varchar(255),
   Text2 varchar(255),
   IsArchived bool not null default 0,
   PRIMARY KEY (Id)
);

CREATE TABLE Invoices (
    Id int NOT NULL AUTO_INCREMENT,
    InvoiceDate date,
    InvoiceNr varchar(255),
    Description varchar(255),
    Text1 varchar(255),
    Text2 varchar(255),
    IsArchived bool not null default 0,
    PRIMARY KEY (Id)
);


CREATE TABLE Orders (
    Id int AUTO_INCREMENT,
    Sender varchar(255),
    Address1 varchar(255),
    Address2 varchar(255),
    Address3 varchar(255),
    ProductionName varchar(255),
    StartDate date,
    EndDate date,
    Tax float,
    IsArchived bool not null default 0,
    OfferId int,
    InvoiceId int,
    CollectionId int,
    PRIMARY KEY (Id),
    FOREIGN KEY (OfferId) references Offers (Id)  ON DELETE CASCADE,
    FOREIGN KEY (InvoiceId) references Invoices (Id)  ON DELETE CASCADE,
    FOREIGN KEY (CollectionId) references Collections (Id)  ON DELETE CASCADE
);
