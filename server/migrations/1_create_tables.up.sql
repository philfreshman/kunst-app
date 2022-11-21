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
   PeaceCollectionId int,
   PRIMARY KEY (Id),
   FOREIGN KEY (PeaceCollectionId) references PeaceCollections(Id)
);

CREATE TABLE Invoices (
    Id int NOT NULL AUTO_INCREMENT,
    Title varchar(255),
    PeaceCollectionId int,
    PRIMARY KEY (Id),
    FOREIGN KEY (PeaceCollectionId) references PeaceCollections(Id)
);


CREATE TABLE Orders (
    Id int AUTO_INCREMENT,
    Title varchar(255),
    Description varchar(255),
    PeaceCollectionId int,
    OfferId int,
    InvoiceId int,
    PRIMARY KEY (Id),
    FOREIGN KEY (PeaceCollectionId) references PeaceCollections (Id)  ON DELETE CASCADE,
    FOREIGN KEY (OfferId) references Offers (Id)  ON DELETE CASCADE,
FOREIGN KEY (InvoiceId) references Invoices (Id)  ON DELETE CASCADE
);
