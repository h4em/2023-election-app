-- tables
-- Table: Komitet
CREATE TABLE Komitet (
    id int  NOT NULL,
    nazwa varchar(128) NOT NULL,
    skrot varchar(16)  NOT NULL,
    CONSTRAINT Komitet_pk PRIMARY KEY (id)
);

-- Table: Okrag
CREATE TABLE Okrag (
    id int  NOT NULL,
    liczba_mandatow int  NOT NULL,
    liczba_mieszkancow int  NOT NULL,
    liczba_wyborcow int  NOT NULL,
    siedziba_OKW varchar(32) NOT NULL,
    CONSTRAINT Okrag_pk PRIMARY KEY (id)
);

-- Table: Placowka
CREATE TABLE Placowka (
    id int  NOT NULL,
    nazwa_adres varchar(256) NOT NULL,
    miasto varchar(32) NOT NULL,
    gmina varchar(32) NOT NULL,
    powiat varchar(32) NOT NULL,
    wojewodztwo varchar(32) NOT NULL,
    okrag_id int  NOT NULL,
    CONSTRAINT Placowka_pk PRIMARY KEY (id)
);

-- Table: Placowka_Wyniki
CREATE TABLE Placowka_Wyniki (
    placowka_id int  NOT NULL,
    komitet_id int  NOT NULL,
    liczba_glosow int  NOT NULL,
    CONSTRAINT Placowka_Wyniki_pk PRIMARY KEY (placowka_id,komitet_id)
);

-- foreign keys
-- Reference: Placowka_Okrag (table: Placowka)
ALTER TABLE Placowka ADD CONSTRAINT Placowka_Okrag FOREIGN KEY Placowka_Okrag (okrag_id)
    REFERENCES Okrag (id);

-- Reference: Wyniki_Placowka_Komitet (table: Placowka_Wyniki)
ALTER TABLE Placowka_Wyniki ADD CONSTRAINT Wyniki_Placowka_Komitet FOREIGN KEY Wyniki_Placowka_Komitet (komitet_id)
    REFERENCES Komitet (id);

-- Reference: Wyniki_Placowka_Placowka (table: Placowka_Wyniki)
ALTER TABLE Placowka_Wyniki ADD CONSTRAINT Wyniki_Placowka_Placowka FOREIGN KEY Wyniki_Placowka_Placowka (placowka_id)
    REFERENCES Placowka (id);