-- Table: City
CREATE TABLE City (
    id int  NOT NULL,
    name varchar(64)  NOT NULL,
    CONSTRAINT City_pk PRIMARY KEY (id)
);

-- Table: Committee
CREATE TABLE Committee (
    id int  NOT NULL,
    name varchar(256)  NOT NULL,
    address varchar(256)  NOT NULL,
    post_code varchar(6)  NOT NULL,
    city_id int  NOT NULL,
    gmina_id int  NULL,
    powiat_id int  NULL,
    wojewodztwo_id int  NOT NULL,
    CONSTRAINT Committee_pk PRIMARY KEY (id)
);

-- Table: Gmina
CREATE TABLE Gmina (
    id int  NOT NULL,
    name varchar(64)  NOT NULL,
    CONSTRAINT Gmina_pk PRIMARY KEY (id)
);

-- Table: Party
CREATE TABLE Party (
    id int  NOT NULL,
    name varchar(128)  NOT NULL,
    shortname varchar(16)  NOT NULL,
    color varchar(32) NOT NULL,
    CONSTRAINT Party_pk PRIMARY KEY (id)
);

-- Table: Powiat
CREATE TABLE Powiat (
    id int  NOT NULL,
    name varchar(64)  NOT NULL,
    CONSTRAINT Powiat_pk PRIMARY KEY (id)
);

-- Table: Results
CREATE TABLE Results (
    committee_id int  NOT NULL,
    party_id int  NOT NULL,
    num_of_votes int  NOT NULL,
    CONSTRAINT Results_pk PRIMARY KEY (committee_id,party_id)
);

-- Table: Wojewodztwo
CREATE TABLE Wojewodztwo (
    id int  NOT NULL,
    name varchar(64)  NOT NULL,
    CONSTRAINT Wojewodztwo_pk PRIMARY KEY (id)
);

-- Reference: Committee_City (table: Committee)
ALTER TABLE Committee ADD CONSTRAINT Committee_City FOREIGN KEY Committee_City (city_id)
    REFERENCES City (id);

-- Reference: Committee_Gmina (table: Committee)
ALTER TABLE Committee ADD CONSTRAINT Committee_Gmina FOREIGN KEY Committee_Gmina (gmina_id)
    REFERENCES Gmina (id);

-- Reference: Committee_Powiat (table: Committee)
ALTER TABLE Committee ADD CONSTRAINT Committee_Powiat FOREIGN KEY Committee_Powiat (powiat_id)
    REFERENCES Powiat (id);

-- Reference: Committee_Wojewodztwo (table: Committee)
ALTER TABLE Committee ADD CONSTRAINT Committee_Wojewodztwo FOREIGN KEY Committee_Wojewodztwo (wojewodztwo_id)
    REFERENCES Wojewodztwo (id);

-- Reference: Results_Committee (table: Results)
ALTER TABLE Results ADD CONSTRAINT Results_Committee FOREIGN KEY Results_Committee (committee_id)
    REFERENCES Committee (id);

-- Reference: Results_Party (table: Results)
ALTER TABLE Results ADD CONSTRAINT Results_Party FOREIGN KEY Results_Party (party_id)
    REFERENCES Party (id);