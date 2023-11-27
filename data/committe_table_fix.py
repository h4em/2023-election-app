import mysql.connector
import sys
sys.path.append('D:\\projects\\elec')

from db_config import DB_CONFIG

connection_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name = "main_pool",
    pool_size = 5,
    **DB_CONFIG  
)

try:
    with connection_pool.get_connection() as connection:
        with connection.cursor() as cursor:
            query = 'SELECT * FROM committee;'

            cursor.execute(query)

            rows = cursor.fetchall()
            
            for row in rows:
                address = row[2]
                address = address.strip()

                update_query = "UPDATE committee SET address = %s WHERE id = %s"

                cursor.execute(update_query, (address, row[0]))

            connection.commit()

except mysql.connector.Error as ce:
    print(f'Database Error: {ce}')
    raise ce

except ValueError as ve:
    print(f'Value Error: {ve}')
    raise ve