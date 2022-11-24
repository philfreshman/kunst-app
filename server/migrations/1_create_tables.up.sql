CREATE TABLE Artists (
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(255),
    PRIMARY KEY (Id)
);

CREATE TABLE Peaces (
    Id int NOT NULL AUTO_INCREMENT,
    Title varchar(255),
    Description varchar(255),
    IsAvailable bool,
    ArtistId int NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (ArtistId) references Artists (Id)  ON DELETE CASCADE
);

CREATE TABLE PeaceCollections (
    Id int NOT NULL AUTO_INCREMENT,
    Collection JSON,
    PRIMARY KEY (Id)
);

CREATE TABLE Offers (
   Id int NOT NULL AUTO_INCREMENT,
   Title varchar(255),
   OfferDate date,
   Text1 varchar(255),
   Text2 varchar(255),
   PRIMARY KEY (Id)
);

CREATE TABLE Invoices (
    Id int NOT NULL AUTO_INCREMENT,
    InvoiceDate date,
    InvoiceNr varchar(255),
    Description varchar(255),
    Text1 varchar(255),
    Text2 varchar(255),
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
    OfferId int,
    InvoiceId int,
    PeaceCollectionId int,
    PRIMARY KEY (Id),
    FOREIGN KEY (OfferId) references Offers (Id)  ON DELETE CASCADE,
    FOREIGN KEY (InvoiceId) references Invoices (Id)  ON DELETE CASCADE,
    FOREIGN KEY (PeaceCollectionId) references PeaceCollections (Id)  ON DELETE CASCADE
);
