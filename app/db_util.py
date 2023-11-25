import mysql.connector
import json
from db_config import DB_CONFIG

connection_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name = "main_pool",
    pool_size = 5,
    **DB_CONFIG  
)

def map_category(category):
    if category == '1':
        return 'committee'
    elif category == '2':
        return 'city'
    elif category == '3':
        return 'gmina'
    elif category == '4':
        return 'powiat'
    elif category == '5':
        return 'wojewodztwo'
    else:
        raise ValueError(f'Invalid category: {category}')

#Returns select query based on selected table name.
def get_select_query(keyword, table_name):
    if table_name == 'committee':
        return '''
            SELECT committee.id, CONCAT(committee.name, ', ', address, ', ', post_code, ', ', city.name)
            FROM committee
            INNER JOIN city ON committee.city_id = city.id
            WHERE CONCAT(committee.name, ', ', address, ', ', post_code, ', ', city.name) LIKE '%{}%'
            LIMIT 10;
        '''.format(keyword)
    else:
        return '''
            SELECT id, name 
            FROM {} 
            WHERE name LIKE '%{}%'
            LIMIT 10;
        '''.format(table_name, keyword)

'''
    fajnie by bylo jakby ten search algo byl troche bardziej skomplikowany ale lepsze
    bardziej trafne matche zwracal
'''        
def get_matching_records(keyword, category):
    result = []

    try:
        with connection_pool.get_connection() as connection:
            with connection.cursor() as cursor:
                table_name = map_category(category)
                query = get_select_query(keyword, table_name)

                cursor.execute(query)

                result = cursor.fetchall()

                #From array of tuples to array of dictionaries
                result = [{'id': item[0], 'body': item[1]} for item in result]

    except mysql.connector.Error as ce:
        print(f'Database Error: {ce}')
        raise ce

    except ValueError as ve:
        print(f'Value Error: {ve}')
        raise ve
    return json.dumps(result, ensure_ascii=False)

def get_voting_results(id, category):
    results = []

    try:
        with connection_pool.get_connection() as connection:
            with connection.cursor() as cursor:
                column_name = map_category(category)
                
                if column_name == 'committee':
                    column_name += '.id'
                else:
                    column_name += '_id'

                query = '''
                    SELECT party.shortname, SUM(num_of_votes) 
                    FROM party 
                    INNER JOIN results ON results.party_id = party.id
                    INNER JOIN committee ON committee.id = results.committee_id
                    WHERE {} = {}
                    GROUP BY party.shortname
                    ORDER BY SUM(num_of_votes) DESC;
                '''.format(column_name, id)

                cursor.execute(query)
                
                result = [{'party': party, 'num_of_votes': int(num_of_votes)} for party, num_of_votes in cursor.fetchall() if num_of_votes != 0]

    except mysql.connector.Error as ce:
        print(f'Database Error: {ce}')
        raise ce

    return json.dumps(result, ensure_ascii=False)