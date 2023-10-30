import pandas as pd

#note: Excluded data from abroad, it was messing up the file structure
df = pd.read_csv('data\obwody_glosowania_utf8.csv', delimiter='\t', encoding='utf-8', header=0)
df = df.drop(['typ_obwodu', 'typ_obszaru'], axis=1)
print(df.head(3))

#grouping by 'siedziba', summing 'mieszkancy' and 'wyborcy'
df1 = df.groupby('siedziba').agg({'mieszkancy': 'sum', 'wyborcy': 'sum'}).reset_index()
df1.sort_values(by='siedziba', ascending=True, inplace=True)
df1.rename(columns={'siedziba': 'placowka'}, inplace=True)
print(df1)

#Creating 'Gmina' table by getting unique gminy names and id's from the set
gminy_table_df = df.drop_duplicates(subset=['gmina'])
gminy_table_df = gminy_table_df.drop(['nr_komisji', 'siedziba', 'powiat', 'wojewodztwo', 'okrag', 'mieszkancy', 'wyborcy'], axis=1)
gminy_table_df.reset_index(inplace=True, drop=True)
gminy_table_df.rename(columns={'teryt_gminy': 'id', 'gmina': 'nazwa'}, inplace=True)

print('\nGminy\n', gminy_table_df.head(3))

#Creating 'Powiat' table
powiat_table_df = df.drop_duplicates(subset='powiat')
powiat_table_df = powiat_table_df.drop(['nr_komisji', 'siedziba', 'teryt_gminy', 'gmina', 'wojewodztwo', 'okrag', 'mieszkancy', 'wyborcy'], axis=1)
powiat_table_df.reset_index(inplace=True, drop=True)
powiat_table_df.rename(columns={'powiat': 'nazwa'}, inplace=True)

powiat_table_df['id'] = powiat_table_df.index + 1
powiat_table_df = powiat_table_df[['id', 'nazwa']]

print('\nPowiat\n', powiat_table_df.head(3))

#Creating table 'Wojewodztwo'
woj_table_df = df.drop_duplicates(subset='wojewodztwo')
woj_table_df = woj_table_df.drop(['nr_komisji', 'siedziba', 'teryt_gminy', 'gmina', 'powiat', 'okrag', 'mieszkancy', 'wyborcy'], axis=1)
woj_table_df.reset_index(inplace=True, drop=True)
woj_table_df.rename(columns={'wojewodztwo': 'nazwa'}, inplace=True)

woj_table_df['id'] = woj_table_df.index + 1
woj_table_df = woj_table_df[['id', 'nazwa']]

print('\nWojewodztwo\n', woj_table_df.head(3))

#Creating table 'Okrag'
okrag_table_df = pd.read_csv('data\okregi_sejm_utf8.csv', delimiter='\t', encoding='utf-8', header=0)
print('\nOkrag\n', okrag_table_df.head(3))

'''
z df1 zrobic tabele placowka, pododawac wartosci kolumn odpowiadajace id'kom
do df1 dodac id'k

z tego drugiego source'u czyli wnyiki gl na listy po obwodach tam trzeba zrobic duzo magii.

tez pogrupowac po siedzibie na pewno zeby pozniej zjoinowac te dataframey ze soba,
zsumowac liczbe glosow na poszczegolne komitety

i na koncu trzeba zrobic zeby byla jedna kolumna komitet i ilosc oddanych glosow

komitet oddanych_glosow
<nazwa> <liczba>


i pozniej replace na idka, placowki i komitetu

tabelka wyniki/placowka


zrobi sie tez wyniki kandydat, tam trzeba bedzie dodatkowo zmergowac 40 plikow bo jes  po okregach XSD

'''