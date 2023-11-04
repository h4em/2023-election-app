import mysql.connector
from decimal import Decimal
from app.db_config import config

connection_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name = "main_pool",
    pool_size = 5,
    **config  
)

def get_institutions(institution_name):
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        query = 'SELECT nazwa_adres FROM placowka WHERE LOWER(nazwa_adres) LIKE %s LIMIT 10;'
        parameter = f'%{institution_name.lower()}%'

        cursor.execute(query, (parameter,))
        
        institutions = cursor.fetchall()
    except mysql.connector.Error as e:
        print(f"Database Error: {e}")
    finally:
        cursor.close()
        connection.close()

    return institutions

#tu format zwracany jest zly bardzo

def get_institution_results(institution):
    connection = connection_pool.get_connection()
    cursor = connection.cursor()

    try:
        query = '''
            SELECT komitet.skrot, sum(liczba_glosow) 
            FROM komitet 
            INNER JOIN placowka_wyniki ON placowka_wyniki.komitet_id = komitet.id
            INNER JOIN placowka ON placowka.id = placowka_wyniki.placowka_id
            WHERE placowka.nazwa_adres = %s
            GROUP BY komitet.skrot
            ORDER BY sum(liczba_glosow) DESC;
        '''    
        cursor.execute(query, (institution,))
        results = cursor.fetchall()

        results = [(name, int(votes)) for name, votes in results if votes != Decimal('0')]
    except mysql.connector.Error as e:
        print(f"Database Error: {e}")
    finally:
        cursor.close()
        connection.close()
    return results