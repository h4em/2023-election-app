import sys
sys.path.append('D:\\projects\\elec')

from db_config import DB_CONFIG
import mysql.connector

connection_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name = "main_pool",
    pool_size = 5,
    **DB_CONFIG  
)

try:
    with connection_pool.get_connection() as connection:
        with connection.cursor() as cursor:
            query = 'SELECT * FROM gmina;'

            cursor.execute(query)

            rows = cursor.fetchall()
            
            for row in rows:
                name = row[1]
                name = name.strip()
                name_parts = name.split(' ', 1)

                if len(name_parts) > 1:
                    name = name_parts[1]

                update_query = "UPDATE gmina SET name = %s WHERE id = %s"

                cursor.execute(update_query, (name, row[0]))

            connection.commit()

except mysql.connector.Error as ce:
    print(f'Database Error: {ce}')
    raise ce

except ValueError as ve:
    print(f'Value Error: {ve}')
    raise ve