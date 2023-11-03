import json
import mysql.connector
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

    return json.dumps(institutions)