-- foreign keys
ALTER TABLE Placowka
    DROP FOREIGN KEY Placowka_Okrag;

ALTER TABLE Placowka_Wyniki
    DROP FOREIGN KEY Wyniki_Placowka_Komitet;

ALTER TABLE Placowka_Wyniki
    DROP FOREIGN KEY Wyniki_Placowka_Placowka;

-- tables
DROP TABLE Komitet;

DROP TABLE Okrag;

DROP TABLE Placowka;

DROP TABLE Placowka_Wyniki;