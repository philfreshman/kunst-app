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
    (16, 'W. Heinrich', 0),
    (17, 'KINDEREBILDER', 0);

# (null, 'xxxxxx','xxxxxx', 0, 0, 0, true, false, 'IMGURL', 1),
INSERT INTO Peaces (Id, Articleid, Title, Width, Height, Worth, IsAvailable, IsArchived, ImgUrl, ArtistId)
VALUES

    #   A.Fehrenberg
    (null, 'ANFE001','HOCHLAND', 120, 50, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE001_Hochland-800x327.jpg', 1),
    (null, 'ANFE004','BIRKE', 150, 50, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE004_Birke-800x263.jpg', 1),
    (null, 'ANFE005','GESUNDBRUNNEN', 160, 120, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE005_Gesundbrunnen-800x604.jpg', 1),
    (null, 'ANFE006','BOOK, FALLING DOWN', 150, 120, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE006_Book-falling-down-800x629.jpg', 1),
    (null, 'ANFE007','EISBRUCH', 100, 90, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE007_Eisbruch-800x731.jpg', 1),
    (null, 'ANFE008','YUNAN 2', 100, 120, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE008_Yunan-2-800x949.jpg', 1),
    (null, 'ANFE010','CAP ARCONA 2', 150, 120, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE010_Cap-Arcona-2-800x645.jpg', 1),
    (null, 'ANFE011','ZWISCHEN TAG UND NACHT', 160, 110, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE011_Zwischen-Tag-und-Nacht-800x552.jpg', 1),
    (null, 'ANFE012','ÜBER DER GRENZE', 100, 90, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE013_Ueber-der-Grenze-800x734.jpg', 1),
    (null, 'ANFE014','HALLING', 100, 80, 3900, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE014_Halling-800x637.jpg', 1),
    (null, 'ANFE014','HALLING', 100, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE014_Halling-800x637.jpg', 1),
    (null, 'ANFE015','BRANDENBURG', 32, 24, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE015_Brandenburg-800x590.jpg', 1),
    (null, 'ANFE016','WINTERLANDSCHAFT', 32, 24, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE016_Winterlandschaft-800x585.jpg', 1),
    (null, 'ANFE017','HYDE PARK', 32, 24, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/02/ANFE017_Hyde-Park-800x587.jpg', 1),

    #   A.SCHILLING
    (null, 'ANSC001','POLLENFLUG IN VIOLETT', 120, 120, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANSC002_Pollenflug-in-violett-800x800.jpg', 2),
    (null, 'ANSC002','POLLENFLUG IN ROSA', 120, 120, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANSC001_Pollenflug-in-rosa-800x800.jpg', 2),
    (null, 'ANSC003','BIRKEN', 40, 60, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANSC003_Birken-800x1139.jpg', 2),

    #   I.SCHMID
    (null, 'INSC001','RIESENRAD', 100, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/08/riesenrad-800x660.jpg', 10),
    (null, 'INSC002','KLASSIKER', 100, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/08/klassiker-800x660.jpg', 10),
    (null, 'INSC003','DIE KRAKE', 100, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/08/die_krake-800x660.jpg', 10),
    (null, 'INSC004','HAPPY TRAVELLER', 100, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/08/traveller-800x660.jpg', 10),

    #   A.F. CART
    (null, 'ANCA002','OHNE TITEL', 60, 60, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA002_Ohne-Titel.jpg', 3),
    (null, 'ANCA003','GLÜCK TÄGLICH SUCHEN', 60, 90, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA003_Glueck-taeglich-suchen.jpg', 3),
    (null, 'ANCA006','NOVEMBERLANDSCHAFT I', 40, 40, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA006_Novemberlandschaft-I-800x783.jpg', 3),
    (null, 'ANCA007','NOVEMBERLANDSCHAFT II', 40, 40, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA007_Novemberlandschaft-II-800x786.jpg', 3),
    (null, 'ANCA009','SUCHE NACH DEM STERNENHIMMEL', 60, 90, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA009_Suche-nach-dem-Sternenhimmel.jpg', 3),
    (null, 'ANCA010','WEITZGRUND', 80, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA010_Weitzgrund-800x800.jpg', 3),
    (null, 'ANCA012','TRANSITION II', 100, 100, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/anca012_transition-ii-800x800.jpg', 3),
    (null, 'ANCA013','TRANSITION III', 100, 100, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA013_Transition-III-800x800.jpg', 3),
    (null, 'ANCA014','VALAIS-EN-HIVER', 100, 100, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA014_Valais-en-hiver-800x815.jpg', 3),
    (null, 'ANCA016','FLÄMINGWALD', 60, 60, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA016_Flaemingwald-1-800x791.jpeg', 3),
    (null, 'ANCA017','OHNE TITEL', 60, 90, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA017_Ohne-Titel.jpg', 3),
    (null, 'ANCA018','DAS GEHEIMNIS DES GELBEN VOGELS', 80, 100, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA018_Das-Geheimnis-des-gelben-Vogels-800x1009.jpg', 3),
    (null, 'ANCA019','THY JÜTLAND', 80, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/ANCA019_Thy-Juetland-800x796.jpg', 3),
    (null, 'ANCA020','FRAU AUF BETT', 50, 70, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/12/ANCA020_Frau_auf_Bett-800x1113.jpg', 3),
    (null, 'ANCA021','PORTRAIT', 50, 70, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/12/ANCA021_Portrait-800x1106.jpg', 3),
    (null, 'ANCA023','AKT IN BLAU I', 40, 50, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/12/ANCA023_Akt_in_blau_I-800x990.jpg', 3),
    (null, 'ANCA024','AKT IN BLAU II', 40, 50, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/12/ANCA024_Akt_in_blau_II-800x993.jpg', 3),
    (null, 'ANCA025','AKT LIEGEND', 40, 50, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/12/ANCA025_Akt_liegend-800x976.jpg', 3),
    (null, 'ANCA026','NATURELINES I', 140, 120, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/04/ANCA026_Naturelines-I-800x686.jpg', 3),
    (null, 'ANCA028','NATURELINES III', 140, 120, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2018/04/ANCA028_Naturelines-III-800x679.jpg', 3),
    (null, 'ANCA029','AM WASSER', 100, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2020/09/anca029_am_wasser-800x629.jpg', 3),
    (null, 'ANCA030','SOMMER', 100, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2020/09/anca030_sommer-800x659.jpg', 3),
    (null, 'ANCA031','AM WASSER II', 100, 80, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2020/09/anca031_am-wasser-ii-800x631.jpg', 3),
    (null, 'ANCA032','NEBEL IM WIESENBURGER PARK', 100, 100, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2020/09/anca032_morgennebel-im-wiesenburger-park-800x780.jpg', 3),
    (null, 'ANCA033','OHNE TITEL', 60, 60, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2020/09/anca033_ohne-titel-800x801.jpg', 3),
    (null, 'ANCA036','BIRKENWALD', 50, 40, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2021/09/anca036_birkenwald-800x1021.jpg', 3),
    (null, 'ANCA038','IM FLÄMING II', 60, 60, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2021/09/anca038_im-flacc88ming-ii-800x782.jpg', 3),
    (null, 'ANCA039','IM FLÄMING III', 60, 60, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2021/09/anca039_im-flacc88ming-iii-800x816.jpg', 3),

    #   Helmut Klock
    (null, 'HEKL001', 'Ort', 115, 115, 1400, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL001_Ort-800x796.jpg',  9),
    (null, 'HEKL002', 'Zeit', 140, 140, 1800, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL002_Zeit-800x809.jpg',9),
    (null, 'HEKL003', 'R', 130, 140, 1800, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL003_R-800x866.jpg',9),
    (null, 'HEKL004', 'TRAUMZEIT I', 140, 140, 0, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL004_Traumzeit-I-800x808.jpg',9),
    (null, 'HEKL005', 'TRAUMZEIT II', 140, 140, 0, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL005_Traumzeit-II-800x808.jpg',9),
    (null, 'HEKL006', 'Up', 110, 200, 1900, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL006_Up-800x1449.jpg',9),
    (null, 'HEKL007', 'Tango Flowers',  200, 110, 1900,true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL007_Tango-Flowers-800x1462.jpg', 9),
    (null, 'HEKL008', 'Die drei Möglichkeiten', 95, 105, 1200, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL008_Die-drei-Moeglichkeiten-800x891.jpg', 9),
    (null, 'HEKL009', 'I Fiorii I', 65, 80, 800, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL009_i-fiori-I-800x988.jpg', 9),
    (null, 'HEKL010', 'I Fiorii II', 65, 80, 800, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL010_i-fiori-II-800x988.jpg', 9),
    (null, 'HEKL011', 'I Fiorii III', 65, 80, 800, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL011_i-fiori-III-800x988.jpg', 9),
    (null, 'HEKL012', 'T', 145, 75, 1000, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL012_T-800x1598.jpg', 9),
    (null, 'HEKL013', 'ORT MIT LANGER MUSCHEL', 95, 105, 1500, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL013_Ort-mit-langer-Muschel_an-800x891.jpg', 9),
    (null, 'HEKL014', 'Villla R', 105, 125, 2000, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL014_Villa-R_an-800x956.jpg', 9),
    (null, 'HEKL015', 'IN DER ZEIT UNTERWEGS', 43, 53, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL015_in-der-Zeit-unterwegs-800x996.jpg', 9),
    (null, 'HEKL016', 'BLAUE STADT', 43, 53, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL016_Blaue-Stadt-800x995.jpg', 9),
    (null, 'HEKL017', 'MY OCEAN', 43, 53, 0, true,  false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/07/HEKL017_my-ocean-800x988.jpg', 9),

    #   Kinderbilder
    (null, 'KIBI001','SCHMETTERLING', 44, 34, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/08/KIBI_001-800x615.jpg', 17),
    (null, 'KIBI002','UHU', 24, 33, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/08/KIBI_002-800x1098.jpg', 17),
    (null, 'KIBI003','WOLF', 23, 32, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/08/KIBI_003-800x1103.jpg', 17),
    (null, 'KIBI004','ELCH', 40, 30, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/12/Elch-800x602.jpg', 17),
    (null, 'KIBI005','BÄUME IM HERBST', 40, 30, 0, true, false, 'https://www.kunstfuerfilm.de/wp-content/uploads/2017/12/Baume-800x608.jpg', 17);



