ALTER TABLE Committee
    DROP FOREIGN KEY Committee_City;

ALTER TABLE Committee
    DROP FOREIGN KEY Committee_Gmina;

ALTER TABLE Committee
    DROP FOREIGN KEY Committee_Powiat;

ALTER TABLE Committee
    DROP FOREIGN KEY Committee_Wojewodztwo;

ALTER TABLE Results
    DROP FOREIGN KEY Results_Committee;

ALTER TABLE Results
    DROP FOREIGN KEY Results_Party;

DROP TABLE City;

DROP TABLE Committee;

DROP TABLE Gmina;

DROP TABLE Party;

DROP TABLE Powiat;

DROP TABLE Results;

DROP TABLE Wojewodztwo;