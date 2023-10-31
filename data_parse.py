import pandas as pd
import numpy as np

#NOTE: excluded data from abroad, it was messing up the file structure

df = pd.read_csv('data\obwody_glosowania_utf8.csv', delimiter='\t', encoding='utf-8', header=0)
df = df.drop(['typ_obwodu', 'typ_obszaru'], axis=1)
print(df)

#Grouping by 'siedziba', summing 'mieszkancy' and 'wyborcy'
placowka_df = df.groupby('siedziba').agg({'mieszkancy': 'sum', 'wyborcy': 'sum'}).reset_index()
placowka_df.sort_values(by='siedziba', ascending=True, inplace=True)
placowka_df.rename(columns={'siedziba': 'placowka'}, inplace=True)
placowka_df['id'] = placowka_df.index + 1   
placowka_df = placowka_df[['id', 'placowka', 'mieszkancy', 'wyborcy']] 
print(placowka_df)

#Creating 'Komitet' table manually
komitet_table_data =  {
    'id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'nazwa': [
        'Bezpartyjni Samorządowcy',
        'Trzecia Droga Polska 2050 Szymona Hołowni - Polskie Stronnictwo Ludowe',
        'Nowa Lewica',
        'Prawo i Sprawiedliwość',
        'Konfederacja Wolność i Niepodległość',
        'Koalicja Obywatelska',
        'Polska Jest Jedna',
        'Ruch Dobrobytu i Pokoju',
        'Normalny Kraj',
        'Antypartia',
        'Ruch Naprawy Polski',
        'Mniejszość Niemiecka'
    ],
    'skrot': [
        'BS',
        '3D', 
        'NL',
        'PiS',
        'Konfederacja',
        'KO',
        'PJJ',
        'DiP',
        'NK',
        'AP',
        'RNP',
        'MN'
    ]
}

komitet_table_df = pd.DataFrame(komitet_table_data)

#Creating 'Gmina' table by getting unique gminy names and id's from the set
gminy_table_df = df.drop_duplicates(subset=['gmina'])
gminy_table_df = gminy_table_df.drop(['nr_komisji', 'siedziba', 'powiat', 'wojewodztwo', 'okrag', 'mieszkancy', 'wyborcy'], axis=1)
gminy_table_df.reset_index(inplace=True, drop=True)
gminy_table_df.rename(columns={'teryt_gminy': 'id', 'gmina': 'nazwa'}, inplace=True)

#Creating 'Powiat' table
powiat_table_df = df.drop_duplicates(subset='powiat')
powiat_table_df = powiat_table_df.drop(['nr_komisji', 'siedziba', 'teryt_gminy', 'gmina', 'wojewodztwo', 'okrag', 'mieszkancy', 'wyborcy'], axis=1)
powiat_table_df.reset_index(inplace=True, drop=True)
powiat_table_df.rename(columns={'powiat': 'nazwa'}, inplace=True)

powiat_table_df['id'] = powiat_table_df.index + 1
powiat_table_df = powiat_table_df[['id', 'nazwa']]

#Creating table 'Wojewodztwo'
woj_table_df = df.drop_duplicates(subset='wojewodztwo')
woj_table_df = woj_table_df.drop(['nr_komisji', 'siedziba', 'teryt_gminy', 'gmina', 'powiat', 'okrag', 'mieszkancy', 'wyborcy'], axis=1)
woj_table_df.reset_index(inplace=True, drop=True)
woj_table_df.rename(columns={'wojewodztwo': 'nazwa'}, inplace=True)

woj_table_df['id'] = woj_table_df.index + 1
woj_table_df = woj_table_df[['id', 'nazwa']]

#Creating table 'Okrag'
okrag_table_df = pd.read_csv('data\okregi_sejm_utf8.csv', delimiter='\t', encoding='utf-8', header=0)
placowka_wyniki_df = pd.read_csv('data\wyniki_gl_na_listy_po_obwodach_sejm_utf8.csv', delimiter='\t', encoding='utf-8', header=0)
placowka_wyniki_df = placowka_wyniki_df.drop(['nr_komisji', 'teryt_gminy', 'gmina', 'powiat', 'wojewodztwo', 'okrag'], axis=1)
placowka_wyniki_df.reset_index(inplace=True, drop=True)
placowka_wyniki_df.rename(columns={'siedziba': 'placowka'}, inplace=True)

#Changing NaN's to zeros.
placowka_wyniki_df.fillna(0, inplace=True)

#Changing columns where dtype is float64 to int
for column in placowka_wyniki_df.columns:
    if placowka_wyniki_df[column].dtype == np.float64:
        placowka_wyniki_df[column] = placowka_wyniki_df[column].astype(int)

#Grouping by 'placowka', summing every other column
placowka_wyniki_df = placowka_wyniki_df.groupby('placowka').agg({
    'bezpartyjni_sam': 'sum', 
    '2050_trzecia_droga': 'sum',
    'nowa_lewica': 'sum',
    'pis': 'sum',
    'konfa': 'sum',
    'ko': 'sum',
    'polska_jest_jedna': 'sum',
    'dobrobyt_i_pokoj': 'sum',
    'normalny_kraj': 'sum',
    'antypartia': 'sum',
    'ruch_naprawy_polski': 'sum',
    'mniejszosc_niemiecka': 'sum'
}).reset_index()

placowka_wyniki_df.rename(columns={
    'bezpartyjni_sam': 'BS', 
    '2050_trzecia_droga': '3D', 
    'nowa_lewica': 'NL', 
    'pis': 'PiS', 
    'konfa': 'Konfederacja', 
    'ko': 'KO',
    'polska_jest_jedna': 'PJJ', 
    'dobrobyt_i_pokoj': 'DiP', 
    'normalny_kraj': 'NK',
    'antypartia': 'AP',
    'ruch_naprawy_polski': 'RNP',
    'mniejszosc_niemiecka': 'MN'
}, inplace=True)

#Applying melt, changing the df format from wide to long
placowka_wyniki_df = pd.melt(placowka_wyniki_df, id_vars=['placowka'], var_name='komitet', value_name='glosow')
placowka_wyniki_df.sort_values(by='placowka', inplace=True)
placowka_wyniki_df.reset_index(inplace=True, drop=True)

#Changing 'komitet' names to their respective id's from komitet_table_df
placowka_wyniki_df = placowka_wyniki_df.merge(komitet_table_df, left_on='komitet', right_on='skrot', how='left')
placowka_wyniki_df = placowka_wyniki_df.drop(['komitet', 'nazwa', 'skrot'], axis=1)
placowka_wyniki_df = placowka_wyniki_df[['placowka', 'id', 'glosow']]
placowka_wyniki_df.rename(columns={'id': 'komitet_id'}, inplace=True)

print(placowka_wyniki_df)

'''
placowka_df merge z df i dodanie: gmina, powiat, wojewodztwo, okrag, wszystko id'ki
placowka_wyniki_df merge z placowka i zamiana nazw placowek na id'ki

zrobienie tabelek kandydat i placowka_wyniki_kandydat

moze zmiana placowka_wyniki na placowka_wyniki_komitet

z kandydatem bedzie slabo dosc bo tam jest 40 plikow do zmergowania XD
'''