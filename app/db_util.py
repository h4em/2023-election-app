import mysql.connector
from db_config import DB_CONFIG

connection_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name = "main_pool",
    pool_size = 5,
    **DB_CONFIG  
)

def get_matching_records(keyword, category):
    result = []

    try:
        with connection_pool.get_connection() as connection:
            with connection.cursor() as cursor:
                column_name = column_name_from_category(category)

                query = '''
                    SELECT DISTINCT {}
                    FROM placowka
                    WHERE LOWER({}) LIKE %s
                    LIMIT 10;
                '''.format(column_name, column_name)

                cursor.execute(query, ('%' + keyword.lower() + '%',))

                result = [item[0] for item in cursor.fetchall()]

    except mysql.connector.Error as ce:
        print(f'Database Error: {ce}')
        raise ce

    except ValueError as ve:
        print(f'Value Error: {ve}')
        raise ve

    return result

def get_voting_results(item, category):
    results = []

    try:
        with connection_pool.get_connection() as connection:
            with connection.cursor() as cursor:
                column_name = column_name_from_category(category)
                
                query = '''
                    SELECT komitet.skrot, SUM(liczba_glosow) 
                    FROM komitet 
                    INNER JOIN placowka_wyniki ON placowka_wyniki.komitet_id = komitet.id
                    INNER JOIN placowka ON placowka.id = placowka_wyniki.placowka_id
                    WHERE {} = %s
                    GROUP BY komitet.skrot
                    ORDER BY SUM(liczba_glosow) DESC;
                '''.format(column_name)

                cursor.execute(query, (item,))
                
                results = [{'name': name, 'num_of_votes': str(value)} for name, value in cursor.fetchall() if value != 0]

    except mysql.connector.Error as ce:
        print(f'Database Error: {ce}')
        raise ce

    print(results)
    return results

#na idki nazwy kolumn
def column_name_from_category(category):
    if category == 'Institution name / address':
        return 'nazwa_adres'
    elif category == 'City':
        return 'miasto'
    elif category == 'Gmina':
        return 'gmina'
    elif category == 'Powiat':
        return 'powiat'
    elif category == 'Wojewodztwo':
        return 'wojewodztwo'
    else:
        raise ValueError(f'Invalid category: {category}')