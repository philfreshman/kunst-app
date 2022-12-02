INSERT INTO Artists (Id, Name, IsArchived)
VALUES
    (1, 'A.Fehrenberg', 0),
    (2, 'A.Schilling', 0),
    (3, 'A.F.Cart', 0),
    (4, 'B. von Hartmann', 0),
    (5, 'C. Hagemann', 0),
    (6, 'D.Haupt', 0),
    (7, 'D.Stern', 0),
    (8, 'Gezett', 0),
    (9, 'H. Klock', 0),
    (10, 'I. Schmid', 0),
    (11, 'L. Valenzuela', 0),
    (12, 'P. Brändle', 0),
    (13, 'R. Rospert', 0),
    (14, 'S. Schnibbe', 0),
    (15, 'V. Weltgen', 0),
    (16, 'W. Heinrich', 0);


INSERT INTO Peaces (Id, Articleid, Title, Worth, ImgUrl, Dimensions, IsAvailable, IsArchived, ArtistId)
VALUES
#     A.Fehrenberg
    (null, 'ANFE017','Hyde Park', 3900.12, null, 'B32 x H24 cm', true, false, 1),

#     Helmut Klock
    (null, 'HEKL001', 'Ort', 1400, null, null, true,  false, 9),
    (null, 'HEKL002', 'Zeit', 1800, null, null, true,  false, 9),
    (null, 'HEKL003', 'R', 1800, null, null, true,  false, 9),
    (null, 'HEKL006', 'Up', 1900, null, null, true,  false, 9),
    (null, 'HEKL007', 'Tango Flowers', 1900, null, null, true,  false, 9),
    (null, 'HEKL008', 'Die drei Möglichkeiten', 1200, null, null, true,  false, 9),
    (null, 'HEKL009', 'I Fiorii I', 800, null, null, true,  false, 9),
    (null, 'HEKL0010', 'I Fiorii II', 800, null, null, true,  false, 9),
    (null, 'HEKL0011', 'I Fiorii III', 800, null, null, true,  false, 9),
    (null, 'HEKL0012', 'T', 1000, null, null, true,  false, 9),
    (null, 'HEKL0013', 'Ort mit langer Muschel', 1500, null, null, true,  false, 9),
    (null, 'HEKL0014', 'Villla R', 2000, null, null, true,  false, 9)
